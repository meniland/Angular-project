export class UserRegisterDetails {

  constructor(
    public city: string,
    public street: string,
    public id?: number,
    public email?: string,
    public password?: string,
    public name?: string,
    public lastname?: string,
  ) { }

}
