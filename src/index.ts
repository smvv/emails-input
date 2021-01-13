import {EmailsInputState} from './state';

interface EmailsInputParams {
  emails?: string[];
}

const EmailsInput = function (root: Node, params?: EmailsInputParams) {
  const state: EmailsInputState = {
    root,
    emails: params?.emails || [],
  };

  console.log('params', params);
  console.log('state', state);
};

export default EmailsInput;
