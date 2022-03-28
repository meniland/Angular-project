import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/product';

@Pipe({
  name: 'productSearch'
})
export class ProductSearchPipe implements PipeTransform {

  transform(allProductsArray: Product[], searchValue: string): Product[] {
    if (!searchValue) {
      return allProductsArray
    }
    let newSearchValue = searchValue.charAt(0).toUpperCase() + searchValue.substring(1);

    let newProductsArray = allProductsArray.filter(product => product.productname == newSearchValue);
    return newProductsArray;
  }
}
