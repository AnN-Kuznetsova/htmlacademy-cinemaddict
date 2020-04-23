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
      containerElement.appendChild(component.getElement());
      return component;
    default:
  }
};

const removeElement = (component) => {
  component.getElement().remove();
};

const remove = (component) => {
  removeElement(component);
  component.removeElement();
};


export {
  createElement,
  RenderPosition,
  render,
  removeElement,
  remove,
};
