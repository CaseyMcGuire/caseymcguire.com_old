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
        console.error(err);
        return res.redirect("/500");
      }
      else {
        res.render(MAIN_VIEW_NAME, {
          bundlePath: BUNDLE_BASE_PATH + "posts.index.bundle.js",
          data: JSON.stringify(new PostsDTO(posts as PostDTO[]))
        })
      }
    });
  }

  public show(req: Request, res: Response) {
    this.postDao.findById(req.params.id, (err, post) => {
      if (err) {
        console.error(err);
        return res.redirect("/500");
      }
      if (!post) {
        return res.redirect("/404");
      }

      res.render(MAIN_VIEW_NAME, {
        bundlePath: BUNDLE_BASE_PATH + "posts.show.bundle.js",
        data: JSON.stringify(post)
      });
    })
  }

  public new(req: Request, res: Response) {
    res.render(MAIN_VIEW_NAME, {
      bundlePath: BUNDLE_BASE_PATH + "posts.new.bundle.js"
    });
  }

  public create(req: Request, res: Response) {
    const postDTO = req.body as PostDTO;
    const post: Post = Post.fromPostDto(postDTO);
    const user = req.user;
    this.postDao.savePost(user.id, post, (err) => {
      if (err) {
        console.error(err);
        res.redirect("/500");
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
    const postDTO = req.body as PostDTO;
    const post: Post = Post.fromPostDto(postDTO);
    if (!post.id) {
      return res.redirect("/");
    }

    this.postDao.updatePost(post, (err) => {
      if (err) {
        console.error(err);
        return res.redirect("/500");
      }
      return res.redirect("/posts/" + post.id);
    })
  }
}