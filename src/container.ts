import {createElement} from './utils';
import {createButtons} from './button';

export interface EmailsInputContainer {
  root: Element;

  main: Element;
  buttons: {
    wrapper: Element;
    add: Element;
    count: Element;
  };

  title: Element;
  boardName: Element;

  area: Element;
}

export const initContainer = (root: Element): EmailsInputContainer => {
  root.className += ' emails-input-container';

  const main = createElement(root, 'main');

  const title = createElement(main, 'title');
  const boardName = createElement(title, 'board-name');

  const area = createElement(main, 'area');
  const buttons = createButtons(main);

  return {
    root,
    main,
    title,
    boardName,
    area,
    buttons,
  };
};
