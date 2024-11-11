import getCurrentDate from '../Utils/getCurrentDate';
import ProductStorage from './ProductStorage';

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

  checkPromotionStockAvailability(orderdProduct, get, buy) {
    const promotionQuantity = orderdProduct[0].quantity;
    const group = get + buy;

    const canPurchaseWithPromotionStock = promotionQuantity % group === 0;
    const availablePromotionStock = Math.floor(promotionQuantity / group) * group;
    const generalPurchaseQuantity = promotionQuantity - availablePromotionStock;

    return { canPurchaseWithPromotionStock, availablePromotionStock, generalPurchaseQuantity };
  }

}

export default ProductPurchase;
