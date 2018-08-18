import * as React from "react";
import * as ReactDOM from "react-dom";
import Page from "../../Page/Page";
import AceEditor from "../../../components/AceEditor/AceEditor";
import "./NewPostPage.scss";
import Post from "../components/Post/Post";

interface State {
  title: string,
  content: string
}

export default class NewPostPage extends React.Component<object, State> {

  constructor(props: object) {
    super(props);
    this.handleContentChange = this.handleContentChange.bind(this);

    this.state = {
      title: "",
      content: ""
    }
  }

  private handleContentChange(content: string): void {
    this.setState({
      content: content
    })
  }

  private handleTitleChange(title: string): void {
    this.setState({
      title: title
    });
  }

  render() {

    return (
      <Page>
        <div className={"new-post-page-container"}>
          <div className={"post-form-container"}>
            <form>
              <input className={"title-input"} type="text" placeholder="Title" onChange={(e) => this.handleTitleChange(e.target.value)} />
            </form>
          </div>
          <div className={"ace-editor-container"}>
            <AceEditor height={500} width={650} onChange={(content) => this.handleContentChange(content)}/>
          </div>
          <Post title={this.state.title} contents={this.state.content} />
        </div>
      </Page>
    );
  }
}

window.onload = () => {
  ReactDOM.render(
    <NewPostPage />,
    document.getElementById("main")
  );
};