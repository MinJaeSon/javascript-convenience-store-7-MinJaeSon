import getCurrentDate from "../Utils/getCurrentDate";

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

  #checkIsPromotionTerm() {
    const currentDate = getCurrentDate();
    const product = this.#findProductByName();
    const startDate = Number(product[0].promotion?.start_date.replace(/-/g, ''));
    const endDate = Number(product[0].promotion?.end_date.replace(/-/g, ''));

    if (!product[0].promotion) {
      return;
    }

    return currentDate >= startDate && currentDate <= endDate;
  }
}

export default ProductPurchase;
