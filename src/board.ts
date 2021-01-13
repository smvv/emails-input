import {EmailsInputState} from './state';

export interface BoardParams {
  name: string;
}

export const initBoard = (
  state: EmailsInputState,
  board: BoardParams | undefined,
) => {
  const name = board?.name || 'Board name';

  const {boardName, title} = state.container;

  boardName.textContent = name;
  title.insertBefore(document.createTextNode('Share '), boardName);
  title.appendChild(document.createTextNode(' with others'));
};
