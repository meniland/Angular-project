import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  componentToShow = "login";

  isShowShoppingButton = false;

  htmlString: string;

  username: string;

  changeToSecoundRegisterComponent(eventValue: string) {
    this.componentToShow = eventValue;
  }

  constructor(private router: Router, private cartService: CartService) { }

  ngOnInit(): void {
  }

  changeToRegisterComponents() {
    this.componentToShow = "first-register-part";
  }
  changeToLoginComponents() {
    this.componentToShow = "login";
  }

  onLoginClick(usertype: string) {
    if (usertype == "customer") {
      this.isShowShoppingButton = true;

      this.cartService.userId = Number(sessionStorage.getItem("userId"));

      this.cartService.getCartIdByUserId().subscribe(response => {

        let token = sessionStorage.getItem("token");
        if (token) {

          let decoded: any = jwt_decode(token);
          this.username = decoded.username!;
        }

        if (response === 0) {
          this.htmlString = `Hey ${this.username}!`;
        } else {
          if (typeof response == 'string') {
            this.htmlString = `hey ${this.username}, Your last order was in ${response}`;
          } else {
            this.htmlString = `Hey ${this.username}, you did not complete the previous purchase...`;
            sessionStorage.setItem("cartId", response[0].cartId);
          }
        }

      }, error => {
        alert(error);
      })

    }
    if (usertype == "admin") {
      this.router.navigate(["/admin"]);
    }

  }
}
