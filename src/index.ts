import {EmailsInputState} from './state';
import {BoardParams, initBoard} from './board';
import {initContainer} from './container';
import {initEmails} from './email';
import {countValidEmails, addNewEmail} from './button';

import './index.scss';

interface EmailsInputParams {
  emails?: string[];
  board?: BoardParams;
}

const EmailsInput = function (
  root: Element | null,
  params?: EmailsInputParams,
) {
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

  console.log('state', state);

  const {buttons, area} = state.container;
  buttons.add.addEventListener('click', addNewEmail(area, state.emails));
  buttons.count.addEventListener('click', countValidEmails(state.emails));
};

export default EmailsInput;
