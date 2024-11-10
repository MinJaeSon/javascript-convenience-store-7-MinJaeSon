import { fileURLToPath } from 'url';
import path from 'path';
import DataParser from '../Utils/DataParser.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class ProductStorage {
  products;
  #dataParser;

  constructor() {
    this.products = [];
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

  loadProducts() {
    this.products = this.#getCurrentProducts();

    return this.products;
  }
}

export default ProductStorage;