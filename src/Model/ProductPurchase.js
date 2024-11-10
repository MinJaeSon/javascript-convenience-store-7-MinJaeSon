import getCurrentDate from '../Utils/getCurrentDate';

class ProductPurchase {
  constructor(products, purchaseInput) {
    this.products = products;
    this.purchaseInput = purchaseInput;
  }

  #getPurchaseProductNameAndQuantity(purchaseInput) {
    const itemRegex = /^\[([\w가-힣]+)-(\d+)\]$/;
    const items = purchaseInput.trim().split(',');

    const purchaseOrder = items.map((item) => {
      const match = item.trim().match(itemRegex);

      return { name: match[1], quantity: Number(match[2]) };
    });

    return purchaseOrder;
  }

  #findProductByName() {
    const purchaseOrder = this.#getPurchaseProductNameAndQuantity(this.purchaseInput);

    return purchaseOrder.map((purchaseItem) => {
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

  #getPromotionInfo() {
    if (!this.#checkIsPromotionTerm()) {
      return;
    }

    const product = this.#findProductByName();
    const promotion = product[0].promotion;
    const buy = promotion.buy;
    const get = promotion.get;

    return { buy, get };
  }

  #checkHasPromotionStock() {
    const promotionProduct = this.#findProductByName()[0];
    const purchaseOrder = this.#getPurchaseProductNameAndQuantity(this.purchaseInput);

    return purchaseOrder.every(
      (purchaseItem, index) => promotionProduct[index].quantity >= purchaseItem.quantity,
    );
  }

  #handle
}

export default ProductPurchase;
