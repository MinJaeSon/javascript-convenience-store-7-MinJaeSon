class Receipt {
  #purchaseList;
  #presentList;
  #totalPrice;
  #totalQuantity;
  #promotionDiscount;
  #membershipDiscount;
  #payment;

  constructor(purchaseList, presentList, totalPrice, totalQuantity, promotionDiscount, membershipDiscount, payment) {
    this.#purchaseList = purchaseList;
    this.#presentList = presentList;
    this.#totalPrice = totalPrice;
    this.#totalQuantity = totalQuantity;
    this.#promotionDiscount = promotionDiscount;
    this.#membershipDiscount = membershipDiscount;
    this.#payment = payment;
  }

  
}

export default Receipt;
