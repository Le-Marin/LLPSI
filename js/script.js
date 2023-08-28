'use strict';

const basePath = 'https://le-marin.github.io/LLPSI/';

loadScript(basePath + 'js/tip.js?v=' + Date.now());

if (location.protocol === 'file:') {
  loadScript('js/_edit.js');
}

function loadScript(src) {
  const script = document.createElement('script');
  script.src = src;
  document.head.appendChild(script);
  script.remove();
}
