require('dotenv').config();

/**
 * 应用配置文件
 * 支持环境变量覆盖，提升安全性和灵活性
 */
module.exports = {
  // 服务器配置
  server: {
    port: process.env.PORT || 8899,
    host: process.env.HOST || '0.0.0.0',
    env: process.env.NODE_ENV || 'development',
  },

  // 功能开关
  features: {
    https: process.env.OPEN_HTTPS === 'true',
    jsonSchema: process.env.NODE_ENV !== 'production',
    compression: process.env.COMPRESSION !== 'false',
    rateLimit: process.env.RATE_LIMIT !== 'false',
  },

  // 数据库配置
  database: {
    enabled: process.env.CONNECT_MYSQL !== 'false',
    config: {
      database: process.env.DB_NAME || 'changsha_house',
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'XingYun2022',
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 3306,
      dialect: 'mysql',
      timezone: '+08:00',
      define: {
        underscored: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
      },
      pool: {
        max: 20,
        min: 5,
        acquire: 30000,
        idle: 10000,
      },
      logging: process.env.NODE_ENV === 'development' ? console.log : false,
    },
  },

  // Redis配置
  redis: {
    enabled: process.env.CONNECT_REDIS !== 'false',
    config: {
      host: process.env.REDIS_HOST || 'localhost',
      port: process.env.REDIS_PORT || 6379,
      password: process.env.REDIS_PASSWORD || null,
      db: process.env.REDIS_DB || 0,
      retryDelayOnFailover: 100,
      enableReadyCheck: false,
      maxRetriesPerRequest: null,
    },
  },

  // Elasticsearch配置
  elasticsearch: {
    enabled: process.env.CONNECT_ES !== 'false',
    config: {
      host: process.env.ES_HOST || 'http://localhost:9200',
      apiVersion: process.env.ES_API_VERSION || '7.2',
      log: process.env.NODE_ENV === 'development' ? 'info' : 'error',
    },
  },

  // JWT配置
  jwt: {
    secret: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    algorithm: 'HS256',
  },

  // 爬虫配置
  crawler: {
    delay: parseInt(process.env.CRAWLER_DELAY) || 1000,
    timeout: parseInt(process.env.CRAWLER_TIMEOUT) || 30000,
    userAgent: process.env.CRAWLER_USER_AGENT || 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    retries: 3,
  },

  // 安全配置
  security: {
    cors: {
      origin: process.env.CORS_ORIGIN || '*',
      credentials: true,
    },
    rateLimit: {
      windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15分钟
      max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // 限制每个IP 15分钟内最多100个请求
    },
  },

  // 日志配置
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    filePath: process.env.LOG_FILE_PATH || 'logs',
    maxSize: '10m',
    maxFiles: '5',
  },
};
