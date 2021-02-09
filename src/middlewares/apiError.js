class ApiError extends Error {
  constructor(error, ctx, message) {
    console.trace()
    super()
    this.code = error.code
    this.name = error.name
    if (message) {
      this.message = message
    } else {
      this.message = ctx.__(error.name)
    }
    console.log(`error:${this.code}, msg:${this.message}`)
  }
}

ApiError.Error404NotFound = { code: 404, name: 'not found' }
ApiError.Error403Forbidden = { code: 403, name: 'forbidden' }
ApiError.Error401UnAuthorized = { code: 401, name: 'un authorized' }
ApiError.Error400BadRequest = { code: 400, name: 'bad request' }
ApiError.Error511SomeError = { code: 511, name: 'server some error' }
ApiError.Error512CheckFail = { code: 512, name: 'check fail' }
ApiError.Error409CheckFail = { code: 409, name: ' conflict' }

ApiError.ErrorForWrongParameter = (parameterName, ctx) => {
  return new ApiError(ApiError.Error400BadRequest, ctx, `The value of the parameter ${parameterName} is wrong`)
}

ApiError.ErrorForNeedParameter = (parameterName, ctx) => {
  return new ApiError(ApiError.Error400BadRequest, ctx, `The parameter ${parameterName} is need`)
}

module.exports = ApiError
