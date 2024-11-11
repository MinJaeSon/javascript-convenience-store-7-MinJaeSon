import getCurrentDate from '../Utils/getCurrentDate.js';
import ProductStorage from './ProductStorage.js';

class ProductPurchase {
  products = [];
  #productStorage;

  constructor(products) {
    this.products = products;
    this.#productStorage = new ProductStorage();
  }

  getPurchaseProductsNameAndQuantity(purchaseInput) {
    const itemRegex = /^\[([\w가-힣]+)-(\d+)\]$/;
    const items = purchaseInput.trim().split(',');

    const purchaseOrder = items.map((item) => {
      const match = item.trim().match(itemRegex);

      return { name: match[1], quantity: Number(match[2]) };
    });

    return purchaseOrder; // [{name: '상품명', quantity: 상품수량}, ...]
  }

  findProductByName(name) {
    const orderedProduct = this.products.filter((product) => product.name === name);

    return orderedProduct; // [{프로모션 상품 객체}, {일반 상품 객체}]
  }

  checkIsPromotionTerm(orderedProducts) {
    const currentDate = getCurrentDate();
    const startDate = Number(orderedProducts[0].promotion?.start_date.replace(/-/g, ''));
    const endDate = Number(orderedProducts[0].promotion?.end_date.replace(/-/g, ''));

    if (!orderedProducts[0].promotion) {
      return;
    }

    return currentDate >= startDate && currentDate <= endDate;
  }

  getPromotionInfo(orderdProduct, isPromotionTerm) {
    if (!isPromotionTerm) {
      return;
    }

    const promotion = orderdProduct[0].promotion;
    const buy = promotion.buy;
    const get = promotion.get;

    return { buy, get };
  }

  checkPromotionStockAvailability(orderdProduct, order, get, buy) {
    const promotionQuantity = orderdProduct[0].quantity;
    const group = get + buy;
    const orderedQuantity = order.quantity;

    const canPurchasePromotionStock =
      promotionQuantity >= orderedQuantity || promotionQuantity % group === 0;

    return canPurchasePromotionStock;
  }

  #getReducePromotionQuantity(orderedQuantity, promotionQuantity, group) {
    if (orderedQuantity < group) {
      return orderedQuantity;
    }
    if (promotionQuantity % group === 0) {
      return Math.floor(promotionQuantity % group) * group;
    }
    return Math.floor(orderedQuantity / group) * group;
  }

  getGeneralPurchaseQuantity(orderdProduct, order, get, buy) {
    const promotionQuantity = orderdProduct[0].quantity;
    const group = get + buy;
    const orderedQuantity = order.quantity;

    const reducePromotionQuantity = this.#getReducePromotionQuantity(orderedQuantity, promotionQuantity, group);
    const reduceGeneralQuantity = orderedQuantity - reducePromotionQuantity;

    return reduceGeneralQuantity;
  }

  checkGetPromotionBenefit(orderedProduct, order, buy, get) {
    const promotionQuantity = orderedProduct[0].quantity;
    const group = get + buy;
    const orderedQuantity = order.quantity;

    const canAddProduct =
      orderedQuantity % group === buy && orderedQuantity + get <= promotionQuantity;
    const presentQuantity = get;

    return { canAddProduct, presentQuantity };
  }
}

export default ProductPurchase;
