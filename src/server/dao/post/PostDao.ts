import Post from "../../models/Post";

export interface PostDao {
  getPosts(numPosts: number, numPostOffset: number): Promise<Post[]>;
  findById(id: number): Promise<Post>;
  savePost(userId: number, post: Post): Promise<number>;
  updatePost(post: Post): Promise<void>;
}