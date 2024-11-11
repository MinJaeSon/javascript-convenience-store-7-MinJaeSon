import ProductPurchase from '../Model/ProductPurchase.js';
import ProductStorage from '../Model/ProductStorage.js';
import Validator from '../Validation/Validator.js';
import InputView from '../View/InputView.js';
import OutputView from '../View/OutputView.js';

class PurchaseController {
  #inputView;
  #outputView;
  #productStorage;
  #productPurchase;
  #currentProducts;

  constructor() {
    this.#inputView = new InputView();
    this.#outputView = new OutputView();
    this.#productStorage = new ProductStorage();
    this.#currentProducts = this.#productStorage.loadStorage();
    this.#productPurchase = new ProductPurchase(this.#currentProducts);
  }

  async run() {
    let updatedProducts;

    const purchaseInput = await this.#inputView.inputPurchaseItems();
    Validator.checkPurchaseInput(purchaseInput);

    const purchaseOrder = this.#productPurchase.getPurchaseProductsNameAndQuantity(purchaseInput);

    purchaseOrder.forEach((order) => {
      const orderdProduct = this.#productPurchase.findProductByName(order.name);
      const isPromotionTerm = this.#productPurchase.checkIsPromotionTerm(orderdProduct);
      const { get, buy } = this.#productPurchase.getPromotionInfo(orderdProduct, isPromotionTerm);

      const canPurchaseOnlyWithPromotion = this.#productPurchase.checkPromotionStockAvailability(
        orderdProduct,
        order,
        get,
        buy,
      );

      if (!canPurchaseOnlyWithPromotion) {
        const willPurchaseGeneral = this.#checkGeneralPurchaseConfirmation(order, generalPurchaseQuantity);
        if (willPurchaseGeneral) {
          const generalPurchaseQuantity = this.#productPurchase.getGeneralPurchaseQuantity(
            orderdProduct,
            order,
            get,
            buy,
          );
          // generalPurchaseQuantity만큼은 정가로 구입
        }
      }

      const { canAddProduct, presentQuantity } = this.#productPurchase.checkGetPromotionBenefit(
        orderdProduct,
        order,
        buy,
        get,
      );

      if (canAddProduct) {
        const willGetPresent = this.#checkPromotionBenefitConfirmation(presentQuantity);
        if (willGetPresent) {
          // presentQuantity만큼은 증정
        }
      }

      updatedProducts = this.#productStorage.updateStorage(order.name, order.quantity);
    });

    this.#outputView.printCurrentProducts(updatedProducts);
  }

  async #checkGeneralPurchaseConfirmation(order, generalPurchaseQuantity) {
    const willPurchaseGeneral = await this.#inputView.inputNoPromotionWarning(
      order.name,
      generalPurchaseQuantity,
    );
    Validator.checkYesOrNoInput(willPurchaseGeneral);

    return willPurchaseGeneral;
  }

  async #checkPromotionBenefitConfirmation(presentQuantity) {
    const willGetPresent = await this.#inputView.inputNotifyPromotionBenefit(
      order.name,
      presentQuantity,
    );
    Validator.checkYesOrNoInput(willGetPresent);

    return willGetPresent;
  }
}

export default PurchaseController;
