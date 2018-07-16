

import { Request, Response } from "express-serve-static-core";
import {PostDao} from "../dao/post/PostDao";

export class PostController {

  constructor(private postDao: PostDao) {}

  public index(req: Request, res: Response){
    //TODO: implement me
  }
}