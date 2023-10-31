'use strict';

const src = (document.currentScript || [...document.scripts].pop() || {src: ''}).src;
const ver = (src.match(/\?v=(\d+)/) || '01')[1];
const basePath = 'https://le-marin.github.io/LLPSI/';

loadScript(basePath + 'js/tip.js?v=' + ver);

if (location.protocol === 'file:') loadScript('js/_edit.js');
else loadScript('/footer.js?v=' + ver);

function loadScript(src) {
  const script = document.createElement('script');
  script.src = src;
  document.head.appendChild(script).remove();
}
