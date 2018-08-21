
import * as React from "react";
import Page from "../Page/Page";
import * as ReactDOM from "react-dom";

export default class LoginPage extends React.Component<{}, {}> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <Page>
        <div>
          <form action="/sessions/create" method="post">
            <input name="email" type="text" />
            <input name="password" type="text" />
            <button type="submit">submit</button>
          </form>
          <form action="/sessions/destroy" method="post">
            <button type="submit">destroy</button>

          </form>
        </div>
      </Page>
    )
  }
}

window.onload = () => {
  ReactDOM.render(
    <LoginPage />,
    document.getElementById("main")
  );
}