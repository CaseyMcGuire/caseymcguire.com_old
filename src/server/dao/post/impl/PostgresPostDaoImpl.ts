import {PostDao} from "../PostDao";
import {Post} from "src/server/models/Post";
import PostgresDatabaseManager from "../../../db/PostgresDatabaseManager";

export default class PostgresPostDaoImpl implements PostDao {

  constructor(private databaseManager: PostgresDatabaseManager) {}

  getPosts(): Array<Post> {
    return [];
  }

  findById(id: number): Post {
    return {
      id: 0,
      title: "foo",
      content: "bar"
    };
  }

  savePost(post: Post): boolean {
    return false;
  }

  updatePost(post: Post): boolean {
    return false;
  }

}