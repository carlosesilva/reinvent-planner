import React, { Component } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { github } from "react-syntax-highlighter/styles/hljs";

// const codeString = fetch();

export default class CodeSnippet extends Component {
  constructor() {
    super();
    this.state = {
      codeString: ""
    };
  }

  componentDidMount() {
    console.log("componentDidMount");
    fetch("scrapper.js")
      .then(res => res.text())
      .then(codeString => this.setState({ codeString }));
  }

  render() {
    return (
      <SyntaxHighlighter language="javascript" showLineNumbers style={github}>
        {this.state.codeString}
      </SyntaxHighlighter>
    );
  }
}
