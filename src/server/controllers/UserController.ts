import { Request, Response } from "express-serve-static-core";
import * as passport from "passport";
import {IVerifyOptions} from "passport-local";
import {BUNDLE_BASE_PATH, MAIN_VIEW_NAME} from "../config/routes";


export default class UserController {
  constructor() {
    this.new = this.new.bind(this);
    this.create = this.create.bind(this);
  }

  public new(req: Request, res: Response) {
    res.render(MAIN_VIEW_NAME, {
      bundlePath: BUNDLE_BASE_PATH + "users.new.bundle.js",
      csrfToken: req.csrfToken()
    });
  }

  public create(req: Request, res: Response) {
    passport.authenticate("signup", (err: Error, info: IVerifyOptions) => {
      if (err) {
        return res.redirect("/signup?error=true");
      }
      return res.redirect("/");
    })(req, res);
  }
}