import Card from './Classes/Card.js';
import Cart from './Classes/Cart.js';
import { CartItem } from './Classes/CartItem.js';
import Filters from './Classes/Filters.js';
import Shop from './Classes/Shop.js';
import LocalStorageManager from './utils/LocalStorageManager.js';

const body = document.body;
const filter = body.querySelector('form button');
const cartButton = body.querySelector('#cart-button');
const letters = body.querySelectorAll('.letter');
const cartBoxEl = body.querySelector('#cart');
const backdrop = body.querySelector('#backdrop');
const exitBtn = document.getElementById('exit-cart');
const header = body.querySelector('header');
let cartOpen = false;

for (let i = 0; i < letters.length; i++) {
  const icons = [`!`, `yeah`, `?`, `Hi`, `Welcome`, `O`, `a`, `z`];
  let lastValue = '';
  letters[i].addEventListener('mouseover', () => {
    letters[i].style.backgroundColor = 'yellow';
    lastValue = letters[i].textContent;
    letters[i].textContent = icons[i];
  });
  letters[i].addEventListener('mouseleave', () => {
    letters[i].style.backgroundColor = 'rgba(255, 0, 0, 0.486)';
    letters[i].textContent = lastValue;
  });
}

const c1 = new Card(
  'JavaScript',
  'Yellow',
  'https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png',
  19.99
);

const c2 = new Card(
  'Angular',
  'Red',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/1200px-Angular_full_color_logo.svg.png',
  19.99
);

const c3 = new Card(
  'React.js',
  'Blue',
  'https://www.lasnaves.com/wp-content/uploads/2015/07/React.js_logo.svg_.png',
  21.99
);

const c4 = new Card(
  'Node.js',
  'Green',
  'https://ih1.redbubble.net/image.1100292862.0669/mp,840x830,matte,f8f8f8,t-pad,1000x1000,f8f8f8.jpg',
  13.99
);

export const cart = new Cart();
export const shop = new Shop();
shop.addProduct(c1);
shop.addProduct(c2);
shop.addProduct(c3);
shop.addProduct(c4);
const filters = new Filters();
filters.render();

const renderCartLocal = () => {
  let localAr = LocalStorageManager.getItems();
  for (const item of localAr) {
    cart.addOne(item.product);
  }
  setTimeout(() => {
    cart.getSum();
  }, 1000);
};

renderCartLocal();

const toggleBackdrop = () => {
  backdrop.classList.toggle('hidden');
  backdrop.classList.toggle('visible');
  if (cartOpen) {
    cartBoxEl.style.display = 'none';
    cartOpen = false;
  }
  LocalStorageManager.setItems(cart.addedProducts);
};

const showCartBox = () => {
  cartBoxEl.style.display = 'block';
  cartBoxEl.scrollIntoView({ block: 'center', behavior: 'smooth' });
  toggleBackdrop();
  cartOpen = true;
};

const hideCartBox = () => {
  cartBoxEl.style.display = 'none';
  toggleBackdrop();
  cartOpen = false;
};

const headerScrollHandler = () => {
  if (document.documentElement.scrollTop > 50) {
    header.classList.add('white');
  } else {
    header.classList.remove('white');
  }
};

filter.addEventListener('click', e => {
  e.preventDefault();
  filters.filterByColor();
});

cartButton.addEventListener('click', showCartBox);
backdrop.addEventListener('click', toggleBackdrop);
exitBtn.addEventListener('click', hideCartBox);
window.addEventListener('scroll', headerScrollHandler);
