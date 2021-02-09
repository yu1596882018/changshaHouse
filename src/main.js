const Http = require('http')
const Https = require('https')
const { default: enforceHttps } = require('koa-sslify')
const fs = require('fs')
const path = require('path')
const App = require('./app')
const utils = require('./utils')
const config = require('./config')
const Port = process.env.port || config.port
const NODE_DEV = process.env.NODE_DEV || 'development'

Http.createServer(App.callback()).listen(Port, () => {
  console.log(`服务器开启成功：http://localhost:${Port}`)
  console.log(`服务器开启成功：http://${utils.getIPAdress()}:${Port}`)
})

if (NODE_DEV === 'development' && config.openHttps) {
  App.use(
    enforceHttps({
      port: 8081,
    }),
  )

  // SSL options
  var options = {
    key: fs.readFileSync(path.join(__dirname, './data/server.key')),
    cert: fs.readFileSync(path.join(__dirname, './data/server.pem')),
  }

  Https.createServer(options, App.callback()).listen(8081, () => {
    console.log(`服务器开启成功：https://${utils.getIPAdress()}:8081`)
  })
}
