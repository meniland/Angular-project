export class CartProductUi {

  constructor(
    public price: number,
    public id: number,
    // public totalPrice?:number,
    public amount?: number,
    public productname?: string,
    public cartId?: number,
    public categoryId?: number,
    public image?: string
  ) { }
}
