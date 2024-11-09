import IOUtils from "../utils/IOUtils.js";

class InputView {
  #inputMsg = Object.freeze({
    PURCHASE: '구매하실 상품명과 수량을 입력해 주세요. (예: [사이다-2],[감자칩-1])\n'
  });

  async inputPurchaseItems() {
    const purchaseItems = await IOUtils.input(this.#inputMsg.PURCHASE);
    IOUtils.newLine();

    return purchaseItems;
  }
}

export default InputView;