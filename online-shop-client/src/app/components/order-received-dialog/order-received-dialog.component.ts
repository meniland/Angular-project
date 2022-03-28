import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ShippingComponent } from '../shipping/shipping.component';
import { jsPDF } from "jspdf";
import * as html2pdf from "html2pdf.js";
import jwt_decode from 'jwt-decode';
import html2canvas from 'html2canvas';
import { CartProductUi } from 'src/app/models/cartProductUi';
import { CartProductsService } from 'src/app/services/cart-products.service';
import { UserRegisterDetails } from 'src/app/models/userRegisterDetails';

@Component({
  selector: 'app-order-received-dialog',
  templateUrl: './order-received-dialog.component.html',
  styleUrls: ['./order-received-dialog.component.css']
})
export class OrderReceivedDialogComponent implements OnInit {

  @ViewChild("pdfContent", { static: false })
  pdfContent: ElementRef;

  productArray: CartProductUi[] = [];
  totalPrice = 0;
  username: string;
  userId: number;

  constructor(private cartProductsService: CartProductsService) { }

  ngOnInit(): void {

    let token = sessionStorage.getItem("token");
    if (token) {

      let decoded: any = jwt_decode(token);
       this.username = decoded.username!;
       this.userId = decoded.userId;
    }

    let cartId = sessionStorage.getItem("cartId");
    if (cartId) {
      cartId = JSON.parse(cartId);
      if (typeof cartId == 'number') {
        this.cartProductsService.cartId = cartId;
        this.cartProductsService.getCartProductsByCartId().subscribe(cartProducts => {
          this.productArray = cartProducts;
          cartProducts.forEach(product => this.totalPrice += product.price);

        }, error => {
          alert(error.error.error);
        })
      }
    }

  }

  onConfirmClick() {
    sessionStorage.removeItem("cartId");
  }

  makePDF() {

    html2canvas(document.getElementById('pdfContent')!, {
      // Opciones
      allowTaint: true,
      useCORS: false,
      // Calidad del PDF
      onclone: (clonedDoc) => {
        clonedDoc.getElementById('pdfContent')!.style.display = "block";
      },
      scale: 1
    }).then(function (canvas) {
      var img = canvas.toDataURL("image/png");
      var imgWidth = (canvas.width * 70) / 240;
      var imgHeight = (canvas.height * 70) / 240;
      var doc = new jsPDF();
      doc.addImage(img, 'PNG', 60, 20, imgWidth, imgHeight);
      doc.save('receipt.pdf');
    });
  }
}

