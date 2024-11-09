class Validator {
  static ERROR_PREFIX = Object.freeze('[ERROR]');
  static ERROR_MESSAGE = Object.freeze({
    INVALID_FORMAT: `${this.ERROR_PREFIX} 올바르지 않은 형식으로 입력했습니다. 다시 입력해 주세요.`,
  });

  static checkPurchaseInput(input) {
    const itemRegex = /^\[[\w가-힣]+-\d+\]$/;
    const items = input.trim().split(',');
    const isValid = items.every((item) => itemRegex.test(item));

    if (!isValid) {
      throw new Error(this.ERROR_MESSAGE.INVALID_FORMAT);
    }
  }
}

export default Validator;
