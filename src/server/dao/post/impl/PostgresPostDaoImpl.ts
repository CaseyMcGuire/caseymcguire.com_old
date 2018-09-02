import {PostDao} from "../PostDao";
import Post from "../../../models/Post";
import {PostTableRow} from "../../../db/tables/PostTableRow";
import DatabaseManager from "../../../db/DatabaseManager";

export default class PostgresPostDaoImpl implements PostDao {

  private static readonly GET_ALL_POSTS = "SELECT * FROM posts ORDER BY id ASC";
  private static readonly CREATE_NEW_POST = "INSERT INTO posts (user_id, title, contents) VALUES ($1, $2, $3)";
  private static readonly GET_POST_BY_ID = "SELECT * FROM posts where id = $1 LIMIT 1";
  private static readonly UPDATE_POST = "UPDATE posts SET title = $1, contents = $2 WHERE id = $3;"

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
    return new Post(row.title, row.contents, row.id);
  }

  findById(id: number, callback: (err: Error | undefined, post?: Post) => void): void {
    this.databaseManager.query(PostgresPostDaoImpl.GET_POST_BY_ID, [id], (err, result) => {
      if (err || !result || result.length === 0) {
        return callback(err);
      }
      const postRow = result[0] as PostTableRow;
      const post = this.convertRowToPost(postRow);
      return callback(undefined, post);
    })
  }

  savePost(userId: number, post: Post, callback: (err?: Error) => void): void {
    this.databaseManager.query(PostgresPostDaoImpl.CREATE_NEW_POST, [userId, post.title, post.contents], (err, result) => {
      return callback(err);
    })
  }

  updatePost(post: Post, callback: (err: Error | undefined) => void): void {
    this.databaseManager.query(PostgresPostDaoImpl.UPDATE_POST, [post.title, post.contents, post.id], (err, result) => {
      callback(err);
    });
  }

}