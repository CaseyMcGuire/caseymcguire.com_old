import { Request, Response } from "express-serve-static-core";
import { PostDao } from "../dao/post/PostDao";
import PostsDTO from "../../shared/PostsDTO";
import PostDTO from "../../shared/PostDTO";
import Post from "../models/Post";
import {BUNDLE_BASE_PATH, MAIN_VIEW_NAME} from "../config/routes";
import NumberUtil from "../../shared/NumberUtil";

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
    let pageNumber = NumberUtil.parseIntOrNum(req.params.id, 1);
    if (pageNumber <= 0) {
      pageNumber = 1;
    }

    // we only show 10 posts at a time
    const numPostOffset = 10 * (pageNumber - 1);

    // The UI is 1-based so we need to account for that here
    this.postDao.getPosts(11, numPostOffset, (err, posts) => {
      if (err) {
        console.error(err);
        return res.redirect("/500");
      }

      if (!posts || posts.length === 0) {
        return res.redirect("/404");
      }

      // we grab 11 posts and use the presence of an 11th post to determine whether we should
      // light up the "next page" button in the UI
      let hasNextPage = false;
      if (posts && posts.length === 11) {
        hasNextPage = true;
        posts = posts.slice(0, 11);
      }

      res.render(MAIN_VIEW_NAME, {
        bundlePath: BUNDLE_BASE_PATH + "posts.index.bundle.js",
        data: JSON.stringify({
          posts,
          hasNextPage,
          pageNumber
        }),
      })
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
      bundlePath: BUNDLE_BASE_PATH + "posts.new.bundle.js",
      csrfToken: req.csrfToken()
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
      bundlePath: BUNDLE_BASE_PATH + "posts.edit.bundle.js",
      csrfToken: req.csrfToken()
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