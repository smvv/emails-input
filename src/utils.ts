export const createElement = (parent: Element, type: string): Element => {
  const elem = document.createElement('div');
  elem.className = 'emails-input-' + type;
  parent.appendChild(elem);
  return elem;
};
