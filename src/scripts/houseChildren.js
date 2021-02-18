const cheerio = require('cheerio')
const rp = require('request-promise')

const attrNames = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

module.exports = (id) => {
  const datas = []

  rp('http://222.240.149.21:8081/floorinfo/' + id, {
    headers: {
      accept:
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
      'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8',
      'cache-control': 'max-age=0',
      'proxy-connection': 'keep-alive',
      'upgrade-insecure-requests': '1',
      cookie:
        'XSRF-TOKEN=eyJpdiI6IlRRYnRjMktTa2ZLOEpXaEVUVWlSWVE9PSIsInZhbHVlIjoialkzS3NQOFN3MmVNTUZrWk5IeXZabVVBSDlXaytIRThHSWlTaEdXNjVnR3ZPN3RWL2Rhcng4VUUzTjJIQU1zSkVGZHVMUHBkUnU0czJwRTZLSmZJWlB5Z2UrY2pqbi85b29wWXpPVFg0QlI0OE1sclE5WTBMYm9OUEhQVzF1WkciLCJtYWMiOiI1YzdkNWE4M2IwODMwYzg1MDgzNjU3YjdhNTg3Yzc0YzQyMTMxZGMwYjA0OWUzZGZlZGQ5MGI4N2YxMzRjM2FmIn0%3D; laravel_session=eyJpdiI6IllnOU9tSXZxQ1hKZzNaZCs4R3lzV3c9PSIsInZhbHVlIjoiOXVFWnNiZWNlZjMvMnMxNFhOSXNSODdTUnBaS1d4cDdnZ05LWWxCTnZCYjMwL09vdHRQd2pFQUFKT2RpVHBSRTNHUE1zcmt1SDJlTWpWWGFGWDZuQTNxVTRuekQrMDVWVHkxQ1dSdG1FNHl3TE1zM3ZlZlo5SnRMaW9oa2NRNksiLCJtYWMiOiJkZGVkMGQ4MmJjZWJmN2M0N2FmNjc3YzVjYTIzMGEwOWI0ZDk2Mjc3MzBiMjcwYmVmYmY0ZjEyMTBlNTk0ZjA2In0%3D',
    },
    referrerPolicy: 'strict-origin-when-cross-origin',
    body: null,
    method: 'GET',
    mode: 'cors',
  })
    .then(async (res) => {
      // console.log('res', res)
      const $ = cheerio.load(res)
      const $trs = $('.hs_table > table > tbody > tr:not(.hs_table1)')
      // console.log('trs', $trs.length)

      $trs.each((index, element) => {
        if (index !== 0) {
          const $tds = $(element).children('td')

          const data = {
            i: id + '_' + $tds.eq(1).text(),
          }

          attrNames.forEach((item, index) => {
            data[item] = $tds.eq(index).text()
          })
          datas.push(data)
        }
      })

      // console.log(datas)
      await rp({
        method: 'DELETE',
        url: 'http://localhost:8899/houseChildren/' + id,
      })

      const result = await rp({
        method: 'POST',
        url: 'http://localhost:8899/houseChildren/' + id + '/bulkCreate',
        headers: {
          'cache-control': 'no-cache',
          'content-type': 'application/json',
        },
        body: {
          data: datas,
        },
        json: true,
      })

      console.log('success - houseChildren - POST', result)
    })
    .catch((err) => {
      console.log('err', err)
    })
}
