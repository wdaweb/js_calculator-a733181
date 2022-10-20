'use strict';
const mainEl = document.querySelector('.main');
const sumEl = document.querySelector('.sum');
const btnsEl = document.querySelectorAll('.btn');
const showAllEl = document.querySelector('.show');

let isCount = false;

btnsEl.forEach((btnEl) => {
  btnEl.addEventListener('click', () => {
    calculatorHandler(btnEl.innerText);
  });
});

document.addEventListener('keydown', (e) => {
  if (
    !isNaN(Number(e.key)) ||
    ['+', '-', '*', '/', '.', 'Enter', 'C', 'c'].includes(e.key)
  ) {
    btnsEl.forEach((btnEl) => {
      if (e.key === btnEl.innerText) {
        btnEl.classList.add('key-active');
      } else if (e.key === 'Enter' && btnEl.innerText === '=') {
        btnEl.classList.add('key-active');
      }
      setTimeout(() => {
        btnEl.classList.remove('key-active');
      }, 300);
    });

    calculatorHandler(e.key);
  }
});

function calculatorHandler(value) {
  const text = value;
  const isString = isNaN(Number(text));
  const sumText = sumEl.innerText;
  const lastIsString = isNaN(Number(sumText[sumText.length - 1]));

  if ((text === '=' || text === 'Enter') && isCount) {
    if (lastIsString) {
      return;
    }
    showAllEl.innerText = `${sumText} = ${eval(sumText)}`;
    sumEl.innerText = 0;
    isCount = false;
    mainEl.classList.add('same');
  } else if (text === 'C' || text === 'c') {
    sumEl.innerText = '0';
    showAllEl.innerText = '';
    isCount = false;
  } else if (text !== 'Enter') {
    if ((sumText === '-' || sumText === '.') && isString) {
      return;
    }

    if (lastIsString && isString) {
      return;
    }

    if (sumText !== '0') {
      if (sumText === '-' && text === '0') {
        return;
      }
      if (!isString) {
        isCount = true;
      }
      sumEl.innerText += text;
    } else if (!['+', '*', '/'].includes(text)) {
      sumEl.innerText = text;
      mainEl.classList.remove('same');
    }
  }
}
