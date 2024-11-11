import Receipt from "../Model/Receipt";
import OutputView from "../View/OutputView";

class ReceiptController {
  #receipt
  #outputView;

  constructor() {
    this.#receipt = Receipt();
    this.#outputView = new OutputView();
  }

  async run() {
    this.#outputView.printReceipt(this.#receipt);
  }
}

export default ReceiptController;