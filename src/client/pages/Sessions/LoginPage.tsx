
import * as React from "react";
import Page from "../Page/Page";
import * as ReactDOM from "react-dom";
import "./LoginPage.scss"

export default class LoginPage extends React.Component<{}, {}> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <Page>
        <div className={"login-form-container"}>
          <form className={"login-form"} action="/sessions/create" method="post">
            <FormField title={"Email"} formName={"email"} />
            <FormField title={"Password"} formName={"password"} />
            <button className={"submit-button"} type="submit">submit</button>
          </form>

        </div>
      </Page>
    )
  }
}

function FormField(props: {formName: string, title: string}) {
  return (
    <div className={"form-container"}>
      <div className={"title-container"}>
        <span>{props.title}:</span>
      </div>
      <div className={"input-container"}>
        <input name={props.formName} type="text" />
      </div>
    </div>
  );
}

window.onload = () => {
  ReactDOM.render(
    <LoginPage />,
    document.getElementById("main")
  );
}