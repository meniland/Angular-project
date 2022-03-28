import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';
import { AddProductDialogComponent } from '../add-product-dialog/add-product-dialog.component';
import { EditProductDialogComponent } from '../edit-product-dialog/edit-product-dialog.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  allProductsArray: Product[];

  searchValue: string;

  constructor(private productsService: ProductsService, public dialog: MatDialog) { }

  ngOnInit(): void {

    this.productsService.getAllProducts().subscribe(allProducts => {
      this.allProductsArray = allProducts;

    }, error => {
      alert(error.error.error)
    })
  }

  onEditClick(product: Product) {
    const dialogRef = this.dialog.open(EditProductDialogComponent, {
      data: {
        product,
      },
      width: '400px',
    });
  }

  onAddProductClick() {
    const dialogRef = this.dialog.open(AddProductDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.productsService.getAllProducts().subscribe(allProducts => {
        this.allProductsArray = allProducts;

      }, error => {
        alert(error.error.error)
      })
    });
  }
}
