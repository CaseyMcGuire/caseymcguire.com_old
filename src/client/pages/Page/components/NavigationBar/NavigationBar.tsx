import * as React from "react";
import "./NavigationBar.scss";

export default class NavigationBar extends React.Component<object, object> {

  render() {
    return (
      <div className={"navigation-bar-container"}>
        <ul className={"navigation-bar-items"}>
          <li className={"nav-bar-item"}>
            <a className={"nav-bar-link"} href="/">Home</a>
          </li>
          <li className={"nav-bar-item"}>
            <a className={"nav-bar-link"} href="/resume">Resume</a>
          </li>
          <li className={"nav-bar-item"}>
            <a className={"nav-bar-link"} href="/blog">Blog</a>
          </li>
          <li className={"nav-bar-item"}>
            <a className={"nav-bar-link"} href="/projects">Projects</a>
          </li>
        </ul>
      </div>
    );
  }
}