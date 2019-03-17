import PostController from "../src/server/controllers/PostController";
import {describe, beforeEach} from "mocha";
import {Mock, IMock, It, Times} from "typemoq";
import { Request, Response } from "express-serve-static-core";
import {PostDao} from "../src/server/dao/post/PostDao";
import Post from "../src/server/models/Post";
import {BUNDLE_BASE_PATH, MAIN_VIEW_NAME} from "../src/server/config/routes";


describe('PostController tests', () => {
  let mockPostDao: IMock<PostDao>;
  let postController: PostController;
  let request: IMock<Request>;
  let response: IMock<Response>;

  beforeEach(() => {
    mockPostDao = Mock.ofType<PostDao>();
    postController = new PostController(mockPostDao.object);
    request = Mock.ofType<Request>();
    response = Mock.ofType<Response>();
  });

  describe("when you request a post's page", () => {
    it('should render the page if the post exists', async () => {
      const post = new Post('My test post title', 'My test post body');
      mockPostDao.setup(dao => dao.findById(It.isAny())).returns(() => Promise.resolve(post));

      await postController.show(request.object, response.object);

      response.verify(res => res.render(MAIN_VIEW_NAME, {
        bundlePath: BUNDLE_BASE_PATH + "posts.show.bundle.js",
        data: JSON.stringify(post)
      }), Times.once());
    });

    it('should redirect to 404 page if the post is not found', async () => {
      mockPostDao.setup(dao => dao.findById(It.isAny())).returns(() => Promise.resolve(null));
      await postController.show(request.object, response.object);

      response.verify(res => res.redirect("/404"), Times.once());
    });

    it( 'should redirect to 500 page if a rejected promise is returned', async () => {
      mockPostDao.setup(dao => dao.findById(It.isAny())).returns(() => Promise.reject('fail'));
      await postController.show(request.object, response.object);

      response.verify(res => res.redirect("/500"), Times.once());
    })

  })

});