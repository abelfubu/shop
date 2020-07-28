import { shop } from '../script.js';
import LocalStorageManager from '../utils/LocalStorageManager.js';

export default class Cart {
  constructor() {
    this.addedProducts = [];
    this.currentSum = 0;
    this.itemsAmount = 0;
  }

  notificationHandle(operator) {
    const notification = document.getElementById('notification');
    notification.style.visibility = 'visible';
    if (operator === 'ADD') {
      this.itemsAmount++;
    } else {
      this.itemsAmount--;
    }
    notification.textContent = this.itemsAmount;
    if (this.itemsAmount == 0) {
      notification.style.visibility = 'hidden';
    }
  }

  addOne(product) {
    import('./CartItem.js').then(module => {
      const newItem = new module.CartItem(null, product);
      newItem.render();
      this.addedProducts.push(newItem);
    });
    this.notificationHandle('ADD');
    setTimeout(() => {
      this.getSum();
    }, 50);
  }

  getSum() {
    const li = document.querySelector('#price');
    const cartTotal = document.querySelector('#cart-total-price');
    for (const product of this.addedProducts) {
      this.currentSum += +product.totalPrice;
    }

    li.innerText = `${this.currentSum.toFixed(2)}€`;
    cartTotal.innerText = `${this.currentSum.toFixed(2)}€`;
    this.currentSum = 0;
  }

  addProduct(id) {
    for (const product of shop.products) {
      if (product.id === id) {
        this.addOne(product);
        LocalStorageManager.addProduct(product);
      }
    }
  }

  removeProduct(key, el) {
    this.addedProducts = this.addedProducts.filter(item => item.key != key);

    this.getSum();
    el.remove();
    this.notificationHandle('SUBTRACT');
  }
}
