import * as React from "react";
import PostDTO from "../../../../../shared/PostDTO";
import PostService from "../../../../services/PostService";

interface State {
  title: string,
  contents: string,
  isLoaded: boolean
}

interface Props {
  getComponent: (title: string, contents: string) => JSX.Element,
  id: number
}

export default class PostContainer extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      title: '',
      contents: '',
      isLoaded: false
    }
  }

  componentDidMount() {
    new PostService()
      .getPost(this.props.id)
      .then((post: PostDTO) => {
        this.setState({
          title: post.title,
          contents: post.contents,
          isLoaded: true
        })
      })
      .catch((err) => {
        console.log(err);
      })
  }

  render() {
    return (
      <div>
        {
          this.state.isLoaded ?
            this.props.getComponent(this.state.title, this.state.contents)
            :
            <div>loading...</div>
        }
      </div>
    )
  }

}