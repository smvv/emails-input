import {createElement} from './utils';

const createDeleteButton = (elem: Element): Element => {
  const btn = document.createElement('span');
  btn.className = 'emails-input-email-delete';
  elem.appendChild(btn);
  return btn;
};

// isValid returns true when the email is considered valid. This checks if
// there is an at-sign present in the email address.
const isValid = (email: string) => email.indexOf('@') > -1;

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

export const addEmail = (
  area: Element,
  emails: EmailInput[],
): ((input: string) => void) => {
  return (input: string) => {
    // Split input into multiple emails (delimited by comma or newline).
    const parts = input.split(/[,\r\n]/);

    parts.forEach(email => {
      // Don't add empty email addresses.
      email = email.trim();
      if (!email.length) return;

      emails.push(new EmailInput(area, emails, email));
    });
  };
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

export const addNewEmail = (
  area: Element,
  emails: EmailInput[],
): (() => void) => {
  const add = addEmail(area, emails);
  return () => add(randomEmail());
};

export const countValidEmails = (emails: EmailInput[]): (() => void) => {
  return () => {
    const count = emails.filter(e => e.valid).length;
    alert(count);
  };
};

export const initPlaceholder = (
  area: Element,
  add: (email: string) => void,
): HTMLInputElement => {
  const input = document.createElement('input');
  input.className = 'emails-input-placeholder';
  area.appendChild(input);
  input.placeholder = 'add more people…';

  const onAdd = (e: UIEvent) => {
    if (!e.target) return; // ignore event without target element.
    const target = e.target as HTMLInputElement;

    // Add email address.
    add(target.value);

    // Clear input value.
    input.value = '';
  };

  input.addEventListener('blur', onAdd);
  input.addEventListener('keyup', (e: KeyboardEvent) => {
    const code = e.code || e.keyCode;
    // Detect comma or enter key.
    const comma = 188; // fallback key code for IE11
    const enter = 13; // fallback key code for IE11
    if (['Enter', 'Comma', enter, comma].indexOf(code) > -1) onAdd(e);
  });
  input.addEventListener('paste', (e: ClipboardEvent) => {
    const clipboard = e.clipboardData || (window as any).clipboardData;
    if (!clipboard) return; // ignore event without clipboard data.

    add(clipboard.getData('text'));

    // Clear input value.
    input.value = '';

    // Prevent further event processing.
    e.preventDefault();
    e.stopPropagation();
  });

  return input;
};
