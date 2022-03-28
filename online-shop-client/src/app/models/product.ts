export class Product {

  constructor(
    public id: number,
    public price: number,
    public productname?: string,
    public categoryId?: number,
    public image?: string
  ) { }
}
