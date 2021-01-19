(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.EmailsInput = factory());
}(this, (function () { 'use strict';

  var initBoard = function (state, board) {
      var name = (board === null || board === void 0 ? void 0 : board.name) || 'Board name';
      var _a = state.container, boardName = _a.boardName, title = _a.title;
      boardName.textContent = name;
      title.insertBefore(document.createTextNode('Share '), boardName);
      title.appendChild(document.createTextNode(' with others'));
  };

  var createElement = function (parent, type) {
      var elem = document.createElement('div');
      elem.className = 'emails-input-' + type;
      parent.appendChild(elem);
      return elem;
  };

  var createButtons = function (root) {
      var wrapper = createElement(root, 'buttons');
      var add = document.createElement('button');
      add.className = 'emails-input-button';
      add.textContent = 'Add email';
      wrapper.appendChild(add);
      var count = document.createElement('button');
      count.className = 'emails-input-button';
      count.textContent = 'Get emails count';
      wrapper.appendChild(count);
      return { wrapper: wrapper, add: add, count: count };
  };

  var initContainer = function (root) {
      root.className += ' emails-input-container';
      var main = createElement(root, 'main');
      var title = createElement(main, 'title');
      var boardName = createElement(title, 'board-name');
      var area = createElement(main, 'area');
      var buttons = createButtons(main);
      return {
          root: root,
          main: main,
          title: title,
          boardName: boardName,
          area: area,
          buttons: buttons,
      };
  };

  var createDeleteButton = function (elem) {
      var btn = document.createElement('span');
      btn.className = 'emails-input-email-delete';
      elem.appendChild(btn);
      return btn;
  };
  var isValid = function (email) { return email.indexOf('@') > -1; };
  var EmailInput = (function () {
      function EmailInput(area, emails, email) {
          this.area = area;
          this.emails = emails;
          this.email = email;
          var elem = createElement(area, 'email');
          elem.textContent = email;
          this.element = elem;
          this.valid = isValid(email);
          if (!this.valid)
              elem.classList.add('emails-input-email-invalid');
          var btn = createDeleteButton(elem);
          btn.addEventListener('click', this.onRemove.bind(this));
          this.delete = btn;
      }
      EmailInput.prototype.onRemove = function () {
          if (!this.delete)
              return;
          this.delete.removeEventListener('click', this.onRemove);
          this.area.removeChild(this.element);
          var idx = this.emails.indexOf(this);
          this.emails.splice(idx, 1);
      };
      return EmailInput;
  }());
  var initEmails = function (area, emails) {
      var inputs = [];
      emails.forEach(function (e) {
          inputs.push(new EmailInput(area, inputs, e));
      });
      return inputs;
  };
  var addEmail = function (area, emails) {
      return function (input) {
          var parts = input.split(/[,\r\n]/);
          parts.forEach(function (email) {
              email = email.trim();
              if (!email.length)
                  return;
              console.log('email', email);
              emails.push(new EmailInput(area, emails, email));
          });
      };
  };
  var randomEmail = function () {
      var alphabet = 'abcdef012345';
      var randomChar = function () {
          return alphabet.charAt(Math.round(alphabet.length * Math.random()));
      };
      var result = '';
      for (var i = 0; i < 10; i++)
          result += randomChar();
      result += '@';
      for (var i = 0; i < 10; i++)
          result += randomChar();
      return result + '.com';
  };
  var addNewEmail = function (area, emails) {
      var add = addEmail(area, emails);
      return function () { return add(randomEmail()); };
  };
  var countValidEmails = function (emails) {
      return function () {
          var count = emails.filter(function (e) { return e.valid; }).length;
          alert(count);
      };
  };
  var initPlaceholder = function (area, add) {
      var input = document.createElement('input');
      input.className = 'emails-input-placeholder';
      area.appendChild(input);
      input.placeholder = 'add more people…';
      var onAdd = function (e) {
          if (!e.target)
              return;
          var target = e.target;
          add(target.value);
          input.value = '';
      };
      input.addEventListener('blur', onAdd);
      input.addEventListener('keyup', function (e) {
          var code = e.code || e.keyCode;
          var comma = 188;
          var enter = 13;
          if (['Enter', 'Comma', enter, comma].includes(code))
              onAdd(e);
      });
      input.addEventListener('paste', function (e) {
          var clipboard = e.clipboardData || window.clipboardData;
          if (!clipboard)
              return;
          add(clipboard.getData('text'));
          input.value = '';
          e.preventDefault();
          e.stopPropagation();
      });
  };

  var EmailsInput = function (root, params) {
      if (!root)
          return;
      var state = {
          container: initContainer(root),
          emails: [],
      };
      initBoard(state, params === null || params === void 0 ? void 0 : params.board);
      var emails = params === null || params === void 0 ? void 0 : params.emails;
      if (emails) {
          state.emails = initEmails(state.container.area, emails);
      }
      console.log('state', state);
      var _a = state.container, buttons = _a.buttons, area = _a.area;
      initPlaceholder(area, addEmail(area, state.emails));
      buttons.add.addEventListener('click', addNewEmail(area, state.emails));
      buttons.count.addEventListener('click', countValidEmails(state.emails));
  };

  return EmailsInput;

})));
//# sourceMappingURL=emails-input.js.map
