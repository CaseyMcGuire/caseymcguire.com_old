import * as React from "react";

export default class NavigationLinksList extends React.Component {
  render() {
    return (
      <ul className={"navigation-list"}>
        <NavigationLink name={"Home"} link={"/"}/>
        <NavigationLink name={"Resume"} link={"/resume"}/>
        <NavigationLink name={"Blog"} link={"/posts"}/>
        <NavigationLink name={"Projects"} link={"/projects"}/>
        <NavigationLink name={"Contact"} link={"mailto:caseyjaymcguire@gmail.com"} />
      </ul>
    );
  }
}

function NavigationLink(props: {name: string, link: string}) {
  return (
    <li className={"nav-bar-item"}>
      <a className={"nav-bar-link"} href={props.link}>{props.name}</a>
    </li>
  );
}