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
}

export default ProductPurchase;
