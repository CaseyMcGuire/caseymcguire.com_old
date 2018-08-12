import { Request, Response } from "express-serve-static-core";

export default class HomeController {

  constructor() {
    this.index = this.index.bind(this);
    this.resume = this.resume.bind(this);
    this.projects = this.projects.bind(this);
  }

  public index(req: Request, res: Response) {
    res.render("home")
  }

  public resume(req: Request, res: Response) {
    res.render("resume");
  }

  public projects(req: Request, res: Response) {
    res.render("projects/projects");
  }
}