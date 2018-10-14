import * as React from "react";
import "./NavigationBar.scss";
import MenuButton from "../MenuButton/MenuButton";
import NavigationLinksList from "../NavigationLinks/NavigationLinksList";

interface Props {
  onMenuButtonClick: () => void
}

export default class NavigationBar extends React.Component<Props, object> {

  render() {
    return (
      <div className={"navigation-bar-container"}>
        <div className={"navigation-bar-links-container"}>
          <NavigationLinksList />
        </div>
        <div className={"menu-button-container"}>
          <MenuButton onClick={this.props.onMenuButtonClick} />
        </div>
      </div>
    );
  }
}
