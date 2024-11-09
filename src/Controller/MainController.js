import InitController from './InitController.js';
import PurchaseController from './PurchaseController.js';

class MainController {
  async run() {
    const initController = new InitController();
    await initController.run();

    const purchaseController = new PurchaseController();
    await purchaseController.run();
  }
}

export default MainController;
