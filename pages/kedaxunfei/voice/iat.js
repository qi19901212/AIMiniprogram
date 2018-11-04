var md5 = require('../../../utils/md5.js')
var http= require('../../../utils/http.js')
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
    
    var param = { "engine_type": "sms16k", "aue": "raw" }
    var xParam = new util.Base64().encode(JSON.stringify(param))
    console.log("JSON.stringify(param)==", JSON.stringify(param))
    console.log("xParam==", xParam)
    var that = this
    http.xunfeiReq('iat',  {
      audio: encodeURIComponent(base64),
    }, xParam, "3382a3716e4d7cd5a7cf8d51197df56b",function (res) {
      wx.hideLoading()
      console.log("res==", res)
      that.setData({
        content: JSON.stringify(res.data.data)
      })
    }, 'post')
  }
})