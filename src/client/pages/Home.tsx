import * as React from "react";
import * as ReactDOM from "react-dom";
import Page from "./Page/Page";

class Home extends React.Component<{}, {}> {

  render() {
    return (
      <Page/>
    );
  }
}

window.onload = () => {
  ReactDOM.render(
    <Home />,
    document.getElementById("main")
  );
}