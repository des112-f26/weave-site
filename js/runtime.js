/*
 * Weave runtime
 * A tiny, dependency-free renderer for the Weave template.
 *
 * Template syntax (inside <template id="weave-template">):
 *   {{path.to.value}}            text or attribute interpolation (dotted lookups only)
 *   <sc-for list="{{xs}}" as="x"> repeat children for each item in xs
 *   <sc-if value="{{cond}}">     render children only when cond is truthy
 *   onClick="{{fn}}" etc.        event handlers
 *   ref="{{fn}}"                 called with the live element after every render
 *
 * The template is compiled once into small functions that build a light virtual
 * tree; each render diffs that tree against the previous one and only touches
 * the DOM where something actually changed. Renders are batched per frame.
 *
 * The app logic lives in a class that extends DCLogic and implements renderVals().
 */
(function () {
  'use strict';

  // template attribute (lower-cased by the HTML parser) -> DOM event
  var EVENTS = {
    onclick: 'click', onchange: 'input', oninput: 'input', onkeydown: 'keydown',
    onmouseenter: 'mouseenter', onmouseleave: 'mouseleave', onfocus: 'focus', onblur: 'blur',
    onpointerdown: 'pointerdown', onpointermove: 'pointermove', onpointerup: 'pointerup', onpointercancel: 'pointercancel',
    onscroll: 'scroll'
  };
  var WHOLE = /^\s*\{\{\s*([A-Za-z_$][\w$.]*)\s*\}\}\s*$/;
  var HOLE = /\{\{\s*([A-Za-z_$][\w$.]*)\s*\}\}/g;

  function getter(path) {
    var parts = path.split('.');
    if (parts.length === 1) { var p0 = parts[0]; return function (s) { return s[p0]; }; }
    if (parts.length === 2) { var a = parts[0], b = parts[1]; return function (s) { var v = s[a]; return v == null ? undefined : v[b]; }; }
    return function (s) {
      var v = s[parts[0]];
      for (var i = 1; i < parts.length && v != null; i++) v = v[parts[i]];
      return v;
    };
  }
  // "a {{x}} b {{y.z}}" -> function(scope) -> string (or null when there are no holes)
  function textFn(str) {
    if (str.indexOf('{{') < 0) return null;
    var parts = [], last = 0, m;
    HOLE.lastIndex = 0;
    while ((m = HOLE.exec(str))) {
      if (m.index > last) parts.push(str.slice(last, m.index));
      parts.push(getter(m[1]));
      last = m.index + m[0].length;
    }
    if (last < str.length) parts.push(str.slice(last));
    return function (s) {
      var out = '';
      for (var i = 0; i < parts.length; i++) {
        var p = parts[i];
        if (typeof p === 'string') out += p;
        else { var v = p(s); if (v != null) out += v; }
      }
      return out;
    };
  }

  /* ---------- compile template DOM -> builder functions ---------- */
  function compileChildren(parent) {
    var fns = [];
    for (var n = parent.firstChild; n; n = n.nextSibling) {
      var f = compileNode(n);
      if (f) fns.push(f);
    }
    return function (scope, out) {
      for (var i = 0; i < fns.length; i++) fns[i](scope, out);
    };
  }
  function compileNode(node) {
    if (node.nodeType === 3) {
      var txt = node.nodeValue;
      var tf = textFn(txt);
      if (tf) return function (s, out) { out.push({ x: tf(s) }); };
      return function (s, out) { out.push({ x: txt }); };
    }
    if (node.nodeType !== 1) return null;
    var tag = node.localName;
    if (tag === 'sc-for') {
      var lm = WHOLE.exec(node.getAttribute('list') || '');
      var listGet = lm ? getter(lm[1]) : function () { return null; };
      var as = node.getAttribute('as') || 'item';
      var body = compileChildren(node);
      return function (s, out) {
        var list = listGet(s);
        if (!list || !list.length) return;
        for (var i = 0; i < list.length; i++) {
          var child = Object.create(s);
          child[as] = list[i];
          body(child, out);
        }
      };
    }
    if (tag === 'sc-if') {
      var vm = WHOLE.exec(node.getAttribute('value') || '');
      var condGet = vm ? getter(vm[1]) : function () { return false; };
      var ifBody = compileChildren(node);
      return function (s, out) { if (condGet(s)) ifBody(s, out); };
    }
    var ns = node.namespaceURI;
    var statics = {}, dyn = [], evs = [], refGet = null;
    for (var i = 0; i < node.attributes.length; i++) {
      var at = node.attributes[i], name = at.name, val = at.value;
      if (name.indexOf('hint-') === 0) continue;
      var whole = WHOLE.exec(val);
      if (EVENTS[name]) { if (whole) evs.push([EVENTS[name], getter(whole[1])]); continue; }
      if (name === 'ref') { if (whole) refGet = getter(whole[1]); continue; }
      if (whole) dyn.push([name, getter(whole[1]), true]);
      else {
        var tfn = textFn(val);
        if (tfn) dyn.push([name, tfn, false]);
        else statics[name] = val;
      }
    }
    var kids = compileChildren(tag === 'template' ? node.content : node);
    return function (s, out) {
      var a = {};
      for (var k in statics) a[k] = statics[k];
      for (var j = 0; j < dyn.length; j++) {
        var d = dyn[j], v = d[1](s);
        if (d[2]) {
          if (v === false || v == null) continue;
          a[d[0]] = v === true ? '' : String(v);
        } else a[d[0]] = v;
      }
      var on = null;
      for (var e = 0; e < evs.length; e++) {
        var fn = evs[e][1](s);
        if (typeof fn === 'function') {
          on = on || {};
          var prev = on[evs[e][0]];
          on[evs[e][0]] = prev ? (function (p1, p2) { return function (ev) { p1(ev); p2(ev); }; })(prev, fn) : fn;
        }
      }
      var c = [];
      kids(s, c);
      out.push({ t: tag, ns: ns, a: a, on: on, ref: refGet ? refGet(s) : null, c: c });
    };
  }

  /* ---------- virtual tree -> DOM ---------- */
  function dispatch(ev) {
    var h = this.__h && this.__h[ev.type];
    if (h) h(ev);
  }
  function setEvents(el, on) {
    var h = el.__h || (el.__h = {});
    var bound = el.__hb || (el.__hb = {});
    for (var k in h) if (!on || !on[k]) h[k] = null;
    if (!on) return;
    for (var t in on) {
      h[t] = on[t];
      if (!bound[t]) { el.addEventListener(t, dispatch); bound[t] = true; }
    }
  }
  function setValue(el, a) {
    if ('value' in a && el.value !== a.value && document.activeElement !== el) el.value = a.value;
  }
  function create(v, refs) {
    if (v.x !== undefined) return (v.el = document.createTextNode(v.x));
    var el = v.el = v.ns && v.ns !== 'http://www.w3.org/1999/xhtml'
      ? document.createElementNS(v.ns, v.t) : document.createElement(v.t);
    for (var k in v.a) el.setAttribute(k, v.a[k]);
    if (v.on) setEvents(el, v.on);
    for (var i = 0; i < v.c.length; i++) el.appendChild(create(v.c[i], refs));
    if (v.t === 'input' || v.t === 'textarea' || v.t === 'select') setValue(el, v.a);
    if (v.ref) refs.push(v);
    return el;
  }
  function same(o, n) {
    if (o.x !== undefined || n.x !== undefined) return o.x !== undefined && n.x !== undefined;
    return o.t === n.t && o.ns === n.ns;
  }
  function patch(o, n, refs) {
    var el = n.el = o.el;
    if (n.x !== undefined) { if (o.x !== n.x) el.nodeValue = n.x; return; }
    var oa = o.a, na = n.a, k;
    for (k in oa) if (!(k in na)) el.removeAttribute(k);
    for (k in na) if (oa[k] !== na[k]) el.setAttribute(k, na[k]);
    if (n.t === 'input' || n.t === 'textarea' || n.t === 'select') setValue(el, na);
    if (o.on || n.on) setEvents(el, n.on);
    patchChildren(el, o.c, n.c, refs);
    if (n.ref) refs.push(n);
  }
  function patchChildren(parent, oc, nc, refs) {
    var i, len = nc.length;
    for (i = 0; i < len; i++) {
      var o = oc[i], n = nc[i];
      if (o && same(o, n)) patch(o, n, refs);
      else if (o) parent.replaceChild(create(n, refs), o.el);
      else parent.appendChild(create(n, refs));
    }
    for (i = len; i < oc.length; i++) parent.removeChild(oc[i].el);
  }

  /* ---------- component base ---------- */
  function DCLogic(props) {
    this.props = props || {};
    this.state = {};
  }
  DCLogic.prototype.setState = function (patchObj) {
    var p = typeof patchObj === 'function' ? patchObj(this.state, this.props) : patchObj;
    this.state = Object.assign({}, this.state, p);
    if (this.__schedule) this.__schedule();
  };
  DCLogic.prototype.forceUpdate = function () {
    if (this.__schedule) this.__schedule();
  };
  window.DCLogic = DCLogic;

  /* ---------- mount ---------- */
  function mount(Comp, templateEl, container, props) {
    var build = compileChildren(templateEl.content);
    var inst = new Comp(props || {});
    var prev = [], pending = false;
    var defer = window.queueMicrotask || function (cb) { Promise.resolve().then(cb); };

    function render() {
      pending = false;
      var next = [], refs = [];
      build(inst.renderVals(), next);
      patchChildren(container, prev, next, refs);
      prev = next;
      for (var i = 0; i < refs.length; i++) refs[i].ref(refs[i].el);
    }
    inst.__schedule = function () {
      if (pending) return;
      pending = true;
      defer(render);
    };
    container.textContent = '';
    render();
    return inst;
  }

  window.WeaveRuntime = { mount: mount };
})();
