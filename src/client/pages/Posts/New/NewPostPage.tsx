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

  private static readonly TEXT_AREA_ID = "post-text-area";
  private static readonly POST_FORM_ID = "create-post-form";

  constructor(props: object) {
    super(props);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleSubmitButtonClicked = this.handleSubmitButtonClicked.bind(this);

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

  private handleSubmitButtonClicked() {
    const textArea  = document.getElementById(NewPostPage.TEXT_AREA_ID) as HTMLTextAreaElement;
    textArea.value = this.state.content;
    const form = document.getElementById(NewPostPage.POST_FORM_ID) as HTMLFormElement;
    form.submit();
  }

  render() {

    return (
      <Page>
        <div className={"new-post-page-container"}>
          <div className={"post-form-container"}>
            <form id={NewPostPage.POST_FORM_ID} action="/posts/create" method="post">
              <input name="post-title" className={"title-input"} type="text" placeholder="Title" onChange={(e) => this.handleTitleChange(e.target.value)} />
              <textarea name="post-content" id={NewPostPage.TEXT_AREA_ID} />
            </form>
          </div>
          <div className={"ace-editor-container"}>
            <AceEditor height={500} width={650} onChange={(content) => this.handleContentChange(content)}/>
          </div>
          <div className={"submit-button-container"}>
            <SubmitButton onClick={this.handleSubmitButtonClicked} />
          </div>
          <Post title={this.state.title} contents={this.state.content} />
        </div>
      </Page>
    );
  }
}

function SubmitButton(props: {onClick: () => void}) {
  return (
    <div className={"post-submit-button"} onClick={props.onClick}>Submit</div>
  )
}

window.onload = () => {
  ReactDOM.render(
    <NewPostPage />,
    document.getElementById("main")
  );
};