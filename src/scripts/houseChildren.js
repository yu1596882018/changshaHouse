/**
 * 房屋子表数据爬取脚本
 * 从住建局官网获取房屋子表数据
 */
const cheerio = require('cheerio')
const rp = require('request-promise')

// 定义属性名称数组
const attrNames = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

/**
 * 爬取房屋子表数据
 * @param {string} id 房屋ID
 * @returns {Promise<Array>} 房屋子表数据数组
 */
module.exports = async (id) => {
  try {
    // 验证参数
    if (!id) {
      throw new Error('房屋ID不能为空')
    }

    const datas = []
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
    const $trs = $('.hs_table > table > tbody > tr:not(.hs_table1)')

    // 提取表格数据
    $trs.each((index, element) => {
      if (index !== 0) { // 跳过表头行
        const $tds = $(element).children('td')
        const onclickValue = $(element).children('td.hs_zk').attr('onclick')
        const iMatch = onclickValue && onclickValue.match(/javascript:hsjajx\('(\w+)',\d+\)/)

        const data = {
          i: iMatch ? iMatch[1] : null,
        }

        // 提取每个属性值
        attrNames.forEach((item, index) => {
          data[item] = $tds.eq(index).text().trim()
        })

        datas.push(data)
      }
    })

    // 清空现有数据
    await rp({
      method: 'DELETE',
      url: `http://localhost:8899/houseChildren/${id}`,
      timeout: 5000,
    })

    // 批量创建新数据
    const result = await rp({
      method: 'POST',
      url: `http://localhost:8899/houseChildren/${id}/bulkCreate`,
      headers: {
        'cache-control': 'no-cache',
        'content-type': 'application/json',
      },
      body: {
        data: datas,
      },
      json: true,
      timeout: 10000,
    })

    console.log(`成功爬取房屋 ${id} 的子表数据，共 ${datas.length} 条记录`)
    return datas
  } catch (error) {
    console.error(`爬取房屋 ${id} 子表数据失败:`, error.message)
    throw error
  }
}

