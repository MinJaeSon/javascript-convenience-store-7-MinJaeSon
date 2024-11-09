import { fileURLToPath } from 'url';
import path from 'path';
import OutputView from '../View/OutputView.js';
import DataParser from '../Utils/DataParser.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class InitController {
  #outputView;
  #dataParser;

  constructor() {
    this.#outputView = new OutputView();
    this.#dataParser = new DataParser();
  }

  #getCurrentProducts() {
    const productsFilePath = path.join(__dirname, '../../public/products.md');
    const promotionsFilePath = path.join(__dirname, '../../public/promotions.md');

    const currentProducts = this.#dataParser.parseProductsAndPromotions(
      productsFilePath,
      promotionsFilePath,
    );

    return currentProducts;
  }

  async run() {
    this.#outputView.printIntro();
    const currentProducts = this.#getCurrentProducts();
    this.#outputView.printCurrentProducts(currentProducts);
  }
}

export default InitController;
