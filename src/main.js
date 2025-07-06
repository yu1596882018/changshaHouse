/**
 * 服务器启动主文件
 * 负责启动HTTP和HTTPS服务器
 * @author 长沙房屋查询平台
 * @version 2.0.0
 */
const Http = require('http');
const Https = require('https');
const {default: enforceHttps} = require('koa-sslify');
const fs = require('fs');
const path = require('path');
const App = require('./app');
const utils = require('./utils');
const config = require('./config');

// 获取端口和环境配置
const PORT = process.env.PORT || config.server.port;
const NODE_ENV = process.env.NODE_ENV || 'development';

/**
 * 启动HTTP服务器
 * @returns {Object} HTTP服务器实例
 */
const startHttpServer = () => {
  try {
    const server = Http.createServer(App.callback());

    // 设置超时时间
    server.timeout = 30000; // 30秒
    server.keepAliveTimeout = 65000; // 65秒
    server.headersTimeout = 66000; // 66秒

    server.listen(PORT, config.server.host, () => {
      console.log('🚀 HTTP服务器启动成功');
      console.log(`📍 本地地址：http://localhost:${PORT}`);
      console.log(`🌐 网络地址：http://${utils.getIPAddress()}:${PORT}`);
      console.log(`📊 运行环境：${NODE_ENV}`);
      console.log(`⏰ 启动时间：${new Date().toLocaleString()}`);
      console.log('🔧 配置信息：');
      console.log(`   - 端口：${PORT}`);
      console.log(`   - 主机：${config.server.host}`);
      console.log(`   - 压缩：${config.features.compression ? '启用' : '禁用'}`);
      console.log(`   - 限流：${config.features.rateLimit ? '启用' : '禁用'}`);
      console.log(`   - HTTPS：${config.features.https ? '启用' : '禁用'}`);
    });

    // 错误处理
    server.on('error', error => {
      if (error.code === 'EADDRINUSE') {
        console.error(`❌ 端口 ${PORT} 已被占用，请检查是否有其他服务正在运行`);
      } else {
        console.error('❌ HTTP服务器启动失败:', error.message);
      }
      process.exit(1);
    });

    // 连接处理
    server.on('connection', socket => {
      socket.setTimeout(30000); // 30秒超时
    });

    return server;
  } catch (error) {
    console.error('❌ 创建HTTP服务器失败:', error.message);
    throw error;
  }
};

/**
 * 启动HTTPS服务器（仅开发环境）
 * @returns {Object|null} HTTPS服务器实例或null
 */
const startHttpsServer = () => {
  // 检查是否启用HTTPS
  if (NODE_ENV !== 'development' || !config.features.https) {
    console.log('ℹ️ HTTPS服务器未启用');
    return null;
  }

  try {
    const keyPath = path.join(__dirname, './data/server.key');
    const certPath = path.join(__dirname, './data/server.pem');

    // 检查SSL证书文件是否存在
    if (!fs.existsSync(keyPath) || !fs.existsSync(certPath)) {
      console.warn('⚠️ SSL证书文件不存在，跳过HTTPS服务器启动');
      console.warn('   请确保以下文件存在：');
      console.warn(`   - ${keyPath}`);
      console.warn(`   - ${certPath}`);
      return null;
    }

    const sslOptions = {
      key: fs.readFileSync(keyPath),
      cert: fs.readFileSync(certPath),
      secureOptions: require('constants').SSL_OP_NO_TLSv1 | require('constants').SSL_OP_NO_TLSv1_1,
    };

    // 启用HTTPS重定向
    App.use(
      enforceHttps({
        port: 8081,
        trustProtoHeader: true,
        trustAzureHeader: true,
      }),
    );

    const httpsServer = Https.createServer(sslOptions, App.callback());

    // 设置超时时间
    httpsServer.timeout = 30000;
    httpsServer.keepAliveTimeout = 65000;
    httpsServer.headersTimeout = 66000;

    httpsServer.listen(8081, () => {
      console.log('🔒 HTTPS服务器启动成功');
      console.log('📍 本地地址：https://localhost:8081');
      console.log(`🌐 网络地址：https://${utils.getIPAddress()}:8081`);
    });

    // 错误处理
    httpsServer.on('error', error => {
      if (error.code === 'EADDRINUSE') {
        console.error('❌ 端口 8081 已被占用，HTTPS服务器启动失败');
      } else {
        console.error('❌ HTTPS服务器启动失败:', error.message);
      }
    });

    return httpsServer;
  } catch (error) {
    console.error('❌ 创建HTTPS服务器失败:', error.message);
    return null;
  }
};

/**
 * 优雅关闭处理
 * @param {Object} servers 服务器实例对象
 */
const setupGracefulShutdown = servers => {
  const shutdown = signal => {
    console.log(`\n📡 收到 ${signal} 信号，正在优雅关闭服务器...`);

    const promises = [];

    if (servers.httpServer) {
      promises.push(
        new Promise(resolve => {
          servers.httpServer.close(() => {
            console.log('✅ HTTP服务器已关闭');
            resolve();
          });
        }),
      );
    }

    if (servers.httpsServer) {
      promises.push(
        new Promise(resolve => {
          servers.httpsServer.close(() => {
            console.log('✅ HTTPS服务器已关闭');
            resolve();
          });
        }),
      );
    }

    Promise.all(promises).then(() => {
      console.log('🎉 所有服务器已安全关闭');
      process.exit(0);
    });
  };

  // 监听进程信号
  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));

  // 监听未捕获的异常
  process.on('uncaughtException', error => {
    console.error('❌ 未捕获的异常:', error);
    shutdown('uncaughtException');
  });

  process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ 未处理的Promise拒绝:', reason);
    shutdown('unhandledRejection');
  });
};

/**
 * 主启动函数
 * @returns {Object} 服务器实例对象
 */
const startServer = () => {
  try {
    console.log('🚀 正在启动长沙房屋查询平台服务器...');
    console.log('📋 配置信息：');
    console.log(`   - 环境：${NODE_ENV}`);
    console.log(`   - 端口：${PORT}`);
    console.log(`   - 主机：${config.server.host}`);

    // 启动HTTP服务器
    const httpServer = startHttpServer();

    // 启动HTTPS服务器（如果配置了）
    const httpsServer = startHttpsServer();

    const servers = {httpServer, httpsServer};

    // 设置优雅关闭
    setupGracefulShutdown(servers);

    console.log('✅ 所有服务器启动完成');
    console.log('🎯 服务器已准备就绪，开始处理请求');

    return servers;
  } catch (error) {
    console.error('❌ 服务器启动失败:', error.message);
    console.error('🔍 错误详情:', error.stack);
    process.exit(1);
  }
};

// 启动服务器
startServer();
