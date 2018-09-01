import { Request, Response } from "express-serve-static-core";
import { PostDao } from "../dao/post/PostDao";
import PostsDTO from "../../shared/PostsDTO";
import PostDTO from "../../shared/PostDTO";
import Post from "../models/Post";
import {BUNDLE_BASE_PATH, MAIN_VIEW_NAME} from "../config/routes";

export default class PostController {

  constructor(private postDao: PostDao) {
    this.index = this.index.bind(this);
    this.new = this.new.bind(this);
    this.create = this.create.bind(this);
    this.edit = this.edit.bind(this);
    this.update = this.update.bind(this);
    this.show = this.show.bind(this);
  }

  public index(req: Request, res: Response){
    this.postDao.getPosts((err, posts) => {
      if (err) {
        // TODO: render 500 page
        return res.json(err);
      }
      else {
        res.render("posts/index", {
          // TODO: we should not be referencing server models on the client
          posts: JSON.stringify(new PostsDTO(posts as PostDTO[]))
        })
      }
    });
  }

  public show(req: Request, res: Response) {
    this.postDao.findById(req.params.id, (err, post) => {
      // TODO: display 500 page
      if (err) {
        return res.redirect("/");
      }
      // TODO: display 404 page
      if (!post) {
        return res.redirect("/notfound=true");
      }
      const contentType = req.get("content-type") || "";
      if (contentType.indexOf("json") !== -1) {
        res.json(JSON.stringify(post));
      }
      else {
        res.render(MAIN_VIEW_NAME, {
          bundlePath: BUNDLE_BASE_PATH + "posts.show.bundle.js"
        });
      }
    })
  }

  public new(req: Request, res: Response) {
    res.render(MAIN_VIEW_NAME, {
      bundlePath: BUNDLE_BASE_PATH + "posts.new.bundle.js"
    });
  }

  public create(req: Request, res: Response) {
    const postDTO = req.body as PostDTO;
    const post: Post = {
      ...postDTO
    };
    const user = req.user;
    this.postDao.savePost(user.id, post, (err) => {
      if (err) {
        // TODO: 500 internal server error
        res.redirect("/posts/error=true");
      }
      else {
        res.redirect("/posts");
      }
    })

  }

  public edit(req: Request, res: Response) {
    res.render(MAIN_VIEW_NAME, {
      bundlePath: BUNDLE_BASE_PATH + "posts.edit.bundle.js"
    });
  }

  public update(req: Request, res: Response) {

  }
}