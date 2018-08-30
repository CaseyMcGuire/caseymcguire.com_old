import * as React from "react";
import Post from "../../pages/Posts/components/Post/Post";
import AceEditor from "../AceEditor/AceEditor";
import "./CreateEditPostContainer.scss";

interface PropsAndState {
  title: string,
  content: string
}

export default class CreateEditPostContainer extends React.Component<PropsAndState, PropsAndState> {

  private static readonly TEXT_AREA_ID = "post-text-area";
  private static readonly POST_FORM_ID = "create-post-form";

  constructor(props: PropsAndState) {
    super(props);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleSubmitButtonClicked = this.handleSubmitButtonClicked.bind(this);

    this.state = {
      title: this.props.title || '',
      content: this.props.content || ''
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
    const textArea  = document.getElementById(CreateEditPostContainer.TEXT_AREA_ID) as HTMLTextAreaElement;
    textArea.value = this.state.content;
    const form = document.getElementById(CreateEditPostContainer.POST_FORM_ID) as HTMLFormElement;
    form.submit();
  }

  render() {
    return (
        <div className={"new-post-page-container"}>
          <div className={"post-form-container"}>
            <form id={CreateEditPostContainer.POST_FORM_ID} action="/posts/create" method="post">
              <input name="title"
                     className={"title-input"}
                     type="text"
                     placeholder="Title"
                     onChange={(e) => this.handleTitleChange(e.target.value)}
                     value={this.state.title}/>
              <textarea name="contents" id={CreateEditPostContainer.TEXT_AREA_ID} />
            </form>
          </div>
          <div className={"ace-editor-container"}>
            <AceEditor height={500} width={650} onChange={(content) => this.handleContentChange(content)} initialContent={this.state.content}/>
          </div>
          <div className={"submit-button-container"}>
            <SubmitButton onClick={this.handleSubmitButtonClicked} />
          </div>
          <Post title={this.state.title} contents={this.state.content} />
        </div>
    );
  }
}

function SubmitButton(props: {onClick: () => void}) {
  return (
    <div className={"post-submit-button"} onClick={props.onClick}>Submit</div>
  )
}