import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-add-product-dialog',
  templateUrl: './add-product-dialog.component.html',
  styleUrls: ['./add-product-dialog.component.css']
})
export class AddProductDialogComponent implements OnInit {

  file: string;
  fileName: string;
  product: Product = {} as Product;

  constructor(private productsService: ProductsService) { }

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

        this.product.image = imagePath;

      }, error => {
        alert(error);
      })
      this.product.image = await firstValueFrom(observable);

    }

    this.productsService.product = this.product;

    this.productsService.addProduct().subscribe(() => {


    }, error => {
      alert(error)
    })
  }
}
