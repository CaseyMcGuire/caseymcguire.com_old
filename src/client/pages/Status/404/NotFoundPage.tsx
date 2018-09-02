import * as React from "react";
import * as ReactDOM from "react-dom";
import StatusPage from "../components/StatusPage/StatusPage";

function NotFoundPage() {
  return (
    <StatusPage statusCode={404} statusMessage={"Not Found"}/>
  )
}

window.onload = () => {
  ReactDOM.render(
    <NotFoundPage />,
    document.getElementById("main")
  );
};