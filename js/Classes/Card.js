import { cart } from '../script.js';

export default class Card {
  constructor(name, color, imgUrl, price) {
    this.name = name;
    this.color = color;
    this.imgUrl = imgUrl;
    this.price = price;
    this.id = Math.random();
  }

  createCard = () => {
    const cardEl = document.createElement('div');
    cardEl.classList.add('card-product');
    cardEl.innerHTML = `
      <img src="${this.imgUrl}" alt="${this.name}" />
      <div class="card-title"><h5>${this.name}</h5>
      <h5>${this.price}€</h5></div>
      
      <div class="icons">
        <span class="secondary"><i class="material-icons">add_shopping_cart</i></span>
        <span class="primary"><i class="material-icons">favorite_border</i></span>
      </div>
      `;
    const btn = cardEl.querySelector('span');
    btn.addEventListener('click', () => {
      cart.addProduct(this.id);
    });
    document.querySelector('.shop').append(cardEl);
  };

  toJSONObject() {
    let obj = {};
    obj.name = this.name;
    obj.color = this.color;
    obj.imgUrl = this.imgUrl;
    obj.price = this.price;
    obj.id = this.id;
    return obj;
  }
}
