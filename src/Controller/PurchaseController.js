import Validator from '../Validation/Validator.js';
import InputView from '../View/InputView.js';

class PurchaseController {
  #inputView;

  constructor() {
    this.#inputView = new InputView();
  }

  async run() {
    const purchaseInput = await this.#inputView.inputPurchaseItems();
    Validator.checkPurchaseInput(purchaseInput);
  }
}

export default PurchaseController;
