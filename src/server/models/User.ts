export default class User {

  constructor(private readonly email: string,
              private readonly password: string) {}


  public validPassword(password: string): boolean {
    return this.password === password;
  }
}