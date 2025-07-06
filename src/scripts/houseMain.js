const houseChildrenInfo = require('./houseChildrenInfo')
const houseChildren = require('./houseChildren')
const houseInfoList = require('./houseInfoList')
const config = require('../config')

/**
 * 房源信息收集主函数
 * @param {string} id 房源ID
 * @returns {Promise<void>}
 */
module.exports = async (id) => {
  try {
    console.log(`🏠 开始收集房源 ${id} 的信息...`)
    
    // 第一步：获取房源基本信息
    console.log('📋 获取房源基本信息...')
    await houseInfoList(id)
    
    // 第二步：获取楼栋信息
    console.log('🏢 获取楼栋信息...')
    const buildingData = await houseChildren(id)
    
    if (!buildingData || !buildingData.length) {
      console.log('⚠️  未找到楼栋信息')
      return
    }
    
    console.log(`📊 找到 ${buildingData.length} 个楼栋`)
    
    // 第三步：获取每个楼栋的详细信息
    const errorList = []
    
    for (let i = 0; i < buildingData.length; i++) {
      const building = buildingData[i]
      try {
        console.log(`🏗️  处理第 ${i + 1}/${buildingData.length} 个楼栋: ${building.i}`)
        await houseChildrenInfo(id, building.i)
        
        // 添加延迟避免请求过于频繁
        if (i < buildingData.length - 1) {
          await delay(config.crawler.delay)
        }
      } catch (error) {
        console.error(`❌ 楼栋 ${building.i} 处理失败:`, error.message)
        errorList.push(building.i)
      }
    }
    
    // 第四步：重试失败的楼栋
    if (errorList.length > 0) {
      console.log(`🔄 开始重试 ${errorList.length} 个失败的楼栋...`)
      
      for (let i = 0; i < errorList.length; i++) {
        const buildingId = errorList[i]
        try {
          console.log(`🔄 重试第 ${i + 1}/${errorList.length} 个楼栋: ${buildingId}`)
          await houseChildrenInfo(id, buildingId)
          
          // 添加延迟避免请求过于频繁
          if (i < errorList.length - 1) {
            await delay(config.crawler.delay)
          }
        } catch (error) {
          console.error(`❌ 楼栋 ${buildingId} 重试失败:`, error.message)
        }
      }
    }
    
    console.log(`✅ 房源 ${id} 信息收集完成！`)
    console.log(`📈 成功处理: ${buildingData.length - errorList.length} 个楼栋`)
    if (errorList.length > 0) {
      console.log(`❌ 失败楼栋: ${errorList.length} 个`)
    }
    
  } catch (error) {
    console.error(`�� 房源 ${id} 信息收集过程中发生错误:`, error.message)
    throw error
  }
}

/**
 * 延迟函数
 * @param {number} ms 延迟毫秒数
 * @returns {Promise} 延迟Promise
 */
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
