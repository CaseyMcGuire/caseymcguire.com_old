

import { Request, Response } from "express-serve-static-core";
import { PostDao } from "../dao/post/PostDao";
import PostsDTO from "../../shared/PostsDTO";
import PostDTO from "../../shared/PostDTO";

export default class PostController {

  constructor(private postDao: PostDao) {
    this.index = this.index.bind(this);
    this.new = this.new.bind(this);
    this.create = this.create.bind(this);
  }

  public index(req: Request, res: Response){
    this.postDao.getPosts((err, posts) => {
      if (err) {
        // TODO: render 500 page
        res.json(err);
      }
      else {
        res.render("posts/index", {
          // TODO: we should not be referencing server models on the client
          posts: JSON.stringify(new PostsDTO(posts as PostDTO[]))
        })
      }
    });
  }

  public new(req: Request, res: Response) {
    res.render("posts/new");
  }

  public create(req: Request, res: Response) {
    res.redirect("/posts");
  }
}