import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-edit-product-dialog',
  templateUrl: './edit-product-dialog.component.html',
  styleUrls: ['./edit-product-dialog.component.css']
})
export class EditProductDialogComponent implements OnInit {

  file: string;
  fileName: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private productsService: ProductsService) { }

  ngOnInit(): void {

  }

  saveFile(event: any) {
    this.file = event.target.files[0];
    this.fileName = event.target.files[0].name;
  };

  async onButtonClick() {

    if (this.file) {
      let formData = new FormData();
      formData.append("file", this.file);
      formData.append("fileName", this.fileName);
      this.productsService.formData = formData;


      const observable = this.productsService.sendImageFileToServer();

      this.productsService.sendImageFileToServer().subscribe(response => {

        let imagePath = response;

        this.data.product.image = imagePath;

      }, error => {
        alert(error);
      })
      this.data.product.image = await firstValueFrom(observable);

    }

    this.productsService.product = this.data.product;

    this.productsService.updateProduct().subscribe(() => {

    }, error => {
      alert(error)
    })
  }
}
