import {Post} from "../server/models/Post";

export default class PostsDTO {
  constructor(public readonly posts: Post[]) {}
}