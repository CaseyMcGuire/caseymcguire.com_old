import * as React from "react";
import Page from "../Page/Page";
import * as ReactDOM from "react-dom";

export default class ProjectsPage extends React.Component<object, object> {

  render() {
    return (
      <Page>
        <div>
          Project page!
        </div>
      </Page>
    );
  }
}

window.onload = () => {
  ReactDOM.render(
    <ProjectsPage />,
    document.getElementById("main")
  );
}