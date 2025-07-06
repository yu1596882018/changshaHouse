/**
 * 通用路由扩展
 * 注册基本的增、删、改、查路由
 * @param {Object} router Koa路由实例
 * @param {Object} cont 控制器对象
 * @param {string} path 路由路径
 */
module.exports = (router, cont, path) => {
  // 创建记录
  router.post(`${path}`, cont.addCont);

  // 删除记录
  router.delete(`${path}/:id`, cont.deleteCont);

  // 全量更新记录
  router.put(`${path}/:id`, cont.updateCont);

  // 部分更新记录
  router.patch(`${path}/:id`, cont.patchCont);

  // 查询单条记录
  router.get(`${path}/:id`, cont.queryOneCont);

  // 查询所有记录（分页）
  router.get(`${path}`, cont.queryAllCont);
};
