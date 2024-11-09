import Validator from '../Validation/Validator.js';
import InputView from '../View/InputView.js';

class PurchaseController {
  #inputView;

  constructor() {
    this.#inputView = new InputView();
  }

  async run() {
    const purchaseItems = await this.#inputView.inputPurchaseItems();
    Validator.checkPurchaseInput(purchaseItems);
  }
}

export default PurchaseController;
