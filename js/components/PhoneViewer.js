export default class PhoneViewer {
  constructor(element, props) {
    this.element = element;
    this.props = props;

    this.render();
    document.querySelector('[class = "phone-thumbs"]').addEventListener('click', (event) => {
      const link = event.target.closest('li');
      const mainImg = document.querySelector('[class = "phone"]');
      mainImg.setAttribute("src", link.children[0].getAttribute("src"))
    });

    document.querySelector('[class="button-back"]').addEventListener('click', this.props.onBackButton);
  }

  render() {
    const { phone } = this.props;

    this.element.innerHTML = `
      <div>
      
        <img class="phone" src="${ phone.images[0] }">
        
        <button class="button-back">Back</button>
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
