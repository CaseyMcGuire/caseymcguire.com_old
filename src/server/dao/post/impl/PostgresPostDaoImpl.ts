import {PostDao} from "../PostDao";
import {Post} from "src/server/models/Post";
import PostgresDatabaseManager from "../../../db/PostgresDatabaseManager";

export default class PostgresPostDaoImpl implements PostDao {

  private static readonly GET_ALL_POSTS = "SELECT * FROM posts";

  constructor(private databaseManager: PostgresDatabaseManager) {}

  getPosts(callback: (err?: Error, posts?: any) => void): void {
    this.databaseManager.query(PostgresPostDaoImpl.GET_ALL_POSTS, [], (err, result) => {
      if (err) {
        callback(err);
      }
      else {
        callback(undefined, result);
      }
    });
  }

  findById(id: number, callback: (err?: Error, post?: any) => void): void {
  }

  savePost(post: Post, callback: (err?: Error) => void): void {

  }

  updatePost(post: Post, callback: (err: Error) => void): void {

  }

}