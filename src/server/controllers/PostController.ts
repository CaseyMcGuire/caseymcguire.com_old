

import { Request, Response } from "express-serve-static-core";
import { PostDao } from "src/server/dao/post/PostDao";

export class PostController {

  constructor(private postDao: PostDao) {
    this.index = this.index.bind(this);
  }

  public index(req: Request, res: Response){
    this.postDao.getPosts((err, posts) => {
      if (err) {
        res.json(err);
      }
      else {
        res.json(posts);
      }
    });
  }
}