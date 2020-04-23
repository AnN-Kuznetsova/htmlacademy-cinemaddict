const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

const render = (containerElement, component, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      containerElement.prepend(component.getElement());
      break;
    case RenderPosition.BEFOREEND:
      return containerElement.appendChild(component.getElement());
    default:
  }
};

const remove = (element) => {
  element.remove();
};


export {
  createElement,
  RenderPosition,
  render,
  remove,
};
