// 脚本目录
const houseChildrenInfo = require('./houseChildrenInfo')
const houseChildren = require('./houseChildren')
const houseInfoList = require('./houseInfoList');

(async () => {
  await houseInfoList('200904281397')
  const data = await houseChildren('200904281397')
  // console.log(data)
  if (data && data.length) {
    let i = 0
    while (i < data.length) {
      await houseChildrenInfo('200904281397', data[i].i)
      i++
      // console.log('查询楼栋每户信息', i)
    }
  }
})()
