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
            <h3>Software Development Engineer in Seattle, WA.</h3>
            <div className={"picture-container"}>
              <SocialMediaIcon src={"/public/assets/images/linkedin_picture.png"} link={"https://www.linkedin.com/in/casey-mcguire-68966891/"} />
              <SocialMediaIcon src={"/public/assets/images/github_picture.png"} link={"https://github.com/CaseyMcGuire"} />
            </div>
          </div>
        </div>
      </Page>
    );
  }
}

function SocialMediaIcon(props: {src: string, link: string}) {
  return (
    <a href={props.link}>
      <img className={"social-media-icon"} src={props.src} />
    </a>
  )
}

window.onload = () => {
  ReactDOM.render(
    <HomePage />,
    document.getElementById("main")
  );
};