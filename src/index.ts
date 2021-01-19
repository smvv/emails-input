import {EmailsInputState} from './state';
import {BoardParams, initBoard} from './board';
import {initContainer} from './container';
import {
  initEmails,
  initPlaceholder,
  addEmail,
  countValidEmails,
  addNewEmail,
} from './email';

import './index.scss';

interface EmailsInputParams {
  emails?: string[];
  board?: BoardParams;
}

interface EmailsInputAPI {
  getValidEmails: () => string[];
}

const EmailsInput = function (
  root: Element | null,
  params?: EmailsInputParams,
): EmailsInputAPI | undefined {
  // Early exit when root node is not set.
  if (!root) return;

  const state: EmailsInputState = {
    container: initContainer(root),
    emails: [],
  };

  initBoard(state, params?.board);

  const emails = params?.emails;
  if (emails) {
    state.emails = initEmails(state.container.area, emails);
  }

  const {buttons, area} = state.container;

  const placeholder = initPlaceholder(area, addEmail(area, state.emails));

  buttons.add.addEventListener('click', addNewEmail(area, state.emails));
  buttons.count.addEventListener('click', countValidEmails(state.emails));

  area.addEventListener('click', (e: Event) => {
    // Focus placeholder when input area is clicked.
    if (e.target == area) placeholder.focus();
  });

  return {
    getValidEmails: () => state.emails.filter(e => e.valid).map(e => e.email),
  };
};

export default EmailsInput;
