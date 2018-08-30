import * as React from "react";
import Post from "../components/Post/Post";
import Page from "../../Page/Page";
import PostContainer from "../components/PostContainer/PostContainer";
import * as ReactDOM from "react-dom";

interface State {
  title: string,
  contents: string
}

export default class PostPage extends React.Component<{}, State> {

  constructor(props: object) {
    super(props);
    this.getComponent = this.getComponent.bind(this);
  }

  private getPostId() {
    const url = window.location.pathname.split("/");
    return parseInt(url[url.length - 1]);
  }

  private getComponent(title: string, contents: string) {
    return (
      <Post title={title} contents={contents}/>
    )
  }

  render() {
    return (
      <Page>
        <PostContainer getComponent={this.getComponent} id={this.getPostId()}/>
      </Page>
    )
  }
}

window.onload = () => {
  ReactDOM.render(
    <PostPage />,
    document.getElementById("main")
  );
};