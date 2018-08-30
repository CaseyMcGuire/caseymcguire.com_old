import PostDTO from "../../shared/PostDTO";

export default class PostService {
  getPost(id: number): Promise<PostDTO> {
    return fetch("/posts/" + id, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((resp) => resp.json())
    .then((data) => JSON.parse(data));
  }
}