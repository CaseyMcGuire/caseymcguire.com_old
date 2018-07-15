import * as React from "react";
import * as ReactDOM from "react-dom";

class Hello extends React.Component<{compiler: string; framework: string}, {}> {

  render() {
    return (
      <h1>Hello from {this.props.compiler} and {this.props.framework}!</h1>
    );
  }
}

window.onload = () => {
  ReactDOM.render(
    <Hello compiler={"TypeScript"} framework={"React"}/>,
    document.getElementById("main")
  );
}