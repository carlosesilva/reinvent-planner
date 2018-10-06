import React, { Component } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { github } from "react-syntax-highlighter/styles/hljs";

export default class CodeSnippet extends Component {
  constructor() {
    super();
    this.state = {
      codeString: ""
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
