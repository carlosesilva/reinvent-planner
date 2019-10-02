import React, { Component } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { github } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Button from "./Button";

export default class CodeSnippet extends Component {
  constructor() {
    super();
    this.state = {
      codeString: "",
      copied: false
    };
  }

  componentDidMount() {
    fetch("scrapper.js")
      .then(res => res.text())
      .then(codeString => this.setState({ codeString }));
  }

  render() {
    return (
      <div className="CodeSnippet">
        <CopyToClipboard
          text={this.state.codeString}
          onCopy={() => this.setState({ copied: true })}
        >
          <Button className="CodeSnippet__copy">
            {this.state.copied ? "Copied!" : "Copy to clipboard"}
          </Button>
        </CopyToClipboard>
        <SyntaxHighlighter
          language="javascript"
          showLineNumbers
          style={github}
          customStyle={{
            overflow: "scroll",
            width: "100%",
            height: "100%"
          }}
        >
          {this.state.codeString}
        </SyntaxHighlighter>
      </div>
    );
  }
}
