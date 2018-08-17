import * as React from "react";
import { Ace, edit } from "ace-builds";

// we need to import themes from brace because Ace seems to have a lot of trouble importing them itself
import "brace/mode/markdown";
import Command = Ace.Command;


interface Props {
  height: number,
  width: number,
  initialContent?: string,
  onChange?: (content: string) => void
}

interface State {
  aceEditor?: Ace.Editor
}

export default class AceEditor extends React.Component<Props, State> {

  private static readonly ACE_EDITOR_ID = "ace-editor-";

  private readonly id: number;

  constructor(props: Props) {
    super(props);
    this.id = Math.random();
  }

  private handleChange(content: string) {
    if (this.props.onChange) {
      this.props.onChange(content);
    }
  }

  componentDidMount(): void {
    const editor = edit(this.getEditorId());
    editor.setOption("indentedSoftWrap", false);
    editor.getSession().setUseWrapMode(true);
    editor.renderer.setShowGutter(false);
    editor.session.setMode("ace/mode/markdown");

    // this is getting a compiler error but it matches the API and it works...
    editor.commands.bindKey("Ctrl-P",("golineup" as any) as Command);

    this.setState({
      aceEditor: editor
    });
    editor.on("change", () => {
      this.handleChange(editor.session.getValue());
    });
    editor.getSession().setValue(this.props.initialContent || "");

  }

  private getEditorId(): string {
    return AceEditor.ACE_EDITOR_ID + this.id;
  }

  render() {
    return (
      <div style={{height: this.props.height, width: this.props.width}} id={this.getEditorId()}>
        {this.props.initialContent}
      </div>
    )
  }
}