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
    this.#currentProducts = this.#productStorage.loadStorage();
    this.#productPurchase = new ProductPurchase(this.#currentProducts);
  }

  async run() {
    const purchaseInput = await this.#inputView.inputPurchaseItems();
    Validator.checkPurchaseInput(purchaseInput);

    const purchaseOrder = this.#productPurchase.getPurchaseProductsNameAndQuantity(purchaseInput);
    purchaseOrder.forEach((order) => {
      const orderdProduct = this.#productPurchase.findProductByName(order.name);
      const isPromotionTerm = this.#productPurchase.checkIsPromotionTerm(orderdProduct);
      const { get, buy } = this.#productPurchase.getPromotionInfo(orderdProduct, isPromotionTerm);

      const { canPurchasePromotionStock, availablePromotionStock, generalPurchaseQuantity } =
        this.#productPurchase.checkPromotionStockAvailability(orderdProduct, order, get, buy);

      if (canPurchasePromotionStock) {
        this.#productPurchase.handlePurchasePromotion();
      } else {
        this.#handleGeneralPurchaseConfirmation(order, generalPurchaseQuantity);
        this.#productPurchase.handlePurchaseBoth();
      }

      const { canAddProduct, addQuantity } = this.#productPurchase.checkGetPromotionBenefit(
        orderdProduct,
        order,
        buy,
        get,
      );

      if (canAddProduct) {
        this.#handlePromotionBenefitConfirmation();
      }
    });
  }

  async #handleGeneralPurchaseConfirmation(order, generalPurchaseQuantity) {
    const willPurchaseGeneral = await this.#inputView.inputNoPromotionWarning(
      order.name,
      generalPurchaseQuantity,
    );
    Validator.checkYesOrNoInput(willPurchaseGeneral);
  }

  async #handlePromotionBenefitConfirmation() {
    const willAddProduct = await this.#inputView.inputNotifyPromotionBenefit();
    Validator.checkYesOrNoInput(willAddProduct);
  }
}

export default PurchaseController;
