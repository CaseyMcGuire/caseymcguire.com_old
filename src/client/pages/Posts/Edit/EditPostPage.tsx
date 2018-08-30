import * as React from "react";
import CreateEditPostContainer from "../../../components/CreateEditPostContainer/CreateEditPostContainer";
import Page from "../../Page/Page";
import * as ReactDOM from "react-dom";
import PostContainer from "../components/PostContainer/PostContainer";

export default class EditPostPage extends React.Component {
  constructor(props: any) {
    super(props);
    this.getComponent = this.getComponent.bind(this);
  }

  private getPostId() {
    const url = window.location.href.split("/");
    return parseInt(url[url.length - 2]);
  }

  private getComponent(title: string, contents: string) {
    return (
      <CreateEditPostContainer title={title} content={contents}/>
    );
  }

  render() {
    return (
      <Page>
        <PostContainer id={this.getPostId()} getComponent={this.getComponent}/>
      </Page>
    )
  }

}

window.onload = () => {
  ReactDOM.render(
    <EditPostPage />,
    document.getElementById("main")
  );
};