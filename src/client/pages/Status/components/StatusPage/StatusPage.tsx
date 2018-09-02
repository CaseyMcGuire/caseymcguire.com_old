import * as React from "react";
import Page from "../../../Page/Page";
import "./StatusPage.scss";

interface Props {
  statusCode: number,
  statusMessage: string
}

export default class StatusPage extends React.Component<Props> {

  render() {
    return (
      <Page>
        <div className={"status-container"}>
          <div className={"status-code-container"}>
            <h1>
              {this.props.statusCode}
            </h1>
          </div>
          <div className={"status-message-container"}>
            <h2>
              {this.props.statusMessage}
            </h2>
          </div>
        </div>
      </Page>
    )
  }
}