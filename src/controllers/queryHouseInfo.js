const rp = require('request-promise');
const cheerio = require('cheerio');
const houseMain = require('../scripts/houseMain');
const config = require('../config');
const APIError = require('../middlewares/apiError');

/**
 * 房源查询控制器
 * 提供房源信息查询相关的API接口
 */
module.exports = {
  /**
   * 获取验证码图片
   * @param {Object} ctx Koa上下文
   * @param {Function} _next 下一个中间件
   */
  getCodeImg: async(ctx, _next) => {
    try {
      ctx.set('Content-Type', 'image/png');
      ctx.set('Cache-Control', 'no-cache, no-store, must-revalidate');
      ctx.set('Pragma', 'no-cache');
      ctx.set('Expires', '0');

      const imgRes = await rp(`http://www.cszjxx.net/newCaptcha?r=${Math.random()}`, {
        headers: {
          accept: 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8',
          'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8',
          'proxy-connection': 'keep-alive',
          cookie:
            'XSRF-TOKEN=eyJpdiI6IlMzTGEwaHZ4M1Uyd3lkaTVTbU9YeEE9PSIsInZhbHVlIjoiUlJIXC9aRVc0eFJLTm5xQzNrOTRuQlwvRjZ2SDBqeHNRVXdGa25VWnVUNm5mQWVFV21BTkxDZDRtcmRyTnc5NkduUDVDc29zU1FsQ2xXMzNocFA0MmMzUT09IiwibWFjIjoiYjFkZTc0Mzk4NDljMTA5NzY2ODlkN2NjMmM4NmE3ZmUxYmQzZWU3NDhkNWFiMjJlMDEyYTZjMjcyMDE3Y2RjMyJ9; laravel_session=eyJpdiI6Ind5YWdycUZRVkJ0XC9pRW1LTXNsYzJnPT0iLCJ2YWx1ZSI6Ing4RmxOTkRLTzlucG14UUVBQ21BVEZKWTMrQkVrbWJKTXFKUFliVk10ekJ3XC9UZ3VUU1dzMWRlOG9SWThJRFk2a1FKckwzZXVqeVpCaUtHUEJZeHpYZz09IiwibWFjIjoiMzZhNDI3OTgxNzMwMWYwOGM2M2RhZDRjZTUwYWMzNzk5NDU4NDg0ZWNhNTQ3YzE0NWJlNGVhMzg4NDYxOTdkYiJ9',
        },
        referrer: 'http://www.cszjxx.net/preselllicence',
        referrerPolicy: 'strict-origin-when-cross-origin',
        body: null,
        method: 'GET',
        mode: 'cors',
        encoding: null,
        jar: true,
        timeout: config.crawler.timeout,
      });

      ctx.body = imgRes;
    } catch (error) {
      console.error('获取验证码失败:', error.message);
      ctx.status = 500;
      ctx.body = {
        code: 500,
        message: '获取验证码失败',
        error: error.message,
      };
    }
  },

  /**
   * 验证预售证号
   * @param {Object} ctx Koa上下文
   * @param {Function} _next 下一个中间件
   */
  verifyCode: async(ctx, _next) => {
    try {
      const {yszh, verifyCode} = ctx.request.body;

      // 参数验证
      if (!yszh || !verifyCode) {
        ctx.status = 400;
        ctx.body = {
          code: 400,
          message: '预售证号和验证码不能为空',
        };
        return;
      }

      // 获取页面Token
      const htmlRes = await rp('http://www.cszjxx.net/preselllicence', {
        jar: true,
        timeout: config.crawler.timeout,
      });
      const $ = cheerio.load(htmlRes);

      // 验证预售证号
      const result = await rp('http://www.cszjxx.net/preselllicence', {
        headers: {
          accept: 'application/json, text/javascript, */*; q=0.01',
          'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8',
          'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'proxy-connection': 'keep-alive',
          'x-requested-with': 'XMLHttpRequest',
          cookie:
            'XSRF-TOKEN=eyJpdiI6IlMzTGEwaHZ4M1Uyd3lkaTVTbU9YeEE9PSIsInZhbHVlIjoiUlJIXC9aRVc0eFJLTm5xQzNrOTRuQlwvRjZ2SDBqeHNRVXdGa25VWnVUNm5mQWVFV21BTkxDZDRtcmRyTnc5NkduUDVDc29zU1FsQ2xXMzNocFA0MmMzUT09IiwibWFjIjoiYjFkZTc0Mzk4NDljMTA5NzY2ODlkN2NjMmM4NmE3ZmUxYmQzZWU3NDhkNWFiMjJlMDEyYTZjMjcyMDE3Y2RjMyJ9; laravel_session=eyJpdiI6Ind5YWdycUZRVkJ0XC9pRW1LTXNsYzJnPT0iLCJ2YWx1ZSI6Ing4RmxOTkRLTzlucG14UUVBQ21BVEZKWTMrQkVrbWJKTXFKUFliVk10ekJ3XC9UZ3VUU1dzMWRlOG9SWThJRFk2a1FKckwzZXVqeVpCaUtHUEJZeHpYZz09IiwibWFjIjoiMzZhNDI3OTgxNzMwMWYwOGM2M2RhZDRjZTUwYWMzNzk5NDU4NDg0ZWNhNTQ3YzE0NWJlNGVhMzg4NDYxOTdkYiJ9',
        },
        referrer: 'http://www.cszjxx.net/preselllicence',
        referrerPolicy: 'strict-origin-when-cross-origin',
        body:
          `area=cs&yszh=${
            yszh
          }&_token=${
            $('#form [name="_token"]').val()
          }&ismobile=0&xmmc=&verify_code=${
            verifyCode}`,
        method: 'POST',
        mode: 'cors',
        json: true,
        jar: true,
        timeout: config.crawler.timeout,
      });

      // 处理验证结果
      if (result.status === '1') {
        const content = result.content.replace(/\\'/g, '\'').replace(/\\"/g, '"').replace(/\\\\/g, '\\');
        const $result = cheerio.load(content);
        const $a = $result('a');
        const hrefValue = $a.attr('href');
        const iMatch = hrefValue && hrefValue.match(/\S+floorinfo\/(\w+)/);
        const id = iMatch ? iMatch[1] : null;
        result.id = id;
      }

      ctx.body = {
        code: 200,
        message: '验证完成',
        data: result,
      };
    } catch (error) {
      console.error('验证预售证号失败:', error.message);
      ctx.status = 500;
      ctx.body = {
        code: 500,
        message: '验证预售证号失败',
        error: error.message,
      };
    }
  },

  /**
   * 收集房源信息
   * @param {Object} ctx Koa上下文
   * @param {Function} _next 下一个中间件
   */
  collectHouseInfo: async(ctx, _next) => {
    try {
      const {id} = ctx.query;

      if (!id) {
        ctx.status = 400;
        ctx.body = {
          code: 400,
          message: '房源ID不能为空',
        };
        return;
      }

      // 异步执行爬虫任务，避免阻塞响应
      setImmediate(async() => {
        try {
          await houseMain(id);
          console.log(`✅ 房源 ${id} 信息收集完成`);
        } catch (error) {
          console.error(`❌ 房源 ${id} 信息收集失败:`, error.message);
        }
      });

      ctx.body = {
        code: 200,
        message: '房源信息收集任务已启动',
        data: {
          id,
          status: 'processing',
          message: '数据正在后台收集，请稍后查询结果',
        },
      };
    } catch (error) {
      console.error('启动房源信息收集失败:', error.message);
      ctx.status = 500;
      ctx.body = {
        code: 500,
        message: '启动房源信息收集失败',
        error: error.message,
      };
    }
  },

  /**
   * 获取房源列表
   * @param {Object} ctx Koa上下文
   * @param {Function} _next 下一个中间件
   */
  getHouseList: async(ctx, _next) => {
    try {
      const {page = 1, limit = 20} = ctx.query;

      // 参数验证
      const pageNum = parseInt(page, 10);
      const limitNum = parseInt(limit, 10);

      if (pageNum < 1 || limitNum < 1 || limitNum > 100) {
        throw new APIError(APIError.Error400BadRequest, ctx, '分页参数不正确');
      }

      // TODO: 实现数据库查询逻辑
      // const houses = await houseService.getHouseList({
      //   page: pageNum,
      //   limit: limitNum,
      //   keyword,
      //   area,
      //   status,
      // });

      // 模拟数据
      const houses = {
        list: [],
        total: 0,
        page: pageNum,
        limit: limitNum,
      };

      ctx.body = {
        code: 200,
        message: '获取成功',
        data: houses,
      };
    } catch (error) {
      if (error instanceof APIError) {
        throw error;
      }

      console.error('获取房源列表失败:', error);
      throw new APIError(APIError.Error511SomeError, ctx, '获取房源列表失败');
    }
  },

  /**
   * 获取房源详情
   * @param {Object} ctx Koa上下文
   * @param {Function} _next 下一个中间件
   */
  getHouseDetail: async(ctx, _next) => {
    try {
      const {id} = ctx.params;

      if (!id) {
        throw new APIError(APIError.Error400BadRequest, ctx, '房源ID不能为空');
      }

      // TODO: 实现数据库查询逻辑
      // const house = await houseService.getHouseDetail(id);

      // 模拟数据
      const house = {
        id,
        name: '示例楼盘',
        area: '示例区域',
        status: '在售',
        totalUnits: 100,
        soldUnits: 80,
        price: '12000元/㎡',
        address: '示例地址',
        developer: '示例开发商',
        licenseNumber: '示例预售证号',
        buildDate: '2023-01-01',
        deliveryDate: '2024-01-01',
      };

      ctx.body = {
        code: 200,
        message: '获取成功',
        data: house,
      };
    } catch (error) {
      if (error instanceof APIError) {
        throw error;
      }

      console.error('获取房源详情失败:', error);
      throw new APIError(APIError.Error511SomeError, ctx, '获取房源详情失败');
    }
  },
};
