import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { observable } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';
import { ToastrService } from 'ngx-toastr';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-secound-register',
  templateUrl: './secound-register.component.html',
  styleUrls: ['./secound-register.component.css']
})
export class SecoundRegisterComponent implements OnInit {

  citiesArray = ["Jerusalem", "Tel-Aviv", "Haifa", "Ramat-Gan"];

  matcher = new MyErrorStateMatcher();

  error = "";

  success = "";

  registerFormGroup: FormGroup;
  nameFormControl: FormControl = new FormControl;
  lastnameFormControl: FormControl = new FormControl;
  cityFormControl: FormControl = new FormControl;
  streetFormControl: FormControl = new FormControl;

  constructor(private userService: UsersService, private toastr: ToastrService) { }

  ngOnInit(): void {

    this.nameFormControl = new FormControl("", Validators.required);
    this.lastnameFormControl = new FormControl("", Validators.required);
    this.cityFormControl = new FormControl("", Validators.required);
    this.streetFormControl = new FormControl("", Validators.required);

    this.registerFormGroup = new FormGroup({
      id: this.nameFormControl,
      email: this.lastnameFormControl,
      password: this.cityFormControl,
      confirmPassword: this.streetFormControl
    })
  }


  onClick() {
    this.error = "";
    this.userService.userDetails.name = this.nameFormControl.value;
    this.userService.userDetails.lastname = this.lastnameFormControl.value;
    this.userService.userDetails.city = this.cityFormControl.value;
    this.userService.userDetails.street = this.streetFormControl.value;

    const observable = this.userService.addUser();

    observable.subscribe(() => {
      this.success = "Registration succeeded! please log in..";
    }, error => {
      this.error = error.error.error;
    })
  }
}


