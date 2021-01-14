import {createElement} from './utils';

const isValid = (email: string) => email.includes('@');

export class EmailInput {
  element: Element;
  valid: boolean;

  constructor(area: Element, public email: string) {
    const elem = createElement(area, 'email');
    this.element = elem;
    this.valid = isValid(email);

    elem.textContent = email;

    if (!this.valid) {
      elem.classList.add('emails-input-email-invalid');
    }
  }
}

export const initEmails = (area: Element, emails: string[]): EmailInput[] => {
  return emails.map(e => new EmailInput(area, e));
};
