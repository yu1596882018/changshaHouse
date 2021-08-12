const houseChildrenInfo = require('./houseChildrenInfo')
const houseChildren = require('./houseChildren')
const houseInfoList = require('./houseInfoList')

module.exports = async (id) => {
  await houseInfoList(id)
  const data = await houseChildren(id)
  // console.log(data)
  const errList = []
  if (data && data.length) {
    let i = 0
    while (i < data.length) {
      try {
        await houseChildrenInfo(id, data[i].i)
      } catch (e) {
        errList.push(data[i].i)
        console.error(e)
      }
      i++
      console.log('查询楼栋每户信息', i)
    }
  }

  if (errList && errList.length) {
    let i = 0
    while (i < errList.length) {
      try {
        await houseChildrenInfo(id, errList[i])
      } catch (e) {
        console.error(e)
      }
      i++
      console.log('查询楼栋每户信息', i)
    }
  }
}
