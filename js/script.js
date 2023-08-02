(function() {
  'use strict';

  loadScript('js/tip.js');

  if (location.protocol === 'file:') {
    loadScript('js/edit.js');
  }

  function loadScript(src) {
    const script = document.createElement('script');
    script.src = src;
    document.head.appendChild(script);
    script.remove();
  }
})();