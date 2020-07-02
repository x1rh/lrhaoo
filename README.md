# 项目说明
基于react/redux+flask+jwt的前后端分离的个人博客  
[在线demo(不支持手机端访问)](http://47.103.14.157/)

## 项目历史
这个项目是我在我的[老博客](https://github.com/lrhhhhhh/old-blog)的基础上改进的，部分功能未实现


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


## 运行方式一：linux下不使用docker(要求安装了mysql和redis)
开第一个shell, 先生成虚拟环境并激活,   
若没有`venv`则`sudo apt-get install python3-venv`   
```shell script
cd webapp/backend
python3 -m venv venv  
source venv/bin/activate

cd application
pip install -r  requirements.txt   # 安装依赖

export FLASK_ENV=development
flask run                          # 启动后端
```

开第二个shell初始化数据库
```shell script
cd webapp/backend
source venv/bin/activate
cd application
flask initdb
flask mockdb
```

开第三个shell启动前端
```shell script
cd webapp/frontend
npm install                        # 安装依赖
npm start
```

## 运行方式二：使用docker
```shell script
cd webapp
docker-compose up 
```
等mysql和backend完全启动后，再开一个shell执行数据库初始命令
```shell script
docker exec backend flask initdb
docker exec backend flask mockdb
```


或者后台运行
```shell script
docker-compose up -d
```
等mysql和backend完全启动后，执行数据库初始命令
```shell script
docker exec backend flask initdb
docker exec backend flask mockdb
```

需保证系统安装了`docker`和`docker-compose`  
推荐使用`docker-compose up`启动，可以看到容器创建和初始化时的输出，
同时判断是否正常运行。(请看情况配置docker源)  
(ps:在这个项目中用到了lxml，我在阿里云用docker生成容器时发现build lxml的时候特别慢，
所以在构建镜像时需要一点时间)

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


