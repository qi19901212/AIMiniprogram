var md5 = require('../../../utils/md5.js')
var http = require('../../../utils/http.js')
var util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: ''
  },
  requestData: {
    app_id: 2109032063,
    time_stamp: 0,
    nonce_str: '',
    image: '',
    sign: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  chooseImage: function () {
    var that = this
    wx.showLoading({
      title: '正在加载中...',
    })
    console.log("tempFilePath==AAAAAAAAAAAA")
    wx.startRecord({
      success(res) {
        var tempFilePath = res.tempFilePath
        console.log("tempFilePath==", tempFilePath)
        var fileSystemManger = wx.getFileSystemManager()
        fileSystemManger.readFile({
          filePath: tempFilePath,
          encoding: 'base64',
          success: function (res) {
            that.ocrImage(res.data)
          }
        })
      }
    })
    setTimeout(function () {
      wx.stopRecord() // 结束录音
    }, 30000)
  },
  stopRecord: function () {
    wx.stopRecord() // 结束录音
  },
  ocrImage: function (base64) {
    console.log("base64==", base64)
    this.requestData.time_stamp = Math.round(new Date().getTime() / 1000);
    this.requestData.nonce_str = util.generateRandomString(24)

    var map = new Map();
    map.set("app_id", this.requestData.app_id)
    map.set("time_stamp", this.requestData.time_stamp)
    map.set("nonce_str", this.requestData.nonce_str)
    map.set("format", 3)
    map.set("seq", 0)
    map.set("end", 0)
    map.set("source",'zh')
    map.set("target",'en')
    map.set("session_id", this.requestData.nonce_str)
    map.set("speech_chunk", encodeURIComponent(base64))

    var md5Param = util.signTengxunAI(map)
    this.requestData.sign = md5Param
    var that = this
    http.req('https://api.ai.qq.com', '/fcgi-bin/nlp/nlp_speechtranslate', {
      app_id: this.requestData.app_id,
      time_stamp: this.requestData.time_stamp,
      nonce_str: this.requestData.nonce_str,
      format: 3,
      seq:0,
      end:0,
      source:'zh',
      target:'en',
      speech_chunk: base64,
      session_id: this.requestData.nonce_str,
      sign: md5Param
    }, function (res) {
      wx.hideLoading()
      console.log("res==", JSON.stringify(res.data.data))
      that.setData({
        content: JSON.stringify(res.data.data)
      })
    }, 'post')
  }
})