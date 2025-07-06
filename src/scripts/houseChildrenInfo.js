/**
 * 房屋子表信息数据爬取脚本
 * 从住建局官网获取房屋子表详细信息
 */
const cheerio = require('cheerio')
const rp = require('request-promise')

// 定义属性名称数组
const attrNames = ['a', 'b', 'c', 'd', 'f', 'g', 'h', 'i']

module.exports = async (id, tableId) => {
  const datas = []

  const res = await rp('http://222.240.149.21:8081/hslist', {
    headers: {
      accept: 'application/json, text/javascript, */*; q=0.01',
      'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8',
      'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'proxy-connection': 'keep-alive',
      'x-requested-with': 'XMLHttpRequest',
      cookie:
        'XSRF-TOKEN=eyJpdiI6IkNCTDVJUFRLUy8zcnBua1U0ZlRHS2c9PSIsInZhbHVlIjoidCtINWZ4NlFrL09IRittMmg4R3NzcFVCUHFrYUs2NWVFTHJCa05MRm1FYTJJUmR2ZVN3UXJRUUx4alJEb3M1MU1sZEcwODNneWRqMzBMU3ZKVjNWZ0FTNDYvdVFVZkoxY2U0L1RUeUN4U1h4RVNqQkJlVHFYQ3NwWU5uRTBXazciLCJtYWMiOiI2YTFmZTdmYmU0ZDQ5NDg3YmVjZTRjNzdjYzgwNTkwODI4YjMyNGNjZmJmOTdlYmE0ZTVkMDY3NTRmMjY2ZDFkIn0%3D; laravel_session=eyJpdiI6Iko0UUtnd1ZyY0luUVJyUkxBa2VVWGc9PSIsInZhbHVlIjoiRWhMTllPRGt0VEtSZkJTTVZ1RFVVVDdidlhtcXZpUm14UkQvZG9DbUE4dy9hbXRjYldRL2Z3MmxJYlc1aTFLcEYrUlA0TGxJbmVwTldmN3JSQ3hJZDB2UFpKYkZMb2F3N01QMXQyTFZlL3JBVllBbmI0aXRLbVVMQ0kyMElyWDAiLCJtYWMiOiIxNGM0OTc4NzdjZGEwMjA1YmUxMjYwOGM2YjkyY2U3N2U3MjgzN2MzZmZjNjFiYzU5YjFmZGE0ZTNlYzg3OWI4In0%3D',
    },
    referrer: 'http://222.240.149.21:8081/floorinfo/' + id,
    referrerPolicy: 'strict-origin-when-cross-origin',
    body: `ywzh=${tableId}&n=1`,
    method: 'POST',
    mode: 'cors',
    timeout: 3000,
  })
  // console.log('res', res)
  const $ = cheerio.load(`<table>${eval("'" + res + "'")}</table>`)
  const $trs = $('tr')
  // console.log('trs', $trs.length)

  $trs.each((index, element) => {
    if (index !== 0) {
      const $tds = $(element).children('td')
      const data = {}
      attrNames.forEach((item, index) => {
        data[item] = $tds.eq(index).text()
      })
      datas.push(data)
    }
  })

  // console.log(datas)
  await rp({
    method: 'DELETE',
    url: 'http://localhost:8899/houseChildrenInfo/' + id + '_' + tableId,
  })

  const result = await rp({
    method: 'POST',
    url: 'http://localhost:8899/houseChildrenInfo/' + id + '_' + tableId + '/bulkCreate',
    headers: {
      'cache-control': 'no-cache',
      'content-type': 'application/json',
    },
    body: {
      data: datas,
    },
    json: true,
  })

  const data = {
    j: datas.length,
    k: datas.filter((item) => item.i === '已售').length,
    l: datas.filter((item) => item.i === '可售').length,
  }

  const houseChildrenRes = await rp({
    url: 'http://localhost:8899/houseChildren/' + id + '?i=' + tableId,
    headers: {
      'cache-control': 'no-cache',
      'content-type': 'application/json',
    },
    json: true,
  })

  await rp({
    method: 'patch',
    url: 'http://localhost:8899/houseChildren/' + id + '/' + houseChildrenRes.rows[0].id,
    headers: {
      'cache-control': 'no-cache',
      'content-type': 'application/json',
    },
    body: data,
    json: true,
  })

  // console.log('success - houseChildrenInfo - POST', result)
  return datas
}
