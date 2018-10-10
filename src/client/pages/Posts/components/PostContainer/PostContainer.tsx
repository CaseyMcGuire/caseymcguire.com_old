import * as React from "react";
import DataService from "../../../../services/DataService";

interface State {
  title: string,
  contents: string,
}

interface Props {
  getComponent: (title: string, contents: string) => JSX.Element,
  id: number
}

export default class PostContainer extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      ...this.getInitialData()
    }
  }

  private getInitialData(): State {
    return DataService.getInitialData() as State;
  }

  render() {
    return (
      <div>
        {
          this.props.getComponent(this.state.title, this.state.contents)
        }
      </div>
    )
  }

}