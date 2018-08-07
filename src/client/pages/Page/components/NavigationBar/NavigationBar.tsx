import * as React from "react";
import "./NavigationBar.scss";

export default class NavigationBar extends React.Component<object, object> {

  render() {
    return (
      <div className={"navigation-bar-container"}>
        <ul className={"navigation-bar-items"}>
          <NavigationBarItem name={"Home"} link={"/"} />
          <NavigationBarItem name={"Resume"} link={"/resume"} />
          <NavigationBarItem name={"Blog"} link={"/blog"} />
          <NavigationBarItem name={"Projects"} link={"/projects"} />
        </ul>
      </div>
    );
  }
}

function NavigationBarItem(props: {name: string, link: string}) {
  return (
    <li className={"nav-bar-item"}>
      <a className={"nav-bar-link"} href={props.link}>{props.name}</a>
    </li>
  );
}