import React from "react";
import {PrismLight as SyntaxHighlighter} from "react-syntax-highlighter";

import {clike, markup, markupTemplating} from 'react-syntax-highlighter/dist/esm/languages/prism'

SyntaxHighlighter.registerLanguage('markup', markup);
SyntaxHighlighter.registerLanguage('markup-templating', markupTemplating);
SyntaxHighlighter.registerLanguage('clike', clike);

class CodeBlock extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <SyntaxHighlighter
                style={require('react-syntax-highlighter/dist/esm/styles/prism/atom-dark').default}
                showLineNumbers={true}
                language={this.props.language}
            >
                {this.props.value}
            </SyntaxHighlighter>
        )
    }
}

export default CodeBlock;