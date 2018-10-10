import * as React from "react";
import * as ReactDOM from "react-dom";
import Page from "../../Page/Page";
import Post from "../components/Post/Post";
import PostDTO from "../../../../shared/PostDTO";
import DataService from "../../../services/DataService";

interface State {
  posts: PostDTO[]
}

export default class PostsIndexPage extends React.Component<object, State> {

  constructor(props: object) {
    super(props);
    const initialState = this.getInitialData();
    this.state = {
      ...initialState
    };
  }

  private getInitialData(): State {
    return DataService.getInitialData() as State;
  }

  render() {
    return (
      <Page>
        <div>
          {
            this.state.posts.map((post) => {
              return (
                <Post key={post.id} id={post.id} title={post.title} contents={post.contents || ''} />
              )
            })
          }
        </div>
      </Page>
    )
  }
}

window.onload = () => {
  ReactDOM.render(
    <PostsIndexPage />,
    document.getElementById("main")
  );
};