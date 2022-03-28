import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  categories: Category[] = [];

  productArrayByCategory: Product[];

  allProductsArray: Product[];

  searchValue: string;

  productsToShow = "allProducts";

  opened: boolean = true;

  constructor(private categoriesService: CategoriesService, private productsService: ProductsService) { }

  ngOnInit(): void {

    const observable = this.categoriesService.getCategories();

    observable.subscribe(categories => {
      this.categories = categories;
    }, error => {
      //  this.error = error.error.error;
      alert(error.error.error)
    })

    this.productsService.getAllProducts().subscribe(allProducts => {
      this.allProductsArray = allProducts;

    }, error => {
      alert(error.error.error)
    })
  }

  onClick(categoryId: number) {

    this.productsToShow = "byCategory";
    this.productsService.categoryId = categoryId;

    const observable = this.productsService.getProductsById();

    observable.subscribe(productsArray => {
      this.productArrayByCategory = productsArray;
    })
  }


  onSearchInputChange() {
    this.productsToShow = "allProducts";
  }
}
