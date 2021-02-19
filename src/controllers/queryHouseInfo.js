const rp = require('request-promise')
const cheerio = require('cheerio')
const houseMain = require('./../scripts/houseMain')

module.exports = {
  getCodeImg: async (ctx, next) => {
    ctx.set('Content-Type', 'image/png')
    const imgRes = await rp('http://www.cszjxx.net/newCaptcha?r=0.06862258436116475', {
      headers: {
        accept: 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8',
        'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8',
        'proxy-connection': 'keep-alive',
        cookie:
          'XSRF-TOKEN=eyJpdiI6IkxDek5UQzBXRXR5dzJhYUtGSnIxR1E9PSIsInZhbHVlIjoiUmptcmtzSlQxMHk4VkdKTlFOUTBhTEZBN2V4a3RXVm94MzJcLytsVE9tcHliZnBvUU5Jbm82VmR1K1h2SFo3VUlseTJ2NEQ1cW5kNDVLTFdFUm5OVVlBPT0iLCJtYWMiOiI4ZTMwYzMwYWZkMjhjNGZiM2YwYjliOWM2YmViYjgxNmQxN2NlMDkyODBiZDI4ZjA4YzYzNWIyMzFjZjZmNDQ0In0%3D; laravel_session=eyJpdiI6IlY2ZDVNUWJxWXFqM2JNYTZ5bGRsTEE9PSIsInZhbHVlIjoianhSQVdPOTBZM1wvVEtMUTVycDAxMFR0WG8wKzhnUXpnODZja2dwQWpralo5aVgrVjM0NUU0blNtYzlkZkpxcTJWZjVCYW91bEVNU3NlVW9tUGJoMXFRPT0iLCJtYWMiOiI5NzkxMzViYmU2NmUzMmM1NTJkNmE1NzcxZjBkNzk0M2RjMmZjZWQzMTQwOTM3MjI1NmE1NzQ2MGM3MmJlNDQxIn0%3D',
      },
      referrer: 'http://www.cszjxx.net/preselllicence',
      referrerPolicy: 'strict-origin-when-cross-origin',
      body: null,
      method: 'GET',
      mode: 'cors',
      encoding: null,
      jar: true,
    })

    ctx.body = imgRes
  },
  verifyCode: async (ctx, next) => {
    const result = await rp('http://www.cszjxx.net/preselllicence', {
      headers: {
        accept: 'application/json, text/javascript, */*; q=0.01',
        'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8',
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'proxy-connection': 'keep-alive',
        'x-requested-with': 'XMLHttpRequest',
        cookie:
          'XSRF-TOKEN=eyJpdiI6ImJXXC9yV1c0ejFFc21mUHV3ayt0V3lRPT0iLCJ2YWx1ZSI6IkFJcTVnbkRxbXJHc0N1RVhQZGJrYTNKd2tzdk5jTU9pSnBBaGU4MXBRd1E1TU1oTU1ObllpbzJYa3MzSUt6QXRZTVRrVk9WQ1VzQk9VQUh1emt6YnpRPT0iLCJtYWMiOiIyMTM0Y2EwNzY4YjQyZWZlN2UxYzQ3Y2VlM2RiMzljOGM0MGNmN2U1ZmZlYTdlNTZlOWY5MmZjZmM5ZDZmNjJjIn0%3D; laravel_session=eyJpdiI6IkRjTGRMVGdmMThnV0ZsZDZNcWxhRGc9PSIsInZhbHVlIjoiQmd2QVQyZ290blpvdUl3cjZVY1RsTGlDbmJvZXRrTlErRTRxcHdzUUxUSExWdTBnS090ZCtDREhnR3RpVkQ5NWp4ZFNJeTNhUEl3dCtBN1hycWVOelE9PSIsIm1hYyI6IjEyYzYwMTNlZmQ2OTYxZjg1ZjMxYmEwMjY1YjI1ODQ4NDc4ODI1MzI1OWJmMTIxODM1MDY1YWNlZTE3MWZiMDQifQ%3D%3D',
      },
      referrer: 'http://www.cszjxx.net/preselllicence',
      referrerPolicy: 'strict-origin-when-cross-origin',
      body:
        'area=cs&yszh=' +
        ctx.request.body.yszh +
        '&_token=tm1eAIHzwRjCTxIQdpZEck38ahYnKATG7hFD6doZ&ismobile=0&xmmc=&verify_code=' +
        ctx.request.body.verify_code,
      method: 'POST',
      mode: 'cors',
      json: true,
      jar: true,
    })

    ctx.body = result

    if (result.status === '1') {
      const $ = cheerio.load(eval("'" + result.content + "'"))
      const $a = $('a')
      const hrefValue = $a.attr('href')
      const iMatch = hrefValue && hrefValue.match(/\S+floorinfo\/(\w+)/)

      const id = iMatch ? iMatch[1] : null
      houseMain(id)
    }
  },
}
