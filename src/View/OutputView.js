import IOUtils from '../utils/IOUtils.js';

class OutputView {
  #outputMsg = Object.freeze({
    INTRO: '안녕하세요. W편의점입니다.\n현재 보유하고 있는 상품입니다.',
  });

  printIntro() {
    IOUtils.output(this.#outputMsg.INTRO);
    IOUtils.newLine();
  }

  printCurrentProducts(products) {
    products.forEach((product) => {
      const promotionName = product.promotion?.name || '';

      IOUtils.output(`- ${product.name} ${product.price}원 ${product.quantity}개 ${promotionName}`);
    });
    IOUtils.newLine();
  }
}

export default OutputView;
