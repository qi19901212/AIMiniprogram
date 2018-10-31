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
    map.set("format", 2)
    map.set("speech", encodeURIComponent(base64))
    map.set("rate", 16000)

    var md5Param = util.signTengxunAI(map)
    this.requestData.sign = md5Param
    var that = this
    http.req('https://api.ai.qq.com', '/fcgi-bin/aai/aai_asr', {
      app_id: this.requestData.app_id,
      time_stamp: this.requestData.time_stamp,
      nonce_str: this.requestData.nonce_str,
      format: 2,
      rate: 16000,
      speech: base64,
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