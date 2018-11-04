var md5 = require('../../../utils/md5.js')
var http = require('../../../utils/http.js')
var util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  requestData: {
    app_id: '2109032063',
    time_stamp: '',
    nonce_str: '',
    sign: ''
  },
  shibie:function(){
    this.requestData.time_stamp = Math.round(new Date().getTime() / 1000)
    .toString();
    console.log(" this.data.time_stamp", this.requestData.time_stamp)
    this.requestData.nonce_str = util.generateRandomString(24)
    console.log("nonce_str", this.requestData.nonce_str)
    var id = util.generateRandomString(24)
    
    var url ="http://ai.qq.com/testdata/test_evilaudio.mp3"
    var map = new Map();
    map.set("app_id", this.requestData.app_id)
    map.set("time_stamp", this.requestData.time_stamp)
    map.set("nonce_str", this.requestData.nonce_str)
    map.set("speech_id", id)
    map.set("speech_url", encodeURIComponent(url))
    console.log("map====", map)
    var md5Param = util.signTengxunAI(map)
    console.log(" console.log(md5Param)", md5Param)
    this.requestData.sign = md5Param
    var that = this
    http.req('https://api.ai.qq.com', '/fcgi-bin/aai/aai_evilaudio', {
      app_id: this.requestData.app_id,
      time_stamp: this.requestData.time_stamp,
      nonce_str: this.requestData.nonce_str,
      speech_id: id,
      speech_url: url,
      sign: md5Param 
    }, function (res) {
      console.log("res", res)
      that.setData({
        content: JSON.stringify(res.data)
      })
    })
  },
  onLoad: function (options) {
    
  }
})