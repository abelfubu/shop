class CartItem {
  constructor(product) {
    this.product = product;
    this.amount = 1;
    this.div = document.createElement('div');
    this.totalPrice = this.product.price;
    this.key = Math.random();
  }

  changeAmount(operator) {
    const total = this.div.querySelector('#total-item');
    const price = this.div.querySelector('#item-price');
    if (operator === 'ADD') {
      this.amount++;
    } else {
      this.amount--;
      if (this.amount <= 1) {
        this.amount = 1;
      }
    }
    this.totalPrice = (this.amount * this.product.price).toFixed(2);
    total.textContent = this.amount;
    price.textContent = this.totalPrice + '€';

    cart.getSum();
  }

  render() {
    const cartEl = document.querySelector('.cart-items');
    this.div.classList.add('added-product');
    this.div.innerHTML = `
      <img src="${this.product.imgUrl}" alt="${this.product.name}" />
      <div class="card-title"><h5>${this.product.name}</h5>
        <h5 id="item-price">${this.product.price}€</h5></div>    
        <div class="icons"><span class="secondary"><i class="material-icons">remove</i></span></div>
        <div class="icons"><span id="total-item">1<span></div>  
        <div class="icons"><span class="primary"><i class="material-icons">add</i></span></div> 
      <div class="icons"><span class="danger"><i class="material-icons">delete</i><span></div>    
    `;
    const subtract = this.div.querySelector('.secondary');
    const add = this.div.querySelector('.primary');
    const remove = this.div.querySelector('.danger');
    subtract.addEventListener('click', () => this.changeAmount('SUBTRACT'));
    add.addEventListener('click', () => this.changeAmount('ADD'));

    remove.addEventListener('click', () =>
      cart.removeProduct(this.key, this.div)
    );
    cartEl.append(this.div);
  }
}
