(function() {
  'use strict';

  const wordReplacer = (match) => `<strong class="tip-word">${match}</strong>`;

  const notesReplacer = (match) => {
    const value = match.slice(1).replace(/[(+/)]+/g, '<i>$&</i>');
    return `<span class="notes">${value}</span>`;
  };

  const translationReplacer = (match) => {
    const value = match.slice(1).replace(/\/ (.+)/g, '/ <i>$1</i>');
    return `<span class="translation">${value}</span>`;
  };

  const handleWordValue = window.handleWordValue = (text) => {
    return text
      .replace(/[^:|]*/, wordReplacer)
      .replace(/\|[^:]+/, notesReplacer)
      .replace(/:.+/, translationReplacer);
  };

  const tip = ((elem) => {
    elem.id = 'tip';
    document.body.appendChild(elem);

    const setCSS = elem.style.setProperty.bind(elem.style);
    const getClientWidth = () => document.documentElement.clientWidth;

    return {
      get hidden() {
        return !elem.offsetWidth;
      },
      move({left, top, right, bottom}) {
        const offset = 5;
        const w = elem.offsetWidth;
        const h = elem.offsetHeight + offset;
        const x = left + w >= getClientWidth() ? Math.max(2, right - w) : left;
        const y = bottom + h >= window.innerHeight ? top - h : bottom + offset;
        setCSS('--x', `${~~x}px`);
        setCSS('--y', `${y + window.scrollY >> 0}px`);
      },
      render(text = '') {
        elem.innerHTML = text && handleWordValue(text);
        return this;
      }
    };
  })(document.createElement('div'));

  document.addEventListener('click', onTipFocus);
  document.addEventListener('mouseover', onTipFocus);

  function onTipFocus(e) {
    const trg = e.target;
    const text = trg.matches('.word') ? trg.dataset.value : '';

    if (text) return tip.render(text).move(trg.getBoundingClientRect());

    !tip.hidden && tip.render('');
  }
})();