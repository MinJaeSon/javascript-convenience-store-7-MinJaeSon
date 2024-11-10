import IOUtils from '../utils/IOUtils.js';

class InputView {
  #inputMsg = Object.freeze({
    PURCHASE: '구매하실 상품명과 수량을 입력해 주세요. (예: [사이다-2],[감자칩-1])\n',
    NO_PROMOTION_WARNING: (name, quantity) =>
      `현재 ${name} ${quantity}개는 프로모션 할인이 적용되지 않습니다. 그래도 구매하시겠습니까? (Y/N)\n`,
  });

  async inputPurchaseItems() {
    const purchaseItems = await IOUtils.input(this.#inputMsg.PURCHASE);
    IOUtils.newLine();

    return purchaseItems;
  }

  async inputNoPromotionWarning(name, quantity) {
    const isPurchase = await IOUtils.input(this.#inputMsg.NO_PROMOTION_WARNING(name, quantity));
    IOUtils.newLine();

    return isPurchase;
  }
}

export default InputView;
