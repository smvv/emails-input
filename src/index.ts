import {EmailsInputState} from './state';
import {BoardParams, initBoard} from './board';
import {initContainer} from './container';

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

    emails: params?.emails || [],
  };

  console.log('state', state);

  initBoard(state, params?.board);
};

export default EmailsInput;
