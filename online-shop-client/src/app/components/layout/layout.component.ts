import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  isUserLoggedIn: boolean;
  isUserLggedInSubscription: Subscription;

  constructor(private router: Router, private stateService: StateService) { }

  ngOnInit(): void {
    this.isUserLggedInSubscription = this.stateService.isUserLoginObservable().subscribe(value => {
      this.isUserLoggedIn = value;
    }, error => {
      alert(error)
    })

    let userId = sessionStorage.getItem("userId");
    if (userId) {
      this.isUserLoggedIn = true;
    }

  }

  onLogoutClick() {
    this.isUserLoggedIn = false;
    this.router.navigate(["/login"]);
    sessionStorage.clear();
  }

  ngOnDestroy() {
    this.isUserLggedInSubscription.unsubscribe();
  }
}
