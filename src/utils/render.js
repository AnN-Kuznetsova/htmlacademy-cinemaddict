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
      containerElement.append(component.getElement());
      break;
    default:
  }
  return component;
};


const replace = (newComponent, oldComponent) => {
  const parentElement = oldComponent.getElement().parentElement;
  const newElement = newComponent.getElement();
  const oldElement = oldComponent.getElement();

  const isExistElements = !!(parentElement && newElement && oldElement);

  if (isExistElements && parentElement.contains(oldElement)) {
    parentElement.replaceChild(newElement, oldElement);
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
  RenderPosition,
  createElement,
  remove,
  removeElement,
  render,
  replace,
};
