/* Weave: boot */
(function () {
  var props = {"palette": "Tailor's room", "labels": "On hover", "nudge": 29};
  function start() {
    window.WeaveRuntime.mount(window.WeaveComponent, document.getElementById('weave-template'), document.getElementById('app'), props);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
