

import { Request, Response } from "express-serve-static-core";
import { PostDao } from "../dao/post/PostDao";
import PostDTO from "../../shared/PostDTO";
import {Post} from "../models/Post";

export default class PostController {

  constructor(private postDao: PostDao) {
    this.index = this.index.bind(this);
    this.new = this.new.bind(this);
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
          posts: JSON.stringify(new PostDTO(posts as Post[]))
        })
      }
    });
  }

  public new(req: Request, res: Response) {
    res.render("posts/new");
  }
}