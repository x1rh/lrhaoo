import React from "react";
import PropTypes from 'prop-types';

import {PrismLight as SyntaxHighlighter} from "react-syntax-highlighter";
import {clike, markup, markupTemplating} from 'react-syntax-highlighter/dist/esm/languages/prism'


class CodeBlock extends React.PureComponent {

    render() {
        SyntaxHighlighter.registerLanguage('markup', markup);
        SyntaxHighlighter.registerLanguage('markup-templating', markupTemplating);
        SyntaxHighlighter.registerLanguage('clike', clike);

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

CodeBlock.propTypes = {
    language: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
};

export default CodeBlock;