
import * as React from "react";
import Page from "../../Page/Page";
import * as ReactDOM from "react-dom";
import "./LoginPage.scss"
import FormField from "../components/InputField/InputField";
import AuthFormContainer from "../components/AuthFormContainer/AuthFormContainer";

export default class LoginPage extends React.Component<{}, {}> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <Page>
        <AuthFormContainer action={"/sessions/create"}>
          <FormField title={"Email"} formName={"email"} type={"text"} />
          <FormField title={"Password"} formName={"password"} type={"password"} />
        </AuthFormContainer>
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