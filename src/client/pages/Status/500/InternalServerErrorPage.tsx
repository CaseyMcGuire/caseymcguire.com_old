import StatusPage from "../components/StatusPage/StatusPage";
import * as React from "react";
import * as ReactDOM from "react-dom";

function InternalServerErrorPage() {
  return (
    <StatusPage statusCode={500} statusMessage={"Internal Server Error"}/>
  )
}

window.onload = () => {
  ReactDOM.render(
    <InternalServerErrorPage />,
    document.getElementById("main")
  );
};