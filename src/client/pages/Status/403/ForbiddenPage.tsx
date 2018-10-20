import * as React from "react";
import StatusPage from "../components/StatusPage/StatusPage";
import * as ReactDOM from "react-dom";

class ForbiddenPage extends React.Component {

  render() {
    return (
      <StatusPage statusCode={403} statusMessage={"Forbidden"}/>
    )
  }
}

ReactDOM.render(
  <ForbiddenPage />,
  document.getElementById("main")
);