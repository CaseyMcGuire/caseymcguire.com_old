import * as React from "react";
import "./Page.scss"
import PageHeader from "./components/PageHeader/PageHeader";

export default class Page extends React.Component<object, object> {

  render() {
    return (
      <div className="page-container">
        <div className="page-content">
          <PageHeader />
          {this.props.children}
        </div>
      </div>
    )
  }
}