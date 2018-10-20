import * as React from "react";
import Page from "../../Page/Page";
import AuthFormContainer from "../components/AuthFormContainer/AuthFormContainer";
import FormField from "../components/InputField/InputField";
import * as ReactDOM from "react-dom";
import CsrfToken from "../../../components/CsrfToken/CsrfToken";

export default class SignUpPage extends React.Component<object, object> {

  constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <Page>
        <AuthFormContainer action={"/users/create"}>
          <CsrfToken />
          <FormField title={"Email"} formName={"email"} type={"text"}/>
          <FormField title={"Password"} formName={"password"} type={"password"}/>
          <FormField title={"Re-enter Password"} formName={"password-reenter"} type={"password"}/>
        </AuthFormContainer>
      </Page>
    )
  }
}

window.onload = () => {
  ReactDOM.render(
    <SignUpPage />,
    document.getElementById("main")
  );
}