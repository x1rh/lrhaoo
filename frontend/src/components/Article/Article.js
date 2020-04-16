import React, {useEffect, useState} from "react";

import ReactMarkdown from "react-markdown";
import {useParams} from 'react-router-dom';
import CodeBlock from "../CodeBlock/CodeBlock";
import remarkToc from "remark-toc";

import './Article.css';

require('github-markdown-css');

const initialSource = `
# Live demo

Changes are automatically rendered as you type.

## Table of Contents

* Implements [GitHub Flavored Markdown](https://github.github.com/gfm/)
* Renders actual, "native" React DOM elements
* Allows you to escape or skip HTML (try toggling the checkboxes above)
* If you escape or skip the HTML, no \`dangerouslySetInnerHTML\` is used! Yay!

## HTML block below

<blockquote>
  This blockquote will change based on the HTML settings above.
</blockquote>

## How about some code?
\`\`\`cpp
#include <iostream>
#include <algorithm>
#include <vector>

using namespace std;

vector<int> make_vec(int n, int a, int b){
    vector<int> v;
    for(int i=0; i<n; ++i+){
        v.push_back(i);
        if(i == a){
            for(int j=0; j<b; ++j){
                v.push_back(i);
            }
        }
    }
}

void print(vector<int>& v){
    for(int i=0; i<v.size(); ++i){
        cout<<v[i]<<" ";
    }
    cout<<endl;
}

int main(){
    int a, b, n;
    cin>>a>>b>>n;
    vector<int> res = make_vec(n, a, b);
    print(res);
    return 0;
}
\`\`\`

Pretty neat, eh?

## Tables?

| Feature   | Support |
| --------- | ------- |
| tables    | ✔ |
| alignment | ✔ |
| wewt      | ✔ |

## More info?

Read usage information and more on [GitHub](//github.com/rexxars/react-markdown)

## todolist
- [ ] need to be done
- [x] finished..


---------------

A component by [Espen Hovlandsdal](https://espen.codes/)
`

const Article = () => {
    const { id } = useParams();
    const [content, setContent] = useState(initialSource);
    const url = '/api/article/' + id;

    useEffect(() => {
        fetch(url).then(res => res.json()).then(data => {
            setContent(content + data['content']);
        });

        // document.querySelectorAll('div.code').forEach((block) => {
        //   hljs.highlightBlock(block);
        // });
    }, []);

    return (
        <div className='markdown-body'>
            <ReactMarkdown
                source={content}
                renderers={{code: CodeBlock}}
                skipHtml={false}
                escapeHtml={false}
                plugins={[remarkToc]}
            />
        </div>

    );
};

export default Article;