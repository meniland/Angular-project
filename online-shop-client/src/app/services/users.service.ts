import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserLoginDetails } from '../models/userLoginDetails';
import { UserRegisterDetails } from '../models/userRegisterDetails';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  userDetails: UserRegisterDetails =  {} as UserRegisterDetails;

  userLoginDetails = new UserLoginDetails();

  public addUser(): Observable<UserRegisterDetails> {
    return this.http.post<UserRegisterDetails>("http://localhost:8080/users/", this.userDetails);
  }

  public isIdAlreadyExist(): Observable<number> {
    return this.http.post<number>("http://localhost:8080/users/is-id-exist", { id: this.userDetails.id });
  }

  public login(): Observable<UserLoginDetails> {
    return this.http.post<UserLoginDetails>("http://localhost:8080/users/login", this.userLoginDetails);
  }
}
