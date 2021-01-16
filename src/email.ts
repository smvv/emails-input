import {createElement} from './utils';

const createDeleteButton = (elem: Element): Element => {
  const btn = document.createElement('span');
  btn.className = 'emails-input-email-delete';
  elem.appendChild(btn);
  return btn;
};

// isValid returns true when the email is considered valid. This checks if
// there is an at-sign present in the email address.
const isValid = (email: string) => email.includes('@');

export class EmailInput {
  element: Element;
  delete: Element | undefined;
  valid: boolean;

  constructor(
    public area: Element,
    public emails: EmailInput[],
    public email: string,
  ) {
    const elem = createElement(area, 'email');
    elem.textContent = email;
    this.element = elem;

    // Mark email as invalid if it is.
    this.valid = isValid(email);
    if (!this.valid) elem.classList.add('emails-input-email-invalid');

    // Create the delete button.
    const btn = createDeleteButton(elem);
    btn.addEventListener('click', this.onRemove.bind(this));
    this.delete = btn;
  }

  onRemove() {
    if (!this.delete) return; // satisfy compiler null check.

    // Remove event handler. This is not strictly necessary because the parent
    // node is removed and the garbage collector will clean this up afterwards.
    this.delete.removeEventListener('click', this.onRemove);

    // Remove the parent email input element from the area.
    this.area.removeChild(this.element);

    // Remove email input from input array.
    const idx = this.emails.indexOf(this);
    this.emails.splice(idx, 1);
  }
}

export const initEmails = (area: Element, emails: string[]): EmailInput[] => {
  const inputs: EmailInput[] = [];
  emails.forEach(e => {
    inputs.push(new EmailInput(area, inputs, e));
  });
  return inputs;
};

// randomEmail returns a semi-randomized, valid email address.
export const randomEmail = (): string => {
  const alphabet = 'abcdef012345';

  const randomChar = () =>
    alphabet.charAt(Math.round(alphabet.length * Math.random()));

  let result = '';

  for (var i = 0; i < 10; i++) result += randomChar();

  result += '@';

  for (var i = 0; i < 10; i++) result += randomChar();

  return result + '.com';
};
