import { Post } from "src/server/models/Post";

export interface PostDao {
  getPosts(callback: (err?: Error, posts?: any) => void): void;
  findById(id: number, callback: (err?: Error, post?: any) => void): void;
  savePost(post: Post, callback: (err?: Error) => void): void;
  updatePost(post: Post, callback: (err: Error) => void): void;
}