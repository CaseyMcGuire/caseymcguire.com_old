import * as React from "react";
import * as ReactDOM from "react-dom";
import Page from "../../Page/Page";
import Post from "../components/Post/Post";
import PostDTO from "../../../../shared/PostDTO";

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
    // we embed initial data in the DOM
    const data = document.getElementById("params");
    let initialState;
    if (data) {
      initialState = JSON.parse(data.getAttribute("data-initial-data") || '{}');
    }
    else {
      initialState = [];
    }
    return initialState;
  }

  render() {
    return (
      <Page>
        <div>
          {
            this.state.posts.map((post) => {
              return (
                <Post post={post} />
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