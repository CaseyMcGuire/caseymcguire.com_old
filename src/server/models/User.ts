import * as bcrypt from "bcryptjs";

export default class User {

  constructor(private readonly email: string,
              private readonly password: string) {}


  public validPassword(password: string, callback: (err: Error, success: boolean) => void): void {
    bcrypt.compare(password, this.password, (err, success) => {
      return callback(err, success);
    });
  }
}