import PostDTO from "./PostDTO";

export default class PostsDTO {
  constructor(public readonly posts: PostDTO[]) {}
}