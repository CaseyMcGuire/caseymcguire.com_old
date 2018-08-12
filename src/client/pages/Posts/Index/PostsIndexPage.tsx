import * as React from "react";
import * as ReactDOM from "react-dom";
import Page from "../../Page/Page";
import {Post} from "../../../../server/models/Post";

interface State {
  posts: Post[]
}

export default class PostsIndexPage extends React.Component<object, State> {

  constructor(props: object) {
    super(props);
    const data = document.getElementById("params");
    let initialState;
    console.log(data);
    if (data) {
      initialState = JSON.parse(data.getAttribute("data-initial-data") || '{}');
    }
    else {
      initialState = [];
    }
    console.log(initialState);
    this.state = {
      ...initialState
    };
    console.log(this.state);
  }

  render() {
    console.log(this.state);
    return (
      <Page>
        <div>
          {
            this.state.posts.map((elem) => {
              return (
                <div>
                  <div>{elem.title}</div>
                  <div>{elem.contents}</div>
                </div>
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