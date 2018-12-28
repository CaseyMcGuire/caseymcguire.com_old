import Post from "../../models/Post";

export interface PostDao {
  getPosts(numPosts: number, numPostOffset: number, callback: (err?: Error, posts?: Post[]) => void): void;
  findById(id: number, callback: (err: Error | undefined, post?: any) => void): void;
  savePost(userId: number, post: Post, callback: (err: Error | undefined) => void): void;
  updatePost(post: Post, callback: (err: Error | undefined) => void): void;
}