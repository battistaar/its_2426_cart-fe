export function getDiscountedPrice(price: number, discount: number) {
  return price * (1-discount/100);
}

export function getVatPrice(price: number, vat: number) {
  return price * (1 + vat);
}

export function getTransportFee(weight: number) {
  let transportFee = 0;
  if (weight > 2000) {
      transportFee = 7;
  }
  if (weight > 5000) {
      transportFee = 15;
  }
  if (weight > 10000) {
      transportFee = 20;
  }
  return transportFee;
}

export function calcCartItem(item: any, vat: number) {
  const discountedPrice = getDiscountedPrice(item.netPrice, item.discount);
  const price = getVatPrice(discountedPrice, vat);
  const total = price * item.quantity;

  return {
      ...item,
      discountedPrice: discountedPrice * item.quantity,
      vatAmount: (discountedPrice * item.quantity) * vat,
      totalPrice: total,
      discountAmount: total * item.discount / 100,
      totalWeight: item.weight * item.quantity
  };
}

export function getVat(country: string) {
  return country === 'IT' ? 0.22 : 0;
}
