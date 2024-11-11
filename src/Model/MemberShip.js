class Membership {
  static getMembershipDiscountAmount(orderdProduct) {
    let sum = 0;

    orderdProduct.forEach((product) => {
      if (product.promotion) {
        sum += product.price;
      }
    });

    return sum * 0.3;
  }
}

export default Membership;
