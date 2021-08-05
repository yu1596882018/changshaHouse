// 项目配置
module.exports = {
  // 是否开启https
  openHttps: false,
  // 是否开启json模式
  jsonSchema: process.env.NODE_DEV === 'production',
  // 默认启动端口
  port: 8899,
  // 是否连接mysql
  connectMysql: true,
  // 是否连接elasticsearch
  connectES: true,
  // 是否连接redis
  connectRedis: false,
}
