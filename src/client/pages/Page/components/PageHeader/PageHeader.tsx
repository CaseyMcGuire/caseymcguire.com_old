import * as React from "react";
import "./PageHeader.scss";
import NavigationBar from "../NavigationBar/NavigationBar";

interface Props {
  onMenuButtonClick: () => void
}

export default class PageHeader extends React.Component<Props, object> {

  render() {
    return (
      <div className={"page-header-container"}>
        <div>
          <span className={"name"}>Casey McGuire</span>
        </div>
        <NavigationBar onMenuButtonClick={this.props.onMenuButtonClick} />
      </div>
    )
  }
}