import { CartItem } from '../Classes/CartItem.js';
import { cart } from '../script.js';

export default function LocalStorageManager() {}

LocalStorageManager.getItems = function () {
  let localCart = localStorage.getItem('cart');
  let parsedCart = new Array();
  if (localCart) {
    localCart = JSON.parse(localCart);
    for (const cartItem of localCart) {
      parsedCart.push(new CartItem(cartItem));
    }
  }
  return parsedCart;
};

LocalStorageManager.setItems = function (arr) {
  let cartAr = new Array();
  for (const product of arr) {
    cartAr.push(product.toJSONObject());
  }
  localStorage.setItem('cart', JSON.stringify(cartAr));
};

LocalStorageManager.addProduct = function (product) {
  let localCart = localStorage.getItem('cart');
  let parsedCart = new Array();
  if (localCart) {
    parsedCart = JSON.parse(localCart);
  }
  parsedCart.push(product.toJSONObject());
  localStorage.setItem('cart', JSON.stringify(parsedCart));
};
