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
        'XSRF-TOKEN=eyJpdiI6IlRRYnRjMktTa2ZLOEpXaEVUVWlSWVE9PSIsInZhbHVlIjoialkzS3NQOFN3MmVNTUZrWk5IeXZabVVBSDlXaytIRThHSWlTaEdXNjVnR3ZPN3RWL2Rhcng4VUUzTjJIQU1zSkVGZHVMUHBkUnU0czJwRTZLSmZJWlB5Z2UrY2pqbi85b29wWXpPVFg0QlI0OE1sclE5WTBMYm9OUEhQVzF1WkciLCJtYWMiOiI1YzdkNWE4M2IwODMwYzg1MDgzNjU3YjdhNTg3Yzc0YzQyMTMxZGMwYjA0OWUzZGZlZGQ5MGI4N2YxMzRjM2FmIn0%3D; laravel_session=eyJpdiI6IllnOU9tSXZxQ1hKZzNaZCs4R3lzV3c9PSIsInZhbHVlIjoiOXVFWnNiZWNlZjMvMnMxNFhOSXNSODdTUnBaS1d4cDdnZ05LWWxCTnZCYjMwL09vdHRQd2pFQUFKT2RpVHBSRTNHUE1zcmt1SDJlTWpWWGFGWDZuQTNxVTRuekQrMDVWVHkxQ1dSdG1FNHl3TE1zM3ZlZlo5SnRMaW9oa2NRNksiLCJtYWMiOiJkZGVkMGQ4MmJjZWJmN2M0N2FmNjc3YzVjYTIzMGEwOWI0ZDk2Mjc3MzBiMjcwYmVmYmY0ZjEyMTBlNTk0ZjA2In0%3D',
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
