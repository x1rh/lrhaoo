import React from 'react';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import {clike, markup, markupTemplating} from 'react-syntax-highlighter/dist/esm/languages/prism'



const initialCodeString = `function createStyleObject(classNames, style) {
  return classNames.reduce((styleObject, className) => {
    return {...styleObject, ...style[className]};
  }, {});
}
function createClassNameString(classNames) {
  return classNames.join(' ');
}
function createChildren(style, useInlineStyles) {
  let childrenCount = 0;
  return children => {
    childrenCount += 1;
    return children.map((child, i) => createElement({
      node: child,
      style,
      useInlineStyles,
      key:\`code-segment-$\{childrenCount}-$\{i}\`
    }));
  }
}
function createElement({ node, style, useInlineStyles, key }) {
  const { properties, type, tagName, value } = node;
  if (type === "text") {
    return value;
  } else if (tagName) {
    const TagName = tagName;
    const childrenCreator = createChildren(style, useInlineStyles);
    const props = (
      useInlineStyles
      ?
      { style: createStyleObject(properties.className, style) }
      :
      { className: createClassNameString(properties.className) }
    );
    const children = childrenCreator(node.children);
    return <TagName key={key} {...props}>{children}</TagName>;
  }
}
  `;


SyntaxHighlighter.registerLanguage('markup', markup);
SyntaxHighlighter.registerLanguage('markup-templating', markupTemplating);
SyntaxHighlighter.registerLanguage('clike', clike);

const availableStyles = [
  // TODO: Generate list
];

const availableLanguages = ['text', 'javascript', 'java', 'yaml'];

class DemoHL extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: 'atom-dark',
      style: require('react-syntax-highlighter/dist/esm/styles/prism/atom-dark').default,
      code: initialCodeString,
      showLineNumbers: true,
      language: 'javascript'
    };
  }

  render() {
    const h1Style = {
      fontSize: 42,
      color: 'aliceblue'
    };
    const h2 = {
      fontSize: 24,
      color: 'aliceblue'
    };

    return (
      <div>
        <h1 style={h1Style}>React Syntax Highlighter Prism Async Light</h1>

        <div style={{ paddingTop: 20, display: 'flex' }}>
          <textarea
            style={{ flex: 1, marginTop: 11 }}
            rows={40}
            cols={100}
            value={this.state.code}
            onChange={e => this.setState({ code: e.target.value })}
          />
          <div style={{ flex: 1, width: '50%' }}>
            <SyntaxHighlighter
              style={this.state.style}
              showLineNumbers={this.state.showLineNumbers}
              wrapLines={true}
              lineProps={lineNumber => ({
                style: { display: 'block', cursor: 'pointer' },
                onClick() {
                  alert(`Line Number Clicked: ${lineNumber}`);
                }
              })}
              language={this.state.language}
            >
              {this.state.code}
            </SyntaxHighlighter>
          </div>
        </div>
      </div>
    );
  }
}

export default DemoHL;