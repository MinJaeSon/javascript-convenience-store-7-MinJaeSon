import InitController from './InitController.js';
import PurchaseController from './PurchaseController.js';
import ReceiptController from './ReceiptController.js';

class MainController {
  async run() {
    const initController = new InitController();
    await initController.run();

    const purchaseController = new PurchaseController();
    await purchaseController.run();

    const receiptController = new ReceiptController();
    await receiptController.run();
  }
}

export default MainController;
