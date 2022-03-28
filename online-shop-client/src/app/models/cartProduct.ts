export class CartProduct {

  constructor(
    public totalPrice: number,
    public cartId: number,
    public amount?: number,
    public productId?: number,
  ) { }
}
