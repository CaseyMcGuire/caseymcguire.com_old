import * as React from "react";

export default class CsrfToken extends React.Component {
  private getCsrfValue(): string {
    const csrf = document.getElementById("csrf-token") as HTMLMetaElement;
    return csrf.content;
  }

  public render() {
    return (
      <input type="hidden" name="_csrf" value={this.getCsrfValue()}/>
    );
  }
}