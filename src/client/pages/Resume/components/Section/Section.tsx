import * as React from "react";
import "./Section.scss";

interface Props {
  title: string
}

export default class Section extends React.Component<Props, object> {
  render () {
    return (
      <div className={"section-container"}>
          <div className="section-title-container">
            <span className={"section-title"}>{this.props.title}</span>
          </div>
        <div className={"section-content-container"}>
          {this.props.children}
        </div>
      </div>
    )
  }
}