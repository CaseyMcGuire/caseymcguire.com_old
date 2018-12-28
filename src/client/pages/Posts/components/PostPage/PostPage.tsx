import * as React from "react";
import Page from "../../../Page/Page"
import "./PostPage.scss"

export default class PostPage extends React.Component {
  render() {
    return (
      <Page>
        <div className={"post-page"}>
          {this.props.children}
        </div>
      </Page>
    )
  }
}