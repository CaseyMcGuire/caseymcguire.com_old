import {Application, Request, Response, NextFunction} from "express-serve-static-core";
import PostController from "../controllers/PostController";
import HomeController from "../controllers/HomeController";
import PostgresPostDaoImpl from "../dao/post/impl/PostgresPostDaoImpl";
import UserController from "../controllers/UserController";
import SessionController from "../controllers/SessionController";
import PostgresUserDaoImpl from "../dao/user/impl/PostgresUserDaoImpl";
import DaoFactory, {DaoType} from "../dao/DaoFactory";
import {PassportStatic} from "passport";
import GamesController from "../controllers/GamesController";

export const BUNDLE_BASE_PATH = "/public/";
export const MAIN_VIEW_NAME = "main";

export default function configureRoutes(app: Application, passport: PassportStatic) {
  const postDao = DaoFactory.get<PostgresPostDaoImpl>(DaoType.POST);
  const userDao = DaoFactory.get<PostgresUserDaoImpl>(DaoType.USER);

  const homeController = new HomeController();
  const postController = new PostController(postDao);
  const userController = new UserController();
  const gamesController = new GamesController();
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
  app.get("/403", homeController.forbidden);
  app.get("/404", homeController.notFound);
  app.get("/500", homeController.internalServerError);

  app.get("/posts", postController.index);
  app.get("/posts/page/:id", postController.index);
  app.get("/posts/new", isAdmin, postController.new);
  app.post("/posts/create", isAdmin, postController.create);
  app.get("/posts/:id/edit", isAdmin, postController.edit);
  app.post("/posts/update", isAdmin, postController.update);
  app.get("/posts/:id", postController.show);

  app.get('/tetris', gamesController.tetris);


  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    // express adds this if the CSRF token was tampered with.
    if (err.code !== "EBADCSRFTOKEN") {
      return next(err);
    }
    return res.status(403).redirect("/403")
  });

  // this *must* occur below all other routes
  // https://expressjs.com/en/starter/faq.html
  app.use((req, res, next) => {
    res.status(404).redirect("/404");
  })
}

function isAdmin(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated() && req.user && req.user.isAdmin) {
    next();
  }
  else {
    res.status(403).redirect("/403");
  }
}

function isLoggedIn(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) {
    next();
  }
  else {
    res.status(403).redirect("/403");
  }
}

function ensureSecure(req: Request, res: Response, next: NextFunction) {
  // we have to check the 'x-forwarded-proto' header since heroku forwards the request
  // from the load balancer over http.
  // https://stackoverflow.com/a/32952582
  if(req.hostname === "localhost" || req.headers['x-forwarded-proto'] === "https"){
    return next();
  }
  res.redirect('https://' + req.hostname + req.url);
}
