class ProductPurchase {
  constructor(products, purchaseItems) {
    this.products = products;
    this.purchaseItems = purchaseItems;
  }

  #getPurchaseProductNameAndQuantity(purchaseInput) {
    const itemRegex = /^\[([\w가-힣]+)-(\d+)\]$/;
    const items = purchaseInput.trim().split(',');

    const purchaseItems = items.map((item) => {
      const match = item.trim().match(itemRegex);

      return { name: match[1], quantity: Number(match[2]) };
    });

    return purchaseItems;
  }

  #findProductByName() {
    const purchaseItems = this.#getPurchaseProductNameAndQuantity(this.purchaseItems);

    return purchaseItems.map((purchaseItem) => {
      const product = this.products.find((product) => product.name === purchaseItem.name);

      return product; // [{프로모션 상품 객체}, {일반 상품 객체}]
    });
  }
}

export default ProductPurchase;
