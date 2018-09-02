import {Application, Request, Response, NextFunction} from "express-serve-static-core";
import PostController from "../controllers/PostController";
import HomeController from "../controllers/HomeController";
import PostgresPostDaoImpl from "../dao/post/impl/PostgresPostDaoImpl";
import UserController from "../controllers/UserController";
import SessionController from "../controllers/SessionController";
import PostgresUserDaoImpl from "../dao/user/impl/PostgresUserDaoImpl";
import DaoFactory, {DaoType} from "../dao/DaoFactory";
import {PassportStatic} from "passport";

export const BUNDLE_BASE_PATH = "/public/";
export const MAIN_VIEW_NAME = "main";

export default function configureRoutes(app: Application, passport: PassportStatic) {
  const postDao = DaoFactory.get<PostgresPostDaoImpl>(DaoType.POST);
  const userDao = DaoFactory.get<PostgresUserDaoImpl>(DaoType.USER);

  const homeController = new HomeController();
  const postController = new PostController(postDao);
  const userController = new UserController();
  const sessionController = new SessionController(passport, userDao);

  app.use(ensureSecure);

  app.get("/login", sessionController.new);
  app.post("/sessions/create", sessionController.create);
  app.post("/sessions/destroy", isLoggedIn, sessionController.destroy);

  app.get("/signup", userController.new);
  app.post("/users/create", userController.create);

  app.get("/", homeController.index);
  app.get("/resume", homeController.resume);
  app.get("/projects", homeController.projects);

  app.get("/posts", postController.index);
  app.get("/posts/new", isAdmin, postController.new);
  app.post("/posts/create", isAdmin, postController.create);
  app.get("/posts/:id/edit", isAdmin, postController.edit);
  app.get("/posts/:id", postController.show);
}

function isAdmin(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated() && req.user && req.user.isAdmin) {
    next();
  }
  else {
    res.redirect("/");
  }
}

function isLoggedIn(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) {
    next();
  }
  else {
    res.redirect("/");
  }
}

function ensureSecure(req: Request, res: Response, next: NextFunction) {
  if(req.hostname === "localhost" || req.protocol === "https"){
    return next();
  }
  res.redirect('https://' + req.hostname + req.url);
}
