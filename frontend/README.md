# 前端实现
## 文件结构
参考资料:
- [React+Redux工程目录结构，最佳实践](https://www.jianshu.com/p/f913860f1494)
- [react-redux-universal-hot-example](https://github.com/erikras/react-redux-universal-hot-example/tree/master/src) 
- [React-Redux-Flask ](https://github.com/dternyak/React-Redux-Flask)


## ant-design
使用ant-design是因为它有一套组件，可以加速开发，
后面觉得这面向中后台的设计风格真丑，但是已经开发了大半了，
想换成更香的`material-ui`已经来不及

## 使用的一些包
- 使用[prop-types](https://react.docschina.org/docs/typechecking-with-proptypes.html)
检查类型
- axios
- 使用[jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)对token进行解码 


## 使用的第三方react组件
- 使用[react-markdown](https://github.com/rexxars/react-markdown), 可以提供对指定标签的渲染方式
- 使用[react-syntax-highlighter](https://github.com/conorhastings/react-syntax-highlighter)实现高亮
- 使用[react-images ](https://github.com/jossmac/react-images)实现lightbox


## TODO
- 代码块高亮在build之后样式丢失，本地run没问题
- 提供mock数据更符合前后端分离的那套工作流程
- 对前端那套工具链还不够熟悉, 一些东西写的不够合理
- 实现响应式以支持手机端访问
- 网站后台
- 页面美化
