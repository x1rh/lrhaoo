# 后端实现

## 项目结构
深受flask狗书影响

## 项目历史
这个项目是我在我的[老博客](https://github.com/lrhhhhhh/old-blog)的基础上改进的，部分功能未实现

## 基于jwt (json web token)的登录与注册
### 登录逻辑：
- 1)在处理注册和登录这两个操作时，后端返回`access_token`和`refersh_token`。
- 2)前端访问后端某些受保护资源时需要带上这两个token。
- 3)前端在判断用户是否登录时，先判断`access_token`是否过期，未过期则认为用户已登录
(因此一些操作后端必须进行再验证);
- 4)若`access_token`已过期，则去判断`refresh_token`是否过期，
`refresh_token`未过期则带上`refresh_token`访问后端`API`刷新`access_token`，实现登录; 
- 5)如果两个token都过期，则用户需要重新输入账号密码进行登录。

### 技术选择与实现
- jwt 相比于session来说是轻量级的，但是为了实现立即登出，后端必须增加额外的逻辑，
项目里使用的是redis辅助实现这一功能(也可以选择使用数据库来实现)      
- 后端在实现这个功能时用到的包为[flask-jwt-extended](https://github.com/vimalloc/flask-jwt-extended)，
关于redis的实现，有对应[demo](https://github.com/vimalloc/flask-jwt-extended/blob/master/examples/redis_blacklist.py)

## 数据库设计
- ORM大法好，上手快，性能调优什么的，以后再说。  
- 只有在tag和article之间存在多对多关系，其他的表之间的顶多是一对多关系

## API 实现
- CRUD来一套

## 如何生成文章简述
如何将markdown截断进行展示是一个不太好解决的问题，
这里有一个帖子，[生成 Markdown 摘要的几种方式对比](https://www.jianshu.com/p/0ec915e170c4)
，大致思路是将markdown转化为html后，根据html标签语义后利用已有的库进行文本处理

## 存在的问题
- 测试过于简单，没有包含全部情况
- API的起名以及查询所使用到的参数
- 安全性
