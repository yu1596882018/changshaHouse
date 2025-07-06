/**
 * API错误类定义
 * 用于统一API错误的处理和抛出
 * @author 长沙房屋查询平台
 * @version 2.0.0
 */
class ApiError extends Error {
  /**
   * 构造API错误
   * @param {Object} error 错误类型对象，包含code和name
   * @param {Object} ctx Koa上下文
   * @param {string} [message] 自定义错误信息
   */
  constructor(error, ctx, message) {
    super();
    this.code = error.code;
    this.name = error.name;
    this.message = message || (ctx && ctx.__(error.name)) || error.name;
    if (process.env.NODE_ENV === 'development') {
      console.trace();
      console.log(`error:${this.code}, msg:${this.message}`);
    }
  }
}

/**
 * 常见API错误类型
 */
ApiError.Error404NotFound = {code: 404, name: 'not found'};
ApiError.Error403Forbidden = {code: 403, name: 'forbidden'};
ApiError.Error401UnAuthorized = {code: 401, name: 'un authorized'};
ApiError.Error400BadRequest = {code: 400, name: 'bad request'};
ApiError.Error511SomeError = {code: 511, name: 'server some error'};
ApiError.Error512CheckFail = {code: 512, name: 'check fail'};
ApiError.Error409CheckFail = {code: 409, name: 'conflict'};

/**
 * 参数错误工厂方法
 * @param {string} parameterName 参数名
 * @param {Object} ctx Koa上下文
 * @returns {ApiError}
 */
ApiError.ErrorForWrongParameter = (parameterName, ctx) => {
  return new ApiError(ApiError.Error400BadRequest, ctx, `参数 ${parameterName} 的值不正确`);
};

/**
 * 缺少参数工厂方法
 * @param {string} parameterName 参数名
 * @param {Object} ctx Koa上下文
 * @returns {ApiError}
 */
ApiError.ErrorForNeedParameter = (parameterName, ctx) => {
  return new ApiError(ApiError.Error400BadRequest, ctx, `缺少必要参数：${parameterName}`);
};

module.exports = ApiError;
