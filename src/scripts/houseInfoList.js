/**
 * 房屋信息列表数据爬取脚本
 * 从住建局官网获取房屋基本信息
 */
const cheerio = require('cheerio')
const rp = require('request-promise')

// 定义属性名称数组
const attrNames = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
]
const leftCol = attrNames.slice(0, 10)
const rightCol = attrNames.slice(10, attrNames.length - 1)
const lastCol = attrNames.slice(attrNames.length - 1)
// console.log(leftCol, rightCol, lastCol)

/**
 * 爬取房屋信息列表数据
 * @param {string} id 房屋ID
 * @returns {Promise<Object>} 房屋信息数据
 */
module.exports = async (id) => {
  try {
    // 验证参数
    if (!id) {
      throw new Error('房屋ID不能为空')
    }

    const data = {
      v: id,
    }

    const baseUrl = 'http://222.240.149.21:8081'

    // 请求房屋详情页面
    const res = await rp(`${baseUrl}/floorinfo/${id}`, {
      headers: {
        accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8',
        'cache-control': 'max-age=0',
        'proxy-connection': 'keep-alive',
        'upgrade-insecure-requests': '1',
        cookie:
          'XSRF-TOKEN=eyJpdiI6IkNCTDVJUFRLUy8zcnBua1U0ZlRHS2c9PSIsInZhbHVlIjoidCtINWZ4NlFrL09IRittMmg4R3NzcFVCUHFrYUs2NWVFTHJCa05MRm1FYTJJUmR2ZVN3UXJRUUx4alJEb3M1MU1sZEcwODNneWRqMzBMU3ZKVjNWZ0FTNDYvdVFVZkoxY2U0L1RUeUN4U1h4RVNqQkJlVHFYQ3NwWU5uRTBXazciLCJtYWMiOiI2YTFmZTdmYmU0ZDQ5NDg3YmVjZTRjNzdjYzgwNTkwODI4YjMyNGNjZmJmOTdlYmE0ZTVkMDY3NTRmMjY2ZDFkIn0%3D; laravel_session=eyJpdiI6Iko0UUtnd1ZyY0luUVJyUkxBa2VVWGc9PSIsInZhbHVlIjoiRWhMTllPRGt0VEtSZkJTTVZ1RFVVVDdidlhtcXZpUm14UkQvZG9DbUE4dy9hbXRjYldRL2Z3MmxJYlc1aTFLcEYrUlA0TGxJbmVwTldmN3JSQ3hJZDB2UFpKYkZMb2F3N01QMXQyTFZlL3JBVllBbmI0aXRLbVVMQ0kyMElyWDAiLCJtYWMiOiIxNGM0OTc4NzdjZGEwMjA1YmUxMjYwOGM2YjkyY2U3N2U3MjgzN2MzZmZjNjFiYzU5YjFmZGE0ZTNlYzg3OWI4In0%3D',
      },
      referrerPolicy: 'strict-origin-when-cross-origin',
      body: null,
      method: 'GET',
      mode: 'cors',
      timeout: 10000, // 10秒超时
    })

    // 解析HTML内容
    const $ = cheerio.load(res)
    const $trs = $('.hs_xqxx table tr')

    // 提取标题
    data.w = $trs.eq(0).children('th').text().trim()

    // 提取左列数据
    leftCol.forEach((item, index) => {
      data[item] = $trs
        .eq(index + 1)
        .children('td')
        .eq(1)
        .text()
        .trim()
    })

    // 提取右列数据
    rightCol.forEach((item, index) => {
      data[item] = $trs
        .eq(index + 1)
        .children('td')
        .eq(3)
        .text()
        .trim()
    })

    // 提取最后一列数据
    data[lastCol[0]] = $trs
      .eq($trs.length - 1)
      .children('td')
      .eq(1)
      .text()
      .trim()

    // 检查是否已存在数据
    const oldData = await rp(`http://localhost:8899/houseInfoList?v=${id}`, {
      json: true,
      timeout: 5000,
    })

    if (oldData.count > 0) {
      // 更新现有数据
      const result = await rp({
        method: 'PUT',
        url: `http://localhost:8899/houseInfoList/${oldData.rows[0].id}`,
        headers: {
          'cache-control': 'no-cache',
          'content-type': 'application/json',
        },
        body: data,
        json: true,
        timeout: 5000,
      })

      console.log(`成功更新房屋 ${id} 的信息`)
    } else {
      // 创建新数据
      const result = await rp({
        method: 'POST',
        url: 'http://localhost:8899/houseInfoList',
        headers: {
          'cache-control': 'no-cache',
          'content-type': 'application/json',
        },
        body: data,
        json: true,
        timeout: 5000,
      })

      console.log(`成功创建房屋 ${id} 的信息`)
    }

    return data
  } catch (error) {
    console.error(`爬取房屋 ${id} 信息失败:`, error.message)
    throw error
  }
}
