import {createElement} from './utils';

export const createButtons = (
  root: Element,
): {wrapper: Element; add: Element; count: Element} => {
  const wrapper = createElement(root, 'buttons');

  const add = document.createElement('button');
  add.className = 'emails-input-button';
  add.textContent = 'Add email';
  wrapper.appendChild(add);

  const count = document.createElement('button');
  count.className = 'emails-input-button';
  count.textContent = 'Get emails count';
  wrapper.appendChild(count);

  return {wrapper, add, count};
};
