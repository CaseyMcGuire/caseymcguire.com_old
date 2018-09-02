import PostDTO from "../../shared/PostDTO";

export default class Post {
  constructor(public readonly title: string,
              public readonly contents: string,
              public readonly id?: number) {}


  public toPostDto(): PostDTO {
    return {
      id: this.id!,
      title: this.title || "",
      contents: this.contents || ""
    };
  }

  public static fromPostDto(postDto: PostDTO) {
    return new Post(postDto.title || "", postDto.contents || "", postDto.id);
  }
}