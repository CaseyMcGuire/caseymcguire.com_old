import { Request, Response } from "express-serve-static-core";

export default class HomeController {

  constructor() {
    this.index = this.index.bind(this);
    this.resume = this.resume.bind(this);
  }

  public index(req: Request, res: Response) {
    res.render("main")
  }

  public resume(req: Request, res: Response) {
    res.render("main");
  }
}