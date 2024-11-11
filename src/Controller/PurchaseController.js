import Membership from '../Model/MemberShip.js';
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
  #membership;

  constructor() {
    this.#inputView = new InputView();
    this.#outputView = new OutputView();
    this.#productStorage = new ProductStorage();
    this.#currentProducts = this.#productStorage.loadStorage();
    this.#productPurchase = new ProductPurchase(this.#currentProducts);
    this.#membership = new Membership();
  }

  async run() {
    const purchaseInput = await this.#inputView.inputPurchaseItems();
    Validator.checkPurchaseInput(purchaseInput);

    const purchaseOrder = this.#productPurchase.getPurchaseProductsNameAndQuantity(purchaseInput);

    purchaseOrder.forEach((order) => {
      const orderdProduct = this.#productPurchase.findProductByName(order.name);
      const isPromotionTerm = this.#productPurchase.checkIsPromotionTerm(orderdProduct);
      const { get = 0, buy = 0 } =
        this.#productPurchase.getPromotionInfo(orderdProduct, isPromotionTerm) || {};

      const canPurchaseOnlyWithPromotion = this.#productPurchase.checkPromotionStockAvailability(
        orderdProduct,
        order,
        get,
        buy,
      );

      if (!canPurchaseOnlyWithPromotion) {
        const generalPurchaseQuantity = this.#productPurchase.getGeneralPurchaseQuantity(
          orderdProduct,
          order,
          get,
          buy,
        );

        const willPurchaseGeneral = this.#checkGeneralPurchaseConfirmation(
          order,
          generalPurchaseQuantity,
          get,
          buy,
          purchaseOrder,
        );

        if (willPurchaseGeneral) {
          // generalPurchaseQuantity만큼은 정가로 구입
        }
      } else {
        // order.quantity를 모두 정가로 구입
      }

      const { canAddProduct, presentQuantity } = this.#productPurchase.checkGetPromotionBenefit(
        orderdProduct,
        order,
        buy,
        get,
      );

      if (canAddProduct) {
        const willGetPresent = this.#checkPromotionBenefitConfirmation(order, presentQuantity);
        if (willGetPresent) {
          // presentQuantity만큼은 증정
        }
      }

      updatedProducts = this.#productStorage.updateStorage(order.name, order.quantity);
    });

    const willApplyMembership = await this.#checkMembershipConfirmation();
    if (willApplyMembership) {
      const membershipDiscountAmount = this.#membership.getMembershipDiscountAmount(purchaseOrder);
    }
  }

  async #checkGeneralPurchaseConfirmation(order, generalPurchaseQuantity, get, buy, purchaseOrder) {
    if ((get === 0 && buy === 0) || purchaseOrder.length === 1) {
      return true;
    }

    const willPurchaseGeneral = await this.#inputView.inputNoPromotionWarning(
      order.name,
      generalPurchaseQuantity,
    );
    Validator.checkYesOrNoInput(willPurchaseGeneral);

    return willPurchaseGeneral;
  }

  async #checkPromotionBenefitConfirmation(order, presentQuantity) {
    const willGetPresent = await this.#inputView.inputNotifyPromotionBenefit(
      order.name,
      presentQuantity,
    );
    Validator.checkYesOrNoInput(willGetPresent);

    return willGetPresent;
  }

  async #checkMembershipConfirmation(order, presentQuantity) {
    const willApplyMembership = await this.#inputView.inputMembershipApply();
    Validator.checkYesOrNoInput(willApplyMembership);

    return willApplyMembership;
  }
}

export default PurchaseController;
