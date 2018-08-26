import { Request, Response } from "express-serve-static-core";
import * as passport from "passport";
import {IVerifyOptions} from "passport-local";
import User from "../models/User";


export default class UserController {
  constructor() {
    this.new = this.new.bind(this);
    this.create = this.create.bind(this);
  }

  public new(req: Request, res: Response) {
    res.render("users/new");
  }

  public create(req: Request, res: Response) {
    passport.authenticate("signup", (err: Error, info: IVerifyOptions) => {
      if (err) {
        res.redirect("/signup?error=true");
      }
      return res.redirect("/");
    })(req, res);
  }
}