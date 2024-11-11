import { fileURLToPath } from 'url';
import path from 'path';
import DataParser from '../Utils/DataParser.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class ProductStorage {
  #products;
  #dataParser;

  constructor() {
    this.#products = [];
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

  loadStorage() {
    this.#products = this.#getCurrentProducts();

    return this.#products;
  }

  updateStorage(name, reduceQuantity) {
    const products = this.#products.filter((product) => product.name === name);
    const promotionProduct = products.find((product) => product.promotion);
    const generalProduct = products.find((product) => !product.promotion);

    if (promotionProduct && generalProduct) {
      if (promotionProduct.quantity >= reduceQuantity) {
        promotionProduct.quantity -= reduceQuantity;
      } else {
        const remainingQuantity = reduceQuantity - promotionProduct.quantity;
        promotionProduct.quantity = '재고 없음';
        if (generalProduct.quantity < remainingQuantity) {
          throw new Error('[ERROR] 재고 수량을 초과하여 구매할 수 없습니다. 다시 입력해 주세요.');
        }
        generalProduct.quantity -= remainingQuantity;
      }
    } else if (promotionProduct) {
      if (promotionProduct.quantity < reduceQuantity) {
        throw new Error('[ERROR] 재고 수량을 초과하여 구매할 수 없습니다. 다시 입력해 주세요.');
      }
      promotionProduct.quantity -= reduceQuantity;
    } else if (generalProduct) {
      if (generalProduct.quantity < reduceQuantity) {
        throw new Error('[ERROR] 재고 수량을 초과하여 구매할 수 없습니다. 다시 입력해 주세요.');
      }
      generalProduct.quantity -= reduceQuantity;
    }

    return this.#products;
  }
}

export default ProductStorage;
