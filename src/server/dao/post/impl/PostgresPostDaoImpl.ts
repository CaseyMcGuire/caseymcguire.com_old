import {PostDao} from "../PostDao";
import {Post} from "../../../models/Post";
import {PostTableRow} from "../../../db/tables/PostTableRow";
import DatabaseManager from "../../../db/DatabaseManager";

export default class PostgresPostDaoImpl implements PostDao {

  private static readonly GET_ALL_POSTS = "SELECT * FROM posts";

  constructor(private readonly databaseManager: DatabaseManager) {}

  getPosts(callback: (err?: Error, posts?: Post[]) => void): void {
    this.databaseManager.query(PostgresPostDaoImpl.GET_ALL_POSTS, [], (err, result) => {
      if (err) {
        return callback(err);
      }
      else if (!result) {
        return callback(undefined, []);
      }
      const postRows = result as PostTableRow[];
      const posts = postRows.map(this.convertRowToPost);
      callback(undefined, posts);
    });
  }

  private convertRowToPost(row: PostTableRow): Post {
    return {
      id: row.id,
      title: row.title,
      contents: row.contents
    }
  }

  findById(id: number, callback: (err?: Error, post?: any) => void): void {
  }

  savePost(post: Post, callback: (err?: Error) => void): void {

  }

  updatePost(post: Post, callback: (err: Error) => void): void {

  }

}