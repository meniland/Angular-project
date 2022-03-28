export class UserLoginDetails {

  public constructor( public usertype?: string, public email?: string, public password?: string, public token = "", public id = 0,) { }

}
