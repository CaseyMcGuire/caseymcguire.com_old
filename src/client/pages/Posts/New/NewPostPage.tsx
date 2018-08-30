import * as React from "react";
import * as ReactDOM from "react-dom";
import Page from "../../Page/Page";
import "./NewPostPage.scss";
import CreateEditPostContainer from "../../../components/CreateEditPostContainer/CreateEditPostContainer";

export default class NewPostPage extends React.Component<object, object> {

  constructor(props: object) {
    super(props);
  }

  render() {
    return (
      <Page>
        <CreateEditPostContainer title={""} content={""}/>
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