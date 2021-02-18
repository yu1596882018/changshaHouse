const cheerio = require('cheerio')
const rp = require('request-promise')

const attrNames = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']

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
        'XSRF-TOKEN=eyJpdiI6IktkcHVIWnMxdzIyZk10WXcrSE9IN1E9PSIsInZhbHVlIjoiMGE0eURIbjVJTUVsbFQ5QzdXWm5UalY1eFVCNkJ6Y3VpK3NiRWoyUzZzZVcrMFBSd005d0FUd0R0VWFlMUwzVTRYTHViRHNBalQxTHo3dWU0RjJ0UEl0WEQwNUhpbno0S2thZGorajNGZ0hFNEZQN1l4bzc1S3M1blM1N0Q3WmYiLCJtYWMiOiI0YjFmNTdmNDM3MDJlOTYzMTM1N2Y2YzRhNzNhY2NjY2U1NzM3OTgzMTQzOGM4MjU2ODk3M2I0MzkxZDhjMjg1In0%3D; laravel_session=eyJpdiI6IjFGUkUxcHFmK0U2N3Y1Y3E1dzhQekE9PSIsInZhbHVlIjoielZyalhkNW5ydi8vUStpQkJkcGJ2RnVGZndZeHl2SXNWdm80NkZuZ0NmMW1sUVZ3RDlwT3dhMjVsYlFXNG9MeE1EYk1CVDFjSVplc1d6STMrejVwRjRTelpsN200S1pwemRFbEtBNDh2Ymt4dHF0MlpZdFlyTGN2YllFNDdmZE4iLCJtYWMiOiI1ZGQzZDYzNjFlOWVmOGZmMTBjOTI0MTViODE3ZTk0YmQ4YTRlMjU0YmE0OWNjMjk1NDI2NTM2ZjdiYjc4ZGVjIn0%3D',
    },
    referrer: 'http://222.240.149.21:8081/floorinfo/' + id,
    referrerPolicy: 'strict-origin-when-cross-origin',
    body: `ywzh=${tableId}&n=1`,
    method: 'POST',
    mode: 'cors',
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

  console.log('success - houseChildrenInfo - POST', result)
  return datas
}
