const cheerio = require('cheerio')
const rp = require('request-promise')

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

module.exports = async (id) => {
  const data = {
    v: id,
  }

  const res = await rp(`http://222.240.149.21:8081/floorinfo/${id}`, {
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
  })
  // console.log('res', res)
  const $ = cheerio.load(res)
  const $trs = $('.hs_xqxx table tr')
  // console.log('trs', $trs.length)

  leftCol.forEach((item, index) => {
    data[item] = $trs
      .eq(index + 1)
      .children('td')
      .eq(1)
      .text()
  })

  rightCol.forEach((item, index) => {
    data[item] = $trs
      .eq(index + 1)
      .children('td')
      .eq(3)
      .text()
  })

  data[lastCol[0]] = $trs
    .eq($trs.length - 1)
    .children('td')
    .eq(1)
    .text()

  // console.log(data)

  const oldData = await rp('http://localhost:8899/houseInfoList?v=' + id, {
    json: true,
  })

  if (oldData.count > 0) {
    const result = await rp({
      method: 'PUT',
      url: 'http://localhost:8899/houseInfoList/' + oldData.rows[0].id,
      headers: {
        'cache-control': 'no-cache',
        'content-type': 'application/json',
      },
      body: data,
      json: true,
    })

    console.log('success - houseInfoList - PUT', result)
  } else {
    const result = await rp({
      method: 'POST',
      url: 'http://localhost:8899/houseInfoList',
      headers: {
        'cache-control': 'no-cache',
        'content-type': 'application/json',
      },
      body: data,
      json: true,
    })

    console.log('success - houseInfoList - POST', result)
  }

  return data
}
