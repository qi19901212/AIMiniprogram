var md5 = require('../../../utils/md5.js')
var http = require('../../../utils/http.js')
var util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    files: [],
    filesBase64: [],
    content: ''
  },
  requestData: {
    app_id: 2109032063,
    time_stamp: 0,
    nonce_str: '',
    image_a: '',
    image_b: '',
    sign: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  chooseImage: function () {

    var that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        const tempFilePath = res.tempFilePaths[0]
        var fileSize = res.tempFiles[0].size
        console.log("fileSize==", fileSize)
        if (fileSize / (1024 * 1024) > 1) {
          wx.hideLoading()
          wx.showToast({
            title: '图片大小超过1M',
            icon: 'none'
          })
        }
        if (that.data.files.length > 1) {
          that.data.files = [];
          that.data.filesBase64 = [];
        }
        that.data.files.push(tempFilePath)
        that.setData({
          files: that.data.files
        })
        var fileSystemManger = wx.getFileSystemManager()
        fileSystemManger.readFile({
          filePath: tempFilePath,
          encoding: 'base64',
          success: function (res) {
            that.data.filesBase64.push(res.data)
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
  detectcrossageface: function (base64) {
    if (this.data.filesBase64.length != 2) {
      wx.showToast({
        title: '请上传二张图片',
        icon: 'none'
      })
      return
    }
    wx.showLoading({
      title: '正在加载中...',
    })
    this.requestData.time_stamp = Math.round(new Date().getTime() / 1000);
    this.requestData.nonce_str = util.generateRandomString(24)

    var map = new Map();
    map.set("app_id", this.requestData.app_id)
    map.set("time_stamp", this.requestData.time_stamp)
    map.set("nonce_str", this.requestData.nonce_str)
    map.set("image_a", encodeURIComponent(this.data.filesBase64[0]))
    map.set("image_b", encodeURIComponent(this.data.filesBase64[1]))

    var md5Param = util.signTengxunAI(map)
    this.requestData.sign = md5Param
    var that = this
    http.req('https://api.ai.qq.com', '/fcgi-bin/face/face_facecompare', {
      app_id: this.requestData.app_id,
      time_stamp: this.requestData.time_stamp,
      nonce_str: this.requestData.nonce_str,
      image_a: this.data.filesBase64[0],
      image_b: this.data.filesBase64[1],
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