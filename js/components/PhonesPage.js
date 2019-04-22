import Filter from './Filter.js';
import PhonesCatalog from './PhonesCatalog.js';
import ShoppingCart from './ShoppingCart.js';
import PhoneViewer from './PhoneViewer.js';
import Component from '../Component.js';

import { getAll, getById } from '../api/phones.js';

export default class PhonesPage extends Component {
  constructor(element) {
    super(element);

    this.state = {
      phones: [],
      selectedPhone: null,
      items: {},
    };

    this.onPhoneSelected = phoneId => this.selectedPhone(phoneId);
    this.onAdd = phoneId => this.addItem(phoneId);
    this.onBack = () => this.unselectedPhone();
    this.onRemove = itemToRemove => this.removeItem(itemToRemove);

    this.render();
    this.loadPhones();
  }

  async loadPhones() {
    const phones = await getAll();

    this.setState({ phones });
  }

  removeItem(itemToRemove) {
    const newItems = { ...this.state.items };
    delete newItems[itemToRemove];

    this.setState({
      items: newItems,
    });
  }

  addItem(item) {
    const oldItems = this.state.items;
    const items = {
      ...oldItems,
      [item]: oldItems[item] ? oldItems[item] + 1 : 1,
    };

    this.setState({ items });
  }

  selectedPhone(phoneId) {
    getById(phoneId)
      .then(phone => this.setState({ selectedPhone: phone }));
  }

  unselectedPhone() {
    this.setState({ selectedPhone: null });
  }

  render() {
    this.element.innerHTML = `
      <div class="row">

      <!--Sidebar-->
      <div class="col-md-2">
        <section>
          <div data-component="Filter"></div>
        </section>
          <div data-component="ShoppingCart"></div>
        <section>
          
        </section>
      </div>

      <!--Main content-->
      <div class="col-md-10">
        ${this.state.selectedPhone
    ? '<div data-component="PhoneViewer"></div>'
    : '<div data-component="PhonesCatalog"></div>'
}
      </div>
    </div>
    `;

    this.initComponent(PhonesCatalog, {
      phones: this.state.phones,
      onPhoneSelected: this.onPhoneSelected,
      onAdd: this.onAdd,
    });

    this.initComponent(PhoneViewer, {
      phone: this.state.selectedPhone,
      onBack: this.onBack,
      onAdd: this.onAdd,
    });

    this.initComponent(Filter);

    this.initComponent(ShoppingCart, {
      items: this.state.items,
      onRemove: this.onRemove,
    });
  }
}
