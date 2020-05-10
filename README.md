# 项目说明
基于react+flask+jwt的前后端分离的个人博客  
[在线demo(不支持手机端访问)](http://47.103.14.157:3000/)

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
修改`backend/.env`里的环境变量:
```shell script
DATABASE_USER=root
DATABASE_PASS=your_database_password
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_NAME=your_database_name
TEST_DATABASE_NAME=your_test_database_name

REDIS_PASS=your_redis_password
REDIS_HOST=localhost
REDIS_PORT=6379
```
此外如果使用dcoker则`webapp/docker-compose.yml`中的环境变量也要对应的更改，使之与`.env`中的一致, 
且`hostname`要和`docker-compose.yml`中的服务名一致, 
可以参考我在`webapp/backend/config.py`中`ProductionConfig类`的配置   


## 运行方式一：linux下不使用docker(要求安装了mysql和redis)
开第一个shell, 先生成虚拟环境并激活,   
若没有`venv`则`sudo apt-get install python3-venv`   
```shell script
cd webapp
python3 -m venv venv  
source venv/bin/activate

cd backend
pip install -r  requirements.txt   # 安装依赖

export FLASK_ENV=development
flask run                          # 启动后端
```

开第二个shell初始化数据库
```shell script
cd webapp
source venv/bin/activate
cd backend
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
docker-compose up 
```
或者后台运行
```shell script
docker-compose up -d
```
需保证系统安装了`docker`和`docker-compose`  
推荐使用`docker-compose up`启动，可以看到容器创建和出时化的输出，
同时判断是否正常运行。  
(ps:在这个项目中用到了lxml，我在阿里云用docker生成容器时发现build lxml的时候特别慢，
看到有帖子说好像是内存不够导致的，这一点暂时测试不了，因为我本地的docker环境
好端端的莫名奇妙坏了，卸载不掉，重装不了，系统暂时不想重装)

# 测试
```shell script
cd webapp
source venv/bin/activate
pytest
```

# TODO
- 实现响应式以支持手机端访问
- 网站后台
- 页面美化
- 更详细准确的测试样例

## 项目实现逻辑
[前端实现逻辑](frontend/README.md)  
[后端实现逻辑](backend/README.md)

------


