import IOUtils from '../utils/IOUtils.js';

class OutputView {
  #outputMsg = Object.freeze({
    INTRO: '안녕하세요. W편의점입니다.\n현재 보유하고 있는 상품입니다.',
    RECEIPT: {
      HEADER: '==============W 편의점================\n상품명		수량	금액\n',
      PURCHASE_LIST: (name, quantity, price) => `${name}		${quantity} 	${price}\n`,
      PRESENT_HEADER: '=============증	정===============\n',
      PRESENT_LIST: (name, quantity) => `${name}		${quantity}`,
      FOOTER: '====================================\n',
      TOTAL_PRICE: (totalPrice, totalQuantity) => `총구매액		${totalQuantity}	${totalPrice}\n`,
      PROMOTION_DISCOUNT: (discountPrice) => `행사할인			-${discountPrice}\n`,
      MEMBERSHIP_DISCOUNT: (discountPrice) => `멤버십할인			-${discountPrice}\n`,
      FINAL_PAYMENT: (payment) => `내실돈			 ${payment}\n`,
    },
  });

  printIntro() {
    IOUtils.output(this.#outputMsg.INTRO);
    IOUtils.newLine();
  }

  #printNoStockProduct(products, productName, productPrice, promotionName) {
    const productTypeCount = products.filter((product) => product.name === productName).length;
    if (productTypeCount === 1 && promotionName !== '' && promotionName !== undefined) {
      IOUtils.output(`- ${productName} ${productPrice}원 재고 없음`);
    }
  }

  printCurrentProducts(products) {
    products.forEach((product) => {
      const promotionName = product.promotion?.name || '';

      IOUtils.output(`- ${product.name} ${product.price}원 ${product.quantity}개 ${promotionName}`);
      this.#printNoStockProduct(products, product.name, product.price, product.promotion?.name);
    });
    IOUtils.newLine();
  }

  printReceipt(
    purchaseList,
    presentList,
    totalPrice,
    totalQuantity,
    promotionDiscount,
    membershipDiscount,
    payment,
  ) {
    IOUtils.output(this.#outputMsg.RECEIPT.HEADER);

    purchaseList.forEach((product) => {
      IOUtils.output(
        this.#outputMsg.RECEIPT.PURCHASE_LIST(product.name, product.quantity, product.price),
      );
    });

    IOUtils.output(this.#outputMsg.RECEIPT.PRESENT_HEADER);
    presentList.forEach((product) => {
      IOUtils.output(this.#outputMsg.RECEIPT.PRESENT_LIST(product.name, product.quantity));
    });
    
    IOUtils.output(this.#outputMsg.RECEIPT.FOOTER);
    IOUtils.output(this.#outputMsg.RECEIPT.TOTAL_PRICE(totalPrice, totalQuantity));
    IOUtils.output(this.#outputMsg.RECEIPT.PROMOTION_DISCOUNT(promotionDiscount));
    IOUtils.output(this.#outputMsg.RECEIPT.MEMBERSHIP_DISCOUNT(membershipDiscount));
    IOUtils.output(this.#outputMsg.RECEIPT.FINAL_PAYMENT(payment));
  }
}

export default OutputView;
