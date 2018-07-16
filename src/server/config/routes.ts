import {Application} from "express-serve-static-core";
import {PostController} from "../controllers/PostController";
import HomeController from "../controllers/HomeController";
import PostgresDatabaseManager from "../db/PostgresDatabaseManager";
import PostgresPostDaoImpl from "../dao/post/impl/PostgresPostDaoImpl";

export default function configureRoutes(app: Application) {
  const postgresDatabaseManager = new PostgresDatabaseManager();
  const postDao = new PostgresPostDaoImpl(postgresDatabaseManager);

  const homeController = new HomeController();
  const postController = new PostController(postDao);

  app.get("/", homeController.index);

}