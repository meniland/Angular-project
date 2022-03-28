export class Order {

  public constructor(
    public userId: number,
    public cartId: number,
    public totalPrice: number,
    public city: string,
    public street: string,
    public orderDate: string,
    public shippingDate: string,
    public creditNumber: number
  ) { }

}
