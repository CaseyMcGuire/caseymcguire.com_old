import PostDTO from "../../shared/PostDTO";

class PostService {
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

export default new PostService();