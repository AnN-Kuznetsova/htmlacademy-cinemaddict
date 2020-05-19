const Key = {
  ESC_FULL: `Escape`,
  ESC_SHORT: `Esc`,
  ENTER: `Enter`,
  CONTROL: `Control`,
  COMMAND: `Command`,
};


const pressedKeys = new Set();


const escPressHandler = (evt, handler) => {
  if ((evt.key === Key.ESC_FULL) || (evt.key === Key.ESC_SHORT)) {
    handler();
  }
};

const enterPressHandler = (evt, handler) => {
  if (evt.key === Key.ENTER) {
    handler();
  }
};

const controlPressHandler = (evt, handler) => {
  if (evt.key === Key.CONTROL) {
    handler();
  }
};

const commandPressHandler = (evt, handler) => {
  if (evt.key === Key.COMMAND) {
    handler();
  }
};


const addCommentKeysPressHandler = (evt, handler) => {
  const keyupHandler = (keyupEvt) => {
    pressedKeys.delete(keyupEvt.key);
    document.removeEventListener(`keyup`, keyupHandler);
  };

  enterPressHandler(evt, () => {
    pressedKeys.add(evt.key);
  });

  controlPressHandler(evt, () => {
    pressedKeys.add(evt.key);
  });

  commandPressHandler(evt, () => {
    pressedKeys.add(evt.key);
  });

  if (pressedKeys.has(Key.ENTER) && (pressedKeys.has(Key.CONTROL) || pressedKeys.has(Key.COMMAND))) {
    handler();
  }

  document.addEventListener(`keyup`, keyupHandler);
};


export {
  addCommentKeysPressHandler,
  escPressHandler,
};
