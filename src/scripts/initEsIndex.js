/**
 * 初始化Elasticsearch索引脚本
 * 用于创建日志相关的ES索引和示例文档
 * @author 长沙房屋查询平台
 * @version 2.0.0
 */
const esClient = require('./../db/es');

/**
 * 创建server_res_logs索引示例文档
 */
esClient.create({
  index: 'server_res_logs',
  type: '_doc',
  id: '90c28300-00e9-11ed-baa1-e327e6c98607',
  pipeline: 'geoip',
  body: {
    requestMethod: 'OPTIONS',
    requestHost: 'localhost:8899',
    requestOriginalUrl: '/reportMonitor',
    requestMatchedRoute: 'null',
    ip: '202.104.136.67',
    requestTime: 7.11,
    timestamp: '2022-07-11T07:17:47.427Z',
    browser: 'Chrome',
    browserVersion: '103.0.0',
    system: 'Windows',
    systemVersion: '10.0.0',
    responseStatus: 204,
  },
});

/**
 * 创建web_network_speed_logs索引示例文档
 */
esClient.create({
  index: 'web_network_speed_logs',
  type: '_doc',
  id: 'bacf4840-00e9-11ed-856c-4d37e350d652',
  pipeline: 'geoip',
  body: {
    category: 'network_speed',
    logType: 'Info',
    deviceType: 'PC',
    OS: 'Windows',
    OSVersion: '10.0',
    screenHeight: 864.11,
    screenWidth: 1536.11,
    language: 'zh_CN',
    netWork: '4g',
    orientation: '横屏',
    browserInfo: 'Chrome（版本: 103.0.0.0&nbsp;&nbsp;内核: Blink）',
    fingerprint: 'f6b3731d',
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36',
    browser: 'Chrome',
    browserVersion: '103.0.0',
    timestamp: '2022-07-11T07:18:57.988Z',
    ip: '202.104.136.67',
    networkSpeed: 573.13,
    pageId: 'changshaHouseMoblie',
  },
});

/**
 * 创建web_performance_logs索引示例文档
 */
esClient.create({
  index: 'web_performance_logs',
  type: '_doc',
  id: '025bc7b0-00ea-11ed-8172-21343a1d2daf',
  pipeline: 'geoip',
  body: {
    category: 'performance',
    logType: 'Info',
    deviceType: 'PC',
    OS: 'Windows',
    OSVersion: '10.0',
    screenHeight: 864.11,
    screenWidth: 1536.11,
    language: 'zh_CN',
    netWork: '4g',
    orientation: '横屏',
    browserInfo: 'Chrome（版本: 103.0.0.0&nbsp;&nbsp;内核: Blink）',
    fingerprint: 'f6b3731d',
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36',
    browser: 'Chrome',
    browserVersion: '103.0.0',
    timestamp: '2022-07-11T07:20:58.027Z',
    ip: '202.104.136.67',
    performance: {
      redirectTime: 0.11,
      dnsTime: 0.11,
      ttfbTime: 311.11,
      appcacheTime: 4.11,
      unloadTime: 0.11,
      tcpTime: 0.11,
      reqTime: 0.11,
      analysisTime: 20.11,
      blankTime: 317.11,
      domReadyTime: 645.11,
      loadPageTime: 664.11,
    },
    resourceList: [
      {
        name: 'http://localhost:8080/js/app.js',
        initiatorType: 'link',
        nextHopProtocol: 'http/1.1',
        redirectTime: 0.11,
        dnsTime: 0.11,
        tcpTime: 0.11,
        ttfbTime: 1.11,
        responseTime: 0.11,
        reqTotalTime: 1.11,
      },
    ],
    markUser: 'NWXnMEMTpT1657521681788',
    markUv: 'bYNNDMJpmE1657521681789',
    pageId: 'changshaHouseMoblie',
  },
});

/**
 * 创建web_err_logs索引示例文档
 */
esClient.create({
  index: 'web_err_logs',
  type: '_doc',
  id: 'd48c4230-00f6-11ed-9150-99b16d9b8af4',
  pipeline: 'geoip',
  body: {
    category: 'js_error',
    logType: 'Warning',
    deviceType: 'PC',
    OS: 'Windows',
    OSVersion: '10.0',
    screenHeight: 864.11,
    screenWidth: 1536.11,
    language: 'zh_CN',
    netWork: '4g',
    orientation: '横屏',
    browserInfo: 'Chrome（版本: 103.0.0.0&nbsp;&nbsp;内核: Blink）',
    fingerprint: '28507245',
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36',
    browser: 'Chrome',
    browserVersion: '103.0.0',
    timestamp: '2022-07-11T08:52:19.003Z',
    ip: '202.104.136.67',
    errorInfo:
      '错误类别: js_error\r\n日志信息: Uncaught ReferenceError: aaa is not defined\r\nurl: \r\n错误行号: 1\r\n错误列号: 1\r\n错误栈: ReferenceError: aaa is not defined\n    at <anonymous>:1:1\r\n',
  },
});

/**
 * 创建server_err_logs索引示例文档
 */
esClient.create({
  index: 'server_err_logs',
  type: '_doc',
  id: '773668d0-00f7-11ed-bc15-6dc39f8c0e75',
  pipeline: 'geoip',
  body: {
    requestMethod: 'OPTIONS',
    requestHost: 'localhost:8899',
    requestOriginalUrl: '/houseInfoList?offset=0&limit=20',
    requestMatchedRoute: 'null',
    ip: '202.104.136.67',
    requestTime: 4.11,
    timestamp: '2022-07-11T08:57:09.368Z',
    browser: 'Chrome',
    browserVersion: '103.0.0',
    system: 'Windows',
    systemVersion: '10.0.0',
    errName: 'ReferenceError',
    errMessage: 'ssss is not defined',
    errStack:
      'ReferenceError: ssss is not defined\n    at D:\\workspace\\changshaHouse\\src\\app.js:20:1\n    at processTicksAndRejections (internal/process/task_queues.js:93:5)',
  },
});
