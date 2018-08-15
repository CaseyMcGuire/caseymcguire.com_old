import * as React from "react";
import PostDTO from "../../../../../shared/PostDTO";

interface Props {
  post: PostDTO
}

export default class Post extends React.Component<Props,{}> {

  render() {
    const {
      id,
      title,
      contents
    } = this.props.post;
    return (
      <div className={"post-container"}>
        <h2>{title}</h2>
        <div className={"post-contents-container"}>{contents}</div>
      </div>
    );
  }
}