const houseChildrenInfo = require('./houseChildrenInfo')
const houseChildren = require('./houseChildren')
const houseInfoList = require('./houseInfoList')

module.exports = async (id) => {
  await houseInfoList(id)
  const data = await houseChildren(id)
  // console.log(data)
  if (data && data.length) {
    let i = 0
    while (i < data.length) {
      await houseChildrenInfo(id, data[i].i)
      i++
      console.log('查询楼栋每户信息', i)
    }
  }
}
