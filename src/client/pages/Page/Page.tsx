import * as React from "react";
import "./Page.scss"
import PageHeader from "./components/PageHeader/PageHeader";
import SideMenu from "./components/SideMenu/SideMenu";

interface State {
  displaySideMenu: boolean
}

export default class Page extends React.Component<object, State> {

  constructor(props: object) {
    super(props);
    this.state = {
      displaySideMenu: false
    };
    this.toggleSideMenu = this.toggleSideMenu.bind(this);
  }

  toggleSideMenu() {
    this.setState({
      displaySideMenu: !this.state.displaySideMenu
    })
  }

  render() {
    return (
      <div className="page-container">
        <div className="page-content">
          <PageHeader onMenuButtonClick={this.toggleSideMenu}/>
          {this.props.children}
        </div>
        <SideMenu onCloseClick={this.toggleSideMenu} display={this.state.displaySideMenu}/>
      </div>
    )
  }
}