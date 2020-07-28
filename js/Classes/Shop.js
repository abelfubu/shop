class Shop {
  constructor() {
    this.products = [];
  }
  render(arr) {
    for (const product of arr) {
      product.createCard();
    }
  }
  addProduct(product) {
    this.products.push(product);
    product.createCard();
  }
  getPrices() {
    const prices = [];
    for (const product of this.products) {
      prices.push(product.price);
    }
    return prices;
  }
}

export default Shop;
