# 项目说明
基于react/redux+flask+jwt的前后端分离的个人博客  
[在线demo(不支持手机端访问)](http://47.103.14.157/)


# 实现的功能有
- 登录
- 注册
- 登出
- 文章页面，支持markdown(github风格)，支持代码块高亮
- 博客文章列表及分页
- 博客文章分类
- 对文章评论
- 回复评论
- 对评论下的回复的回复
- 相册，支持lightbox

# 技术栈
- react
- redux
- react-router-dom
- ant-design
- flask
- sqlalchemy
- mysql
- jwt
- redis
- pytest
- gunicorn
- nginx
- docker
- docker-compose

# 如何运行

## 配置环境变量
修改`backend/application/.env`里的环境变量:
```shell script
DATABASE_USER=root
DATABASE_PASS=your_database_password
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_NAME=your_database_name
TEST_DATABASE_NAME=your_test_database_name

MYSQL_USER=root
MYSQL_ROOT_PASSWORD=your_database_password
```

## 开发环境
构建
```shell
cd webapp
docker-compose build
```
运行
```shell
docker-compose up -d
```
当容器backend和mysql正常启动后, 初始化数据库
```shell
docker exec backend flask initdb
docker exec backend flask mockdb
```

停止
```shell
docker-compose down
```


## 生产环境
开发环境下使用`npm start`运行前端，使用`flask run`运行后端，支持代码更新自动重载  

构建
```shell
cd webapp
docker-compose -f docker-compose.prod.yml build
```
运行
```shell
docker-compose -f docker-compose.prod.yml up
```
当容器backend和mysql正常启动后，新开shell初始化数据库
```shell
docker exec backend flask initdb
docker exec backend flask mockdb
```

停止
```shell
docker-compose down
```



## 容器构建时可能遇到的问题
[解决编译错误：cc: Internal error: Killed (program cc1)](https://www.cnblogs.com/hubery/p/4633863.html)


# 测试
```shell script
cd webapp/backend
source venv/bin/activate
pytest
```

# TODO
- 实现响应式以支持手机端访问
- 实现网站后台
- 页面美化
- 更详细准确的测试样例

## 项目实现逻辑
[前端实现逻辑](frontend/README.md)  
[后端实现逻辑](backend/README.md)

------


