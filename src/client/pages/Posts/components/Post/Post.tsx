import * as React from "react";
import * as marked from "marked";
import "./Post.scss";
import * as sanitizeHtml from "sanitize-html";
import * as hljs from 'highlight.js';
import 'highlight.js/styles/github.css';

type Props = Readonly<{
  id?: number,
  title: string,
  contents: string
}>

export default class Post extends React.Component<Props,{}> {

  constructor(props: Props) {
    super(props);
  }

  render() {
    const {
      id,
      title,
      contents
    } = this.props;

    const unsanitized_html_DO_NOT_USE = marked(contents, {
      highlight: (code, lang) => {
        return hljs.highlight(lang, code).value;
      }
    });

    const sanitizedHtml = sanitizeHtml(unsanitized_html_DO_NOT_USE, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(['span']),
      allowedAttributes: Object.assign({}, sanitizeHtml.defaults.allowedAttributes, {'span' : ['class'], 'code': ['class']})
    });
    return (
      <div className={"post-container"}>
        <div className={"post-title-container"}>
          <h1 className={"post-title"}>{title}</h1>
        </div>
        <div className={"post-contents-container"}
             dangerouslySetInnerHTML={{__html: sanitizedHtml}} />
      </div>
    );
  }
}