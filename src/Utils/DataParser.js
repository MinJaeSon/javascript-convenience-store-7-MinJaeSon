import Product from '../Model/Product';
import Promotion from '../Model/Promotion';

class DataParser {
  #parseCSV(filePath) {
    const data = fs.readFileSync(filePath, 'utf8');
    const rows = data.split('\n');
    const headers = rows[0].split(',');

    return rows
      .slice(1)
      .map((row) =>
        Object.fromEntries(row.split(',').map((value, index) => [headers[index], value])),
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
    const productsData = DataParser.parseCSV(productsFilePath);

    return productsData.map((product) => {
      const promotion = promotions.find((promotion) => promotion.name === product.promotion);

      return new Product(product.name, Number(product.price), Number(product.quantity), promotion);
    });
  }

  parseProductsAndPromotions(productsFilePath, promotionsFilePath) {
    const promotions = this.#parsePromotions(promotionsFilePath);

    return this.#parseProducts(productsFilePath, promotions);
  }
}

export default DataParser;
