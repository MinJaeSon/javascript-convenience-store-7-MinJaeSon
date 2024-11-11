import ProductStorage from '../Model/ProductStorage.js';
import OutputView from '../View/OutputView.js';

class InitController {
  #outputView;
  #productStorage;

  constructor() {
    this.#outputView = new OutputView();
    this.#productStorage = new ProductStorage();
  }

  async run() {
    this.#outputView.printIntro();
    const currentProducts = this.#productStorage.loadStorage();
    this.#outputView.printCurrentProducts(currentProducts);
  }
}

export default InitController;
