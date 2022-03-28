import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import {ErrorStateMatcher} from '@angular/material/core';
import { StateService } from 'src/app/services/state.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  matcher = new MyErrorStateMatcher();

  constructor(private userService: UsersService, private stateService: StateService) { }

  loginFormGroup: FormGroup;
  emailFormControl: FormControl = new FormControl;
  passwordFormControl: FormControl = new FormControl;

  error = "";

  @Output() loginEvent = new EventEmitter();

  ngOnInit(): void {
    this.emailFormControl = new FormControl("", [Validators.required, Validators.email]);
    this.passwordFormControl = new FormControl("", Validators.required);

    this.loginFormGroup = new FormGroup({
      email: this.emailFormControl,
      password: this.passwordFormControl
    })
  }

  onClick() {
    this.error = "";
    this.userService.userLoginDetails.email = this.emailFormControl.value;
    this.userService.userLoginDetails.password = this.passwordFormControl.value;

    const observable = this.userService.login();

    observable.subscribe(response => {
      sessionStorage.setItem("token", response.token);
      sessionStorage.setItem("userId", JSON.stringify(response.id));
      this.loginEvent.emit(response.usertype);

      this.stateService.setIsUserLoggedInSubject(true);

    }, error => {
      this.error = error.error.error;
    })
  }
}
