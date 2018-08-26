import * as React from "react";
import "./AuthFormContainer.scss";

interface Props {
  action: string
}

export default class AuthFormContainer extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }


  render(){
    return (
      <div className={"login-form-container"}>
        <form className={"login-form"} action={this.props.action} method="post">
          {this.props.children}
          <button className={"submit-button"} type="submit">submit</button>
        </form>
      </div>
    )
  }
}