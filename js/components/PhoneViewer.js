export default class PhoneViewer {
  constructor(element, props) {
    this.element = element;
    this.props = props;

    this.render();
  }

  render() {
    const { phone } = this.props;

    this.element.innerHTML = `
      <div>
      
        <img class="phone" src="${ phone.images[0] }">
        
        <button>Back</button>
        <button>Add to basket</button>
        
        
        <h1>${ phone.name }</h1>
        
        <p>${ phone.description }</p>
        
        <ul class="phone-thumbs">
          ${ phone.images.map(image => `
            <li>
                <img src="${ image }">
            </li>
          `).join('') }
          
        </ul>
        
      </div>
    `;
  }
}
