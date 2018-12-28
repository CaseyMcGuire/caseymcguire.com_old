import * as React from "react";
import * as ReactDOM from "react-dom";
import Post from "../components/Post/Post";
import PostDTO from "../../../../shared/PostDTO";
import DataService from "../../../services/DataService";
import "./PostsIndexPage.scss"
import PostPage from "../components/PostPage/PostPage";

interface State {
  posts: PostDTO[],
  hasNextPage: boolean,
  pageNumber: number
}

class PostsIndexPage extends React.Component<object, State> {

  constructor(props: object) {
    super(props);
    const initialState = this.getInitialData();
    this.state = {
      ...initialState
    };
  }

  private getInitialData(): State {
    return DataService.getInitialData() as State;
  }

  render() {
    return (
      <PostPage>
          {
            this.state.posts.map((post) => {
              return (
                <Post key={post.id} id={post.id} title={post.title} contents={post.contents || ''} />
              )
            })
          }
        <PaginationPanel pageNumber={this.state.pageNumber} hasNextPage={this.state.hasNextPage} />
      </PostPage>
    )
  }
}

function PaginationPanel(props: {pageNumber: number, hasNextPage: boolean}) {
  const path = "/posts/page/";
  const disableRight = !props.hasNextPage;
  const disableLeft = props.pageNumber === 1;
  return (
    <div className={"pagination-panel"}>
      <div className={"pagination-arrow" + (disableLeft ? " hide-arrow" : "")}>
        <a href={path + (props.pageNumber - 1)}>&lsaquo;</a>
      </div>
      <div className={"page-number"}>
        {props.pageNumber}
      </div>
      <div className={"pagination-arrow" + (disableRight ? " hide-arrow" : "")}>
        <a href={path + (props.pageNumber + 1)}>&rsaquo;</a>
      </div>
    </div>
  )
}

window.onload = () => {
  ReactDOM.render(
    <PostsIndexPage />,
    document.getElementById("main")
  );
};