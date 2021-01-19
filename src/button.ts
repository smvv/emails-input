import {createElement} from './utils';
import {randomEmail, EmailInput} from './email';

export const addNewEmail = (
  area: Element,
  emails: EmailInput[],
): (() => void) => {
  return () => {
    const email = randomEmail();
    const input = new EmailInput(area, emails, email);
    emails.push(input);
  };
};

export const countValidEmails = (emails: EmailInput[]): (() => void) => {
  return () => {
    const count = emails.filter(e => e.valid).length;
    alert(count);
  };
};

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
