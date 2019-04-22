export default class Component {
  constructor(element, props = {}) {
    this.element = element;
    this.props = props;
  }

  on(eventName, elementName, callback) {
    this.element.addEventListener(eventName, (event) => {
      const delegateTarget = event.target.closest(`[data-element="${elementName}"]`);

      if (!delegateTarget) return;

      // eslint-disable-next-line no-param-reassign
      event.delegateTarget = delegateTarget;
      callback(event);
    });
  }

  setState(newState) {
    this.state = {
      ...this.state,
      ...newState,
    };

    this.render();
  }

  initComponent(Constructor, props = {}) {
    const componentName = Constructor.name;
    const element = this.element.querySelector(`[data-component="${componentName}"]`);
    if (element) {
      // eslint-disable-next-line no-new
      new Constructor(element, props);
    }
  }
}
