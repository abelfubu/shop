import { shop } from '../script.js';

export default class Filters {
  contructor() {
    this.filteredArray = [];
  }
  render() {
    const colors = [];
    const form = document.querySelector('aside form');
    for (const product of shop.products) {
      if (!colors.includes(product.color)) {
        colors.push(product.color);
        const opt = `
          <input type="checkbox" name="${product.color}" id="${product.color}" checked/>
          <label for="${product.color}">${product.color}</label><br />
          `;
        form.insertAdjacentHTML('afterbegin', opt);
      }
    }
    const slider = `
    <p class="range-field">
      <input type="range" id="range" min="10" max="${
        Math.floor(Math.max(...shop.getPrices())) + 1
      }" value="${Math.floor(Math.max(...shop.getPrices())) + 1}"/>
    </p>`;

    form.querySelector('button').insertAdjacentHTML('beforebegin', slider);
  }

  filterByColor() {
    document.querySelector('.shop').innerHTML = '';
    const range = document.querySelector('#range').value;
    const form = document.querySelector('form');
    const inputs = form.querySelectorAll('input');

    for (const input of inputs) {
      if (input.checked === true) {
        for (const product of shop.products) {
          if (input.name === product.color && range > product.price) {
            product.createCard();
          }
        }
      }
    }
  }
}
