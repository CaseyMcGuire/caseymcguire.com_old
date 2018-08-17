import * as React from "react";
import * as ReactDOM from "react-dom";
import Page from "../../Page/Page";
import * as marked from "marked"
import AceEditor from "../../../components/AceEditor/AceEditor";
import "./NewPostPage.scss";

interface State {
  content: string
}

export default class NewPostPage extends React.Component<object, State> {

  constructor(props: object) {
    super(props);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      content: ""
    }
  }

  private handleChange(content: string): void {
    this.setState({
      content: content
    })
  }

  render() {

    return (
      <Page>
        <div className={"new-post-page-container"}>
          <AceEditor height={500} width={500} onChange={(content) => this.handleChange(content)}/>
          <div className={"preview-container"} dangerouslySetInnerHTML={{__html: marked(this.state.content)}}/>
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