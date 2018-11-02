var md5 = require('../../../utils/md5.js')
var http = require('../../../utils/http.js')
var util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: ""
  },
  requestData: {
    app_id: '2109032063',
    time_stamp: '',
    nonce_str: '',
    text: '',
    sign: ''
  },
  formSubmit: function (e) {

    this.requestData.text = e.detail.value.content
    console.log("this.requestData.text", this.requestData.text)
    if (this.requestData.text == '' || this.requestData.text == null) {
      wx.showToast({
        title: '请输入内容',
      })
      return
    }
    wx.showLoading({
      title: '正在加载中....',
    })
    this.requestData.time_stamp = Math.round(new Date().getTime() / 1000).toString();
    this.requestData.nonce_str = util.generateRandomString(24)
    var md5Str = md5.hexMD5(Date.now().toString()).toString()
    var map = new Map();
    map.set("app_id", this.requestData.app_id)
    map.set("time_stamp", this.requestData.time_stamp)
    map.set("nonce_str", this.requestData.nonce_str)
    map.set("session", md5Str) 
    map.set("question", encodeURIComponent(this.requestData.text))
    console.log("encodeURIComponent===", encodeURIComponent(this.requestData.text.trim()))
    var md5Param = util.signTengxunAI(map)
    this.requestData.sign = md5Param
    var that = this
    http.req('https://api.ai.qq.com', '/fcgi-bin/nlp/nlp_textchat', {
      app_id: this.requestData.app_id,
      time_stamp: this.requestData.time_stamp,
      nonce_str: this.requestData.nonce_str,
      question: this.requestData.text,
      session: md5Str,
      sign: md5Param
    }, function (res) {
      wx.hideLoading()
      that.setData({
        content: JSON.stringify(res.data)
      })
    })
  },
  onLoad: function (options) { }
})