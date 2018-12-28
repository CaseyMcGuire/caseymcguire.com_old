import * as React from "react";
import Post from "../components/Post/Post";
import Page from "../../Page/Page";
import PostContainer from "../components/PostContainer/PostContainer";
import * as ReactDOM from "react-dom";
import DataService from "../../../services/DataService";
import PostPage from "../components/PostPage/PostPage";

interface State {
  title: string,
  contents: string
}

export default class SinglePostPage extends React.Component<{}, State> {

  constructor(props: object) {
    super(props);
    this.getComponent = this.getComponent.bind(this);
    const initialData = this.getInitialData();
    this.state = {
      ...initialData
    }
  }

  private getInitialData(): State {
    return DataService.getInitialData() as State;
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
      <PostPage>
        <PostContainer getComponent={this.getComponent} id={this.getPostId()}/>
      </PostPage>
    )
  }
}

window.onload = () => {
  ReactDOM.render(
    <SinglePostPage />,
    document.getElementById("main")
  );
};