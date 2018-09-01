import { Request, Response } from "express-serve-static-core";
import {BUNDLE_BASE_PATH, MAIN_VIEW_NAME} from "../config/routes";

export default class HomeController {

  constructor() {
    this.index = this.index.bind(this);
    this.resume = this.resume.bind(this);
    this.projects = this.projects.bind(this);
  }

  public index(req: Request, res: Response) {
    res.render(MAIN_VIEW_NAME, {
      bundlePath: BUNDLE_BASE_PATH + "home.bundle.js"
    })
  }

  public resume(req: Request, res: Response) {
    res.render(MAIN_VIEW_NAME, {
      bundlePath: BUNDLE_BASE_PATH + "resume.bundle.js"
    });
  }

  public projects(req: Request, res: Response) {
    res.render(MAIN_VIEW_NAME, {
      bundlePath: BUNDLE_BASE_PATH + "projects.bundle.js"
    });
  }
}