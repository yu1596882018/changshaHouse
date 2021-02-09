const Router = require('koa-router')
const multer = require('koa-multer')
const demoRouter = new Router()
const demoCont = require('../controllers/demo')
const routerCommonExt = require('./routerCommonExt')
const upload = multer({ dest: 'static/' })

routerCommonExt(demoRouter, demoCont, '/demo')

// 文件上传接口
demoRouter.post('/profile', upload.single('avatar'), (ctx) => {
  console.log(ctx.file)
  ctx.body = {
    code: 200,
    message: 'success',
  }
})

module.exports = demoRouter
