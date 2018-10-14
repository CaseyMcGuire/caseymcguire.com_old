import * as React from "react";
import "./SideMenu.scss";
import NavigationLinksList from "../NavigationLinks/NavigationLinksList";

interface Props {
  display: boolean,
  onCloseClick: () => void
}

export default class SideMenu extends React.Component<Props, object> {

  render() {
    const sideMenuClass = "side-menu" + (this.props.display ? " side-menu-visible" : "");
    const sideMenuGlassClass = "side-menu-glass" + (this.props.display ? " side-menu-glass-visible" : "");
    return (
      <div>
        <div onClick={this.props.onCloseClick} className={sideMenuGlassClass} />
        <div className={sideMenuClass}>
          <NavigationLinksList/>
        </div>
      </div>
    )
  }
}