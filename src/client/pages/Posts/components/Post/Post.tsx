import * as React from "react";
import * as marked from "marked";
import "./Post.scss";

interface Props {
  id?: number,
  title: string,
  contents: string
}

export default class Post extends React.Component<Props,{}> {

  render() {
    const {
      id,
      title,
      contents
    } = this.props;
    return (
      <div className={"post-container"}>
        <div className={"post-title-container"}>
          <h1 className={"post-title"}>{title}</h1>
        </div>
        <div className={"post-contents-container"}
             dangerouslySetInnerHTML={{__html: marked(contents)}} />
      </div>
    );
  }
}