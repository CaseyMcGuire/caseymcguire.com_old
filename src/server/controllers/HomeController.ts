import { Request, Response } from "express-serve-static-core";

export default class HomeController {
  public index(req: Request, res: Response) {
    res.render("main")
  }
}