export function cartTotal(cartCtx) {
  return cartCtx.items.reduce((totalPrice, item) => {
    return totalPrice + item.quantity * item.price;
  }, 0);
}
