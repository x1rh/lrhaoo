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
```cpp
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
```

Pretty neat, eh?

## Tables?

| Feature   | Support |
| --------- | ------- |
| tables    | ✔ |
| alignment | ✔ |
| wewt      | ✔ |

## More info?

Read usage information and more on [GitHub](//github.com/rexxars/react-markdown)

## what about a picture?
![it's a picture](http://h1.ioliu.cn/bing/VernalFalls_ZH-CN2664125316_1920x1080.jpg?imageslim)

## todolist
- [ ] need to be done
- [x] finished..


---------------

A component by [Espen Hovlandsdal](https://espen.codes/)