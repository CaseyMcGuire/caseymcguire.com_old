import * as React from "react";
import * as ReactDOM from "react-dom";
import Page from "../Page/Page";
import "./HomePage.scss";

class HomePage extends React.Component {

  render() {
    return (
      <Page>
        <div className={"home-page-container"}>
          <div className={"home-page-picture-container"}>
            <img className={"home-page-picture"} src="/public/assets/images/home_picture.jpeg"/>
          </div>
          <div className={"info-container"}>
            <h3>Software Development Engineer in Bellevue, WA.</h3>
            <div className={"picture-container"}>
              <a href="https://www.linkedin.com/in/casey-mcguire-68966891/">
                <img className={"linkedin-picture"} src="/public/assets/images/linkedin_picture.png" />
              </a>
            </div>
          </div>
        </div>
      </Page>
    );
  }
}

window.onload = () => {
  ReactDOM.render(
    <HomePage />,
    document.getElementById("main")
  );
};