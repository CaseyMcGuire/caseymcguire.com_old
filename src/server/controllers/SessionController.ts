import { Request, Response } from "express-serve-static-core";
import {PassportStatic} from "passport";
import {UserDao} from "../dao/user/UserDao";
import {IVerifyOptions} from "passport-local";
import User from "../models/User";
import {BUNDLE_BASE_PATH, MAIN_VIEW_NAME} from "../config/routes";

export default class SessionController {

  constructor(private readonly passport: PassportStatic,
              private readonly userDao: UserDao) {
    this.new = this.new.bind(this);
    this.create = this.create.bind(this);
    this.destroy = this.destroy.bind(this);
  }

  public new(req: Request, res: Response) {
    res.render(MAIN_VIEW_NAME, {
      bundlePath: BUNDLE_BASE_PATH + "sessions.new.bundle.js"
    })
  }

  public create(req: Request, res: Response) {
    this.passport.authenticate("login", (err: Error, user: User, info: IVerifyOptions) => {
      if (err) {
        return res.send(err);
      }
      if (!user) {
        return res.send("no user");
      }
      req.logIn(user, (err) => {
        if (err) {
          return res.send(err);
        }
        res.redirect("/");
      })
    })(req, res);
  }

  public destroy(req: Request, res: Response) {
    req.logout();
    res.redirect("/");
  }
}