// 项目配置
module.exports = {
  // 是否开启https
  openHttps: false,
  // 是否开启json模式
  jsonSchema: process.env.NODE_ENV !== 'production',
  // 默认启动端口
  port: 8899,

  // 是否连接mysql
  connectMysql: true,
  mysqlConfig: [
    'changsha_house', // 数据库名
    'root', // 用户名
    'xingyun2021.', // 密码
    {
      host: 'localhost', // 数据库地址
      dialect: 'mysql', // 数据库类型
      port: 3306, // 端口号
      define: {
        underscored: true, // 字段以下划线分割
        // timestamps: false // 取消自动添加时间戳
      },
    },
  ],

  // 是否连接elasticsearch
  connectES: true,
  esConfig: {
    host: 'http://localhost:9200',
    apiVersion: '7.2',
  },

  // 是否连接redis
  connectRedis: false,
  redisConfig: {
    port: 6379,
    host: 'localhost',
  },
}
