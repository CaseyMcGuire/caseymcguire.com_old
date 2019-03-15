import {PostDao} from "../PostDao";
import Post from "../../../models/Post";
import {PostTableRow} from "../../../db/tables/PostTableRow";
import DatabaseManager from "../../../db/DatabaseManager";

export default class PostgresPostDaoImpl implements PostDao {

  private static readonly GET_POSTS = "SELECT * FROM posts ORDER BY id DESC LIMIT $1 OFFSET $2";
  private static readonly CREATE_NEW_POST = "INSERT INTO posts (user_id, title, contents) VALUES ($1, $2, $3) RETURNING id";
  private static readonly GET_POST_BY_ID = "SELECT * FROM posts where id = $1 LIMIT 1";
  private static readonly UPDATE_POST = "UPDATE posts SET title = $1, contents = $2 WHERE id = $3;"

  constructor(private readonly databaseManager: DatabaseManager) {}

  async getPosts(numPosts: number, numPostOffset: number): Promise<Post[]> {
    try {
      return await this.databaseManager.query(PostgresPostDaoImpl.GET_POSTS, [numPosts, numPostOffset]);
    }
    catch(e) {
      throw e;
    }
  }

  async findById(id: number): Promise<Post> {
    try {
      const result = await this.databaseManager.query(PostgresPostDaoImpl.GET_POST_BY_ID, [id]);
      return result[0];
    } catch(e) {
      throw e;
    }
  }

  async savePost(userId: number, post: Post): Promise<number> {
    try {
      const result = await this.databaseManager.query(PostgresPostDaoImpl.CREATE_NEW_POST, [userId, post.title, post.contents]);
      return Promise.resolve(result[0].id);
    } catch(e) {
      throw e;
    }
  }

  async updatePost(post: Post): Promise<void> {
    try {
      await this.databaseManager.query(PostgresPostDaoImpl.UPDATE_POST, [post.title, post.contents, post.id]);
    } catch(e) {
      throw e;
    }
  }

}