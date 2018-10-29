var md5 = require('../../../utils/md5.js')
var http = require('../../../utils/http.js')
var util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    files: [],
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
    wx.showLoading({
      title: '正在加载中...',
    })
    var that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        const tempFilePath = res.tempFilePaths[0]
        var fileSize = res.tempFiles[0].size
        if (fileSize / (1024 * 1024) > 1) {
          wx.hideLoading()
          wx.showToast({
            title: '图片大小超过1M',
            icon: 'none'
          })
        }
        that.data.files = [];
        that.data.files.push(tempFilePath)
        that.setData({
          files: that.data.files
        })
        var fileSystemManger = wx.getFileSystemManager()
        fileSystemManger.readFile({
          filePath: tempFilePath,
          encoding: 'base64',
          success: function (res) {

            that.ocrImage(res.data)
          }
        })
      },
    })
  },
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },
  ocrImage: function (base64) {
    this.requestData.time_stamp = Math.round(new Date().getTime() / 1000);
    this.requestData.nonce_str = util.generateRandomString(24)
    var base64Param = encodeURIComponent(base64)
    this.requestData.image = base64Param
    var map = new Map();
    map.set("app_id", this.requestData.app_id)
    map.set("time_stamp", this.requestData.time_stamp)
    map.set("nonce_str", this.requestData.nonce_str)
    map.set("image", this.requestData.image)

    var md5Param = util.signTengxunAI(map)
    this.requestData.sign = md5Param
    var that = this
    http.req('https://api.ai.qq.com', '/fcgi-bin/ocr/ocr_plateocr', {
      app_id: this.requestData.app_id,
      time_stamp: this.requestData.time_stamp,
      nonce_str: this.requestData.nonce_str,
      image: base64,
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