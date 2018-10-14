import * as React from "react";
import "./MenuButton.scss";

interface Props {
  onClick: () => void
}

export default class MenuButton extends React.Component<Props, {}> {
  render() {
    return (
      <div onClick={this.props.onClick} className={"menu-button"}>
        <div className={"menu-button-line"}></div>
        <div className={"menu-button-line"}></div>
        <div className={"menu-button-line"}></div>
      </div>
    )
  }
}