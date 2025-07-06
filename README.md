# 长沙楼市查询平台后端API

[![Node.js Version](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen.svg)](https://nodejs.org/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## 📖 项目简介

长沙楼市查询平台是一个基于Koa2框架开发的现代化Node.js后端API服务，专门用于查询长沙地区楼盘销售状态信息。由于住建局官网查询界面简陋，本项目旨在提升查询效率与移动端使用体验。

### ✨ 主要特性

- 🏗️ **现代化架构**: 基于Koa2 + MySQL + Redis + Elasticsearch
- 🕷️ **智能爬虫**: 使用request-promise + cheerio自动同步住建局官网数据
- 📱 **移动端优化**: 专为移动端查询体验设计
- 🔒 **安全可靠**: 完善的错误处理和API安全机制
- 📊 **监控完善**: 集成日志、异常、业务与性能监控
- 🚀 **高性能**: 支持缓存、连接池、压缩等优化

## 🛠️ 技术栈

### 后端框架
- **Koa2**: 轻量级Node.js Web框架
- **Sequelize**: ORM数据库操作
- **MySQL2**: MySQL数据库驱动
- **Redis**: 缓存数据库
- **Elasticsearch**: 搜索引擎

### 开发工具
- **ESLint + Prettier**: 代码规范和格式化
- **Nodemon**: 开发热重载

## 📦 快速开始

### 环境要求

- Node.js >= 14.0.0
- MySQL >= 5.7
- Redis >= 4.0
- Elasticsearch >= 7.0

### 安装步骤

1. **克隆项目**
```bash
git clone https://github.com/yu1596882018/changshaHouse.git
cd changshaHouse
```

2. **安装依赖**
```bash
npm install
```

3. **环境配置**
```bash
# 复制环境配置文件
cp .env.example .env
```

4. **启动服务**
```bash
# 开发环境
npm run dev

# 生产环境
npm run start
```

## 📚 API文档

### 基础信息

- **Base URL**: `http://localhost:8899/api/v1`
- **Content-Type**: `application/json`

### 主要接口

#### 1. 楼盘信息查询
```http
GET /api/v1/houses
```

#### 2. 验证码获取
```http
GET /api/v1/captcha
```

#### 3. 房源详情查询
```http
POST /api/v1/houses/verify
```

## 🚀 部署

### PM2部署（推荐）
```bash
npm run prod
```

## 📁 项目结构

```
src/
├── config/          # 配置文件
├── controllers/     # 控制器层
├── middlewares/     # 中间件
├── models/          # 数据模型
├── routers/         # 路由定义
├── scripts/         # 爬虫脚本
├── utils/           # 工具函数
├── app.js           # 应用入口
└── main.js          # 服务启动
```