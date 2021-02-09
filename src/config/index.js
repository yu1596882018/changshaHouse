// 项目配置
module.exports = {
  // 是否开启https
  openHttps: false,
  // 是否开启json模式
  jsonSchema: process.env.NODE_DEV === 'production',
  // 默认启动端口
  port: 8899,
  // 是否连接mysql
  connectMysql: false,
  // 是否连接elasticsearch
  connectES: false,
  // 是否连接mysql
  connectRedis: false,
}
