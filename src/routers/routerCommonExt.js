/**
 * 注册基本增、删、改、查路由
 * @param router
 * @param cont
 * @param path
 */
module.exports = (router, cont, path) => {
  router.post(`${path}`, cont.addCont)

  router.delete(`${path}/:id`, cont.deleteCont)

  router.put(`${path}/:id`, cont.updateCont)

  router.patch(`${path}/:id`, cont.patchCont)

  router.get(`${path}/:id`, cont.queryOneCont)

  router.get(`${path}`, cont.queryAllCont)
}
