import Product from '../Model/Product.js';
import Promotion from '../Model/Promotion.js';
import fs from 'fs';

class DataParser {
  #parseCSV(filePath) {
    const data = fs.readFileSync(filePath, 'utf8');
    const rows = data.trim().split('\n');
    const headers = rows[0].trim().split(',');

    return rows.slice(1).map((row) =>
      Object.fromEntries(
        row.split(',').map((value, index) => {
          if (value.trim() === 'null') {
            return [headers[index], null];
          }

          return [headers[index], value.trim()];
        }),
      ),
    );
  }

  #parsePromotions(promotionsFilePath) {
    const promotionsData = this.#parseCSV(promotionsFilePath);

    return promotionsData.map(
      (promotion) =>
        new Promotion(
          promotion.name,
          Number(promotion.buy),
          Number(promotion.get),
          promotion.start_date,
          promotion.end_date,
        ),
    );
  }

  #parseProducts(productsFilePath, promotions) {
    const productsData = this.#parseCSV(productsFilePath);

    return productsData.map((product) => {
      const promotion = promotions.find(
        (promotion) => product.promotion !== null && promotion.name === product.promotion,
      );

      return new Product(product.name, Number(product.price), Number(product.quantity), promotion);
    });
  }

  parseProductsAndPromotions(productsFilePath, promotionsFilePath) {
    const promotions = this.#parsePromotions(promotionsFilePath);

    return this.#parseProducts(productsFilePath, promotions);
  }
}

export default DataParser;
