import * as React from "react";
import "./Page.scss"

export default class Page extends React.Component<object, object> {

  render() {
    return (
      <div className="page-container">
        <div className="page-content">
          {this.props.children}
        </div>
      </div>
    )
  }
}