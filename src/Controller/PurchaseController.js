import ProductPurchase from '../Model/ProductPurchase.js';
import ProductStorage from '../Model/ProductStorage.js';
import Validator from '../Validation/Validator.js';
import InputView from '../View/InputView.js';

class PurchaseController {
  #inputView;
  #productStorage;
  #productPurchase;
  #currentProducts;

  constructor() {
    this.#inputView = new InputView();
    this.#productStorage = new ProductStorage();
    this.#currentProducts = this.#productStorage.loadProducts();
    this.#productPurchase = new ProductPurchase(this.#currentProducts);
  }

  async run() {
    const purchaseInput = await this.#inputView.inputPurchaseItems();
    Validator.checkPurchaseInput(purchaseInput);

    const purchaseOrder = this.#productPurchase.getPurchaseProductsNameAndQuantity(purchaseInput);
    purchaseOrder.forEach((order) => {
      const orderdProduct = this.#productPurchase.findProductByName(order.name);
      const isPromotionTerm = this.#productPurchase.checkIsPromotionTerm(
        orderdProduct,
        isPromotionTerm,
      );
      const { get, buy } = this.#productPurchase.getPromotionInfo(orderdProduct);

      const { canPurchaseWithPromotionStock, availablePromotionStock, generalPurchaseQuantity } =
        this.#productPurchase.checkPromotionStockAvailability(orderdProduct, get, buy);
    });
  }
}

export default PurchaseController;
