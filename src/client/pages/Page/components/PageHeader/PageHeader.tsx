import * as React from "react";
import "./PageHeader.scss";
import NavigationBar from "../NavigationBar/NavigationBar";

export default class PageHeader extends React.Component<object, object> {

  render() {
    return (
      <div className={"page-header-container"}>
        <div>
          <span className={"name"}>Casey McGuire</span>
        </div>
        <NavigationBar/>
      </div>
    )
  }
}