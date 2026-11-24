/*
 * Weave runtime
 * A tiny, dependency-free renderer for the Weave template.
 *
 * Template syntax (inside <template id="weave-template">):
 *   {{path.to.value}}            text or attribute interpolation (dotted lookups only)
 *   <sc-for list="{{xs}}" as="x"> repeat children for each item in xs
 *   <sc-if value="{{cond}}">     render children only when cond is truthy
 *   onClick="{{fn}}" etc.        event handlers (delegated, see EVENTS below)
 *   ref="{{fn}}"                 called with the live element after every render
 *
 * The app logic lives in a class that extends DCLogic and implements renderVals().
 */
(function () {
  'use strict';

  var VOID = { area: 1, base: 1, br: 1, col: 1, embed: 1, hr: 1, img: 1, input: 1, link: 1, meta: 1, source: 1, track: 1, wbr: 1 };
  // template attribute (lower-cased by the HTML parser) -> DOM event
  var EVENTS = {
    onclick: 'click', onchange: 'input', oninput: 'input', onkeydown: 'keydown',
    onmouseenter: 'mouseenter', onmouseleave: 'mouseleave', onfocus: 'focus', onblur: 'blur',
    onpointerdown: 'pointerdown', onpointermove: 'pointermove', onpointerup: 'pointerup', onpointercancel: 'pointercancel',
    onscroll: 'scroll'
  };
  var BUBBLING = ['click', 'input', 'keydown', 'pointerdown', 'pointermove', 'pointerup', 'pointercancel'];
  var DIRECT = ['mouseenter', 'mouseleave', 'focus', 'blur', 'scroll'];
  var WHOLE = /^\s*\{\{\s*([A-Za-z_$][\w$.]*)\s*\}\}\s*$/;
  var HOLE = /\{\{\s*([A-Za-z_$][\w$.]*)\s*\}\}/g;

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function lookup(scope, path) {
    var parts = path.split('.');
    var v = scope[parts[0]];
    for (var i = 1; i < parts.length; i++) v = v == null ? undefined : v[parts[i]];
    return v;
  }
  function interp(str, scope) {
    return str.replace(HOLE, function (_, p) {
      var v = lookup(scope, p);
      return v == null ? '' : String(v);
    });
  }

  /* ---------- template -> HTML string ---------- */
  function renderNodes(parent, scope, ctx, out) {
    for (var n = parent.firstChild; n; n = n.nextSibling) renderNode(n, scope, ctx, out);
  }
  function renderNode(node, scope, ctx, out) {
    if (node.nodeType === 3) { out.push(esc(interp(node.nodeValue, scope))); return; }
    if (node.nodeType !== 1) return;
    var tag = node.localName;
    if (tag === 'sc-for') {
      var m = WHOLE.exec(node.getAttribute('list') || '');
      var list = m ? lookup(scope, m[1]) : null;
      var as = node.getAttribute('as') || 'item';
      if (list && list.length) {
        for (var i = 0; i < list.length; i++) {
          var child = Object.create(scope);
          child[as] = list[i];
          renderNodes(node, child, ctx, out);
        }
      }
      return;
    }
    if (tag === 'sc-if') {
      var mv = WHOLE.exec(node.getAttribute('value') || '');
      if (mv && lookup(scope, mv[1])) renderNodes(node, scope, ctx, out);
      return;
    }
    out.push('<' + tag);
    var evIds = {};
    for (var a = 0; a < node.attributes.length; a++) {
      var at = node.attributes[a];
      var name = at.name, val = at.value;
      if (name.indexOf('hint-') === 0) continue;
      var whole = WHOLE.exec(val);
      if (EVENTS[name]) {
        var fn = whole ? lookup(scope, whole[1]) : null;
        if (typeof fn === 'function') {
          var ev = EVENTS[name];
          (evIds[ev] = evIds[ev] || []).push(ctx.handlers.push(fn) - 1);
        }
        continue;
      }
      if (name === 'ref') {
        var rf = whole ? lookup(scope, whole[1]) : null;
        if (typeof rf === 'function') out.push(' data-ref="' + (ctx.refs.push(rf) - 1) + '"');
        continue;
      }
      if (whole) {
        var v = lookup(scope, whole[1]);
        if (v === false || v == null) continue;
        out.push(' ' + name + '="' + (v === true ? '' : esc(v)) + '"');
      } else {
        out.push(' ' + name + '="' + esc(interp(val, scope)) + '"');
      }
    }
    for (var k in evIds) out.push(' data-on-' + k + '="' + evIds[k].join(',') + '"');
    out.push('>');
    if (VOID[tag]) return;
    renderNodes(tag === 'template' ? node.content : node, scope, ctx, out);
    out.push('</' + tag + '>');
  }

  /* ---------- keyless DOM patching ---------- */
  function same(a, b) {
    return a.nodeType === b.nodeType && (a.nodeType !== 1 || (a.localName === b.localName && a.namespaceURI === b.namespaceURI));
  }
  function syncAttrs(from, to) {
    var i, at;
    for (i = from.attributes.length - 1; i >= 0; i--) {
      at = from.attributes[i];
      if (!to.hasAttribute(at.name)) from.removeAttribute(at.name);
    }
    for (i = 0; i < to.attributes.length; i++) {
      at = to.attributes[i];
      if (from.getAttribute(at.name) !== at.value) from.setAttribute(at.name, at.value);
    }
    var tag = from.localName;
    if (tag === 'input' || tag === 'textarea' || tag === 'select') {
      var nv = to.getAttribute('value');
      if (nv !== null && from.value !== nv && document.activeElement !== from) from.value = nv;
      if (tag === 'input') from.checked = to.hasAttribute('checked');
    }
  }
  function morphChildren(fromEl, toEl) {
    var f = fromEl.firstChild, t = toEl.firstChild;
    while (t) {
      var nextT = t.nextSibling;
      if (!f) { fromEl.appendChild(t); t = nextT; continue; }
      var nextF = f.nextSibling;
      if (same(f, t)) {
        if (f.nodeType === 1) { syncAttrs(f, t); morphChildren(f, t); }
        else if (f.nodeValue !== t.nodeValue) f.nodeValue = t.nodeValue;
      } else {
        fromEl.replaceChild(t, f);
      }
      f = nextF; t = nextT;
    }
    while (f) { var n = f.nextSibling; fromEl.removeChild(f); f = n; }
  }

  /* ---------- component base ---------- */
  function DCLogic(props) {
    this.props = props || {};
    this.state = {};
  }
  DCLogic.prototype.setState = function (patch) {
    var p = typeof patch === 'function' ? patch(this.state, this.props) : patch;
    this.state = Object.assign({}, this.state, p);
    if (this.__schedule) this.__schedule();
  };
  DCLogic.prototype.forceUpdate = function () {
    if (this.__schedule) this.__schedule();
  };
  window.DCLogic = DCLogic;

  /* ---------- mount ---------- */
  function mount(Comp, templateEl, container, props) {
    var tpl = templateEl.content;
    var inst = new Comp(props || {});
    var handlers = [], refs = [], pending = false;
    var scratch = document.createElement('template');

    function render() {
      pending = false;
      var ctx = { handlers: [], refs: [] };
      var out = [];
      renderNodes(tpl, inst.renderVals(), ctx, out);
      scratch.innerHTML = out.join('');
      handlers = ctx.handlers;
      refs = ctx.refs;
      morphChildren(container, scratch.content);
      var els = container.querySelectorAll('[data-ref]');
      for (var i = 0; i < els.length; i++) {
        var r = refs[+els[i].getAttribute('data-ref')];
        if (r) r(els[i]);
      }
    }
    inst.__schedule = function () {
      if (pending) return;
      pending = true;
      (window.queueMicrotask || function (cb) { Promise.resolve().then(cb); })(render);
    };

    function wrap(ev, el, stop) {
      return new Proxy(ev, {
        get: function (t, k) {
          if (k === 'currentTarget') return el;
          if (k === 'stopPropagation') return function () { stop.v = true; t.stopPropagation(); };
          var v = t[k];
          return typeof v === 'function' ? v.bind(t) : v;
        }
      });
    }
    function call(el, type, ev, stop) {
      var ids = el.getAttribute && el.getAttribute('data-on-' + type);
      if (!ids) return;
      ids.split(',').forEach(function (id) {
        var h = handlers[+id];
        if (h) h(wrap(ev, el, stop));
      });
    }
    BUBBLING.forEach(function (type) {
      container.addEventListener(type, function (ev) {
        var stop = { v: false };
        var el = ev.target && ev.target.nodeType === 3 ? ev.target.parentNode : ev.target;
        while (el && el !== container && !stop.v) {
          call(el, type, ev, stop);
          el = el.parentNode;
        }
      });
    });
    DIRECT.forEach(function (type) {
      container.addEventListener(type, function (ev) {
        if (ev.target && ev.target.nodeType === 1) call(ev.target, type, ev, { v: false });
      }, true);
    });

    render();
    return inst;
  }

  window.WeaveRuntime = { mount: mount };
})();
