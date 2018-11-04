var md5 = require('md5.js')
function req(prefix, url, data, cb, method) {

  for (var Key in data) {
    if (data[Key] === null) {
      delete data[Key];
    }
  }

  wx.request({
    url: prefix + url,
    data: data,
    method: method || 'GET',
    header: {
      "content-type": "application/x-www-form-urlencoded",
      
    },
    success: function (res) {
      return typeof cb == "function" && cb(res)
    },
    fail: function () {
      return typeof cb == "function" && cb(false)
    }
  })
}

function xunfeiReq(url, data,paramBase64,apiKey, cb, method){
  
  for (var Key in data) {
    if (data[Key] === null) {
      delete data[Key];
    }
  }
  var curTime=Math.round(new Date().getTime() / 1000)
  var checkSum = md5.hexMD5(apiKey + curTime + paramBase64)
  wx.request({
    url: "http://api.xfyun.cn/v1/service/v1/" + url,
    data: data,
    method: method || 'GET',
    header: {
      "content-type": "application/x-www-form-urlencoded",
      "X-CurTime": curTime,
      "X-Appid": '5bc80457',
      "X-Param": paramBase64,
      "X-CheckSum": checkSum,
    },
    success: function (res) {
      return typeof cb == "function" && cb(res)
    },
    fail: function () {
      return typeof cb == "function" && cb(false)
    }
  })
}

module.exports = {
  req: req,
  xunfeiReq:xunfeiReq
}