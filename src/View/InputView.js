import IOUtils from '../utils/IOUtils.js';

class InputView {
  #inputMsg = Object.freeze({
    PURCHASE: '구매하실 상품명과 수량을 입력해 주세요. (예: [사이다-2],[감자칩-1])\n',
    NO_PROMOTION_WARNING: (name, quantity) =>
      `현재 ${name} ${quantity}개는 프로모션 할인이 적용되지 않습니다. 그래도 구매하시겠습니까? (Y/N)\n`,
    NOTIFY_PROMOTION_BENEFIT: (name, quantity) =>
      `현재 ${name}은(는) ${quantity}개를 무료로 더 받을 수 있습니다. 추가하시겠습니까? (Y/N)\n`,
    MEMBERSHIP_APPLY: '멤버십 할인을 받으시겠습니까? (Y/N)',
  });

  async inputPurchaseItems() {
    const purchaseItems = await IOUtils.input(this.#inputMsg.PURCHASE);
    IOUtils.newLine();

    return purchaseItems;
  }

  async inputNoPromotionWarning(name, quantity) {
    const willPurchaseGeneral = await IOUtils.input(
      this.#inputMsg.NO_PROMOTION_WARNING(name, quantity),
    );
    IOUtils.newLine();

    return willPurchaseGeneral;
  }

  async inputNotifyPromotionBenefit(name, quantity) {
    const willGetPresent = await IOUtils.input(
      this.#inputMsg.NOTIFY_PROMOTION_BENEFIT(name, quantity),
    );
    IOUtils.newLine();

    return willGetPresent;
  }

  async inputMembershipApply() {
    const willApplyMembership = await IOUtils.input(this.#inputMsg.MEMBERSHIP_APPLY);
    IOUtils.newLine();

    return willApplyMembership;
  }
}

export default InputView;
