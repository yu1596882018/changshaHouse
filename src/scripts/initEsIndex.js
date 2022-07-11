const esClient = require('./es')
esClient.create({
  "index": "server_res_logs",
  "type": "_doc",
  "id": "90c28300-00e9-11ed-baa1-e327e6c98607",
  "pipeline": "geoip",
  "body": {
    "requestMethod": "OPTIONS",
    "requestHost": "localhost:8899",
    "requestOriginalUrl": "/reportMonitor",
    "requestMatchedRoute": "null",
    "ip": "202.104.136.67",
    "requestTime": 7.11,
    "timestamp": "2022-07-11T07:17:47.427Z",
    "browser": "Chrome",
    "browserVersion": "103.0.0",
    "system": "Windows",
    "systemVersion": "10.0.0",
    "responseStatus": 204
  }
})
esClient.create({
  "index": "web_network_speed_logs",
  "type": "_doc",
  "id": "bacf4840-00e9-11ed-856c-4d37e350d652",
  "pipeline": "geoip",
  "body": {
    "category": "network_speed",
    "logType": "Info",
    "deviceType": "PC",
    "OS": "Windows",
    "OSVersion": "10.0",
    "screenHeight": 864.11,
    "screenWidth": 1536.11,
    "language": "zh_CN",
    "netWork": "4g",
    "orientation": "横屏",
    "browserInfo": "Chrome（版本: 103.0.0.0&nbsp;&nbsp;内核: Blink）",
    "fingerprint": "f6b3731d",
    "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36",
    "browser": "Chrome",
    "browserVersion": "103.0.0",
    "timestamp": "2022-07-11T07:18:57.988Z",
    "ip": "202.104.136.67",
    "networkSpeed": 573.13,
    "pageId": "changshaHouseMoblie"
  }
})
esClient.create({
  "index": "web_performance_logs",
  "type": "_doc",
  "id": "025bc7b0-00ea-11ed-8172-21343a1d2daf",
  "pipeline": "geoip",
  "body": {
    "category": "performance",
    "logType": "Info",
    "deviceType": "PC",
    "OS": "Windows",
    "OSVersion": "10.0",
    "screenHeight": 864.11,
    "screenWidth": 1536.11,
    "language": "zh_CN",
    "netWork": "4g",
    "orientation": "横屏",
    "browserInfo": "Chrome（版本: 103.0.0.0&nbsp;&nbsp;内核: Blink）",
    "fingerprint": "f6b3731d",
    "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36",
    "browser": "Chrome",
    "browserVersion": "103.0.0",
    "timestamp": "2022-07-11T07:20:58.027Z",
    "ip": "202.104.136.67",
    "performance": {
      "redirectTime": 0.11,
      "dnsTime": 0.11,
      "ttfbTime": 311.11,
      "appcacheTime": 4.11,
      "unloadTime": 0.11,
      "tcpTime": 0.11,
      "reqTime": 0.11,
      "analysisTime": 20.11,
      "blankTime": 317.11,
      "domReadyTime": 645.11,
      "loadPageTime": 664.11
    },
    "resourceList": [
      {
        "name": "http://localhost:8080/js/app.js",
        "initiatorType": "link",
        "nextHopProtocol": "http/1.1",
        "redirectTime": 0.11,
        "dnsTime": 0.11,
        "tcpTime": 0.11,
        "ttfbTime": 1.11,
        "responseTime": 0.11,
        "reqTotalTime": 1.11
      },
    ],
    "markUser": "NWXnMEMTpT1657521681788",
    "markUv": "bYNNDMJpmE1657521681789",
    "pageId": "changshaHouseMoblie"
  }
})