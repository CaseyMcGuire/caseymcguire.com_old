import * as bcrypt from "bcryptjs";

export default class User {

  constructor(public readonly email: string,
              public readonly password: string,
              public readonly id?: number,
              public readonly isAdmin?: boolean) {}


  public validPassword(password: string, callback: (err: Error, success: boolean) => void): void {
    bcrypt.compare(password, this.password, (err, success) => {
      return callback(err, success);
    });
  }
}