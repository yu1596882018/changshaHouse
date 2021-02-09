# koa 开发环境搭建

## 各依赖项说明

- koa
  - 核心
- koa-router
  - 路由中间件
- koa-logger
  - 日志打印中间件
- koa-static
  - 静态文件中间件
- cross-env
  - 处理不同操作系统，设置 node 环境变量的代码差异。
- koa-bodyparser
  - 解析 body 参数值
- koa-json
  - 格式化返回的 body（生产环境建议关闭，增加响应体积）
- log4js
  - 日志统计中间件
- koa2-cors
  - 跨域处理
- mysql2
  - mysql 连接工具，sequelize 的依赖项
- sequelize
  - 操作 mysql 数据库框架
- redis
  - 缓存式数据库
- cheerio
  - nodejs 的抓取页面模块，为服务器特别定制的，快速、灵活、实施的 jQuery 核心实现。适合各种 Web 爬虫程序。
- superagent
  - 一个轻量的,渐进式的 ajax api
  - 写爬虫时用到
- superagent-proxy
  - superagent 的扩展工具，使用代理 ip 用的
- bcryptjs
  - 密码加密库
- jsonwebtoken
  - 登录 token 生成库
- nodemon
  - 热更新工具

## 自动建模

sequelize-auto -o "./schema" -d ads -h localhost -u root -p 3306 -x 12345 -t ads_device_imei_ua_1156110000
