import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators, FormGroupDirective, NgForm, AsyncValidatorFn } from '@angular/forms';
import { RegistrationFirstPart } from 'src/app/models/registrationFirstPart';
import { UsersService } from 'src/app/services/users.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { firstValueFrom, Observable } from 'rxjs';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

// interface AbstractControlOptions {
//   validators?: ValidatorFn | ValidatorFn[] | null;
//   asyncValidators?: AsyncValidatorFn | AsyncValidatorFn[] | null;
//   updateOn?: 'change' | 'blur' | 'submit';
// }

@Component({
  selector: 'app-first-register',
  templateUrl: './first-register.component.html',
  styleUrls: ['./first-register.component.css']
})
export class FirstRegisterComponent implements OnInit {

  registrationFirstPart = new RegistrationFirstPart();

  idAlreadyExsitError: number;

  idAlreadyExsit = false;

  @Output() registerEvent = new EventEmitter();

  registerFormGroup: FormGroup;
  idFormControl: FormControl = new FormControl;
  emailFormControl: FormControl = new FormControl;
  passwordFormControl: FormControl = new FormControl;
  confirmPasswordFormControl: FormControl = new FormControl;

  matcher = new MyErrorStateMatcher();

  constructor(private userService: UsersService) { }


  ngOnInit(): void {

    this.idFormControl = new FormControl("", {
      validators: [Validators.required, this.idValidation()],
      updateOn: 'blur'
    });
    this.emailFormControl = new FormControl("", [Validators.required, Validators.email]);
    this.passwordFormControl = new FormControl("", [Validators.required]);
    this.confirmPasswordFormControl = new FormControl("", [Validators.required, this.confirmPasswordValidation()]);

    this.registerFormGroup = new FormGroup({
      id: this.idFormControl,
      email: this.emailFormControl,
      password: this.passwordFormControl,
      confirmPassword: this.confirmPasswordFormControl
    })
  }

  onClick() {
    this.userService.userDetails.id = this.idFormControl.value;
    this.userService.userDetails.email = this.emailFormControl.value;
    this.userService.userDetails.password = this.passwordFormControl.value;

    this.registerEvent.emit("secound-register-part");
  }


  confirmPasswordValidation(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const currentValue: string = control.value;
      if (currentValue === this.passwordFormControl.value) {
        return null
      }
      return {
        'passwordDontValide': {
          error: "confirm password is faild"
        }
      }
    }
  }

  onIdChange(userEvent: any) {

    this.userService.userDetails.id = userEvent.target.value;

    const observable = this.userService.isIdAlreadyExist();

    observable.subscribe(response => {

      this.idAlreadyExsit = false;
    }, error => {
      this.idAlreadyExsit = true;
    })

  }


  idValidation(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

      if (this.idAlreadyExsit == false) {
        return null
      }
      return {
        'idAlraedyExsist': {
          error: "..."
        }
      }

    }
  }
}
