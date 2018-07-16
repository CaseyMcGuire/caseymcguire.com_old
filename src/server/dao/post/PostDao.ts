import {Post} from "../../models/Post";

export interface PostDao {
  getPosts(): Array<Post>;
  findById(id: number): Post;
  savePost(post: Post): boolean;
  updatePost(post: Post): boolean;
}