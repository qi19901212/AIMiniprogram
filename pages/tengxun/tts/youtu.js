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
    model_type: 0,
    text: '',
    speed: 0,
    sign: ''
  },
  formSubmit: function (e) {
    wx.showLoading({
      title: '正在加载中....',
    })
    this.requestData.text = e.detail.value.content
    console.log("this.requestData.text", this.requestData.text)
    this.requestData.time_stamp = Math.round(new Date().getTime() / 1000).toString();
    this.requestData.nonce_str = util.generateRandomString(24)

    var etime_stamp = this.requestData.time_stamp
    var enonce_str = encodeURI(this.requestData.nonce_str)
    var etext = encodeURI(this.requestData.text)

    var map = new Map();
    map.set("app_id", this.requestData.app_id)
    map.set("time_stamp", this.requestData.time_stamp)
    map.set("nonce_str", this.requestData.nonce_str)
    map.set("model_type", this.requestData.model_type)
    map.set("speed", this.requestData.speed)
    map.set("text", etext)
    var md5Param = util.signTengxunAI(map)
    this.requestData.sign = md5Param
    var that = this
    http.req('https://api.ai.qq.com', '/fcgi-bin/aai/aai_tta', {
      app_id: this.requestData.app_id,
      time_stamp: this.requestData.time_stamp,
      nonce_str: this.requestData.nonce_str,
      speaker: this.requestData.speaker,
      format: this.requestData.format,
      volume: this.requestData.volume,
      speed: this.requestData.speed,
      text: this.requestData.text,
      aht: this.requestData.aht,
      apc: this.requestData.apc,
      sign: md5Param
    }, function (res) {
      var systemManager = wx.getFileSystemManager();
      var randomName = util.generateRandomString(12)
      var pathMp3 = wx.env.USER_DATA_PATH + "/mp3/" + randomName + ".mp4"
      var cloudPath = 'mp3/' + randomName + ".mp3"
      systemManager.writeFile({
        filePath: pathMp3,
        data: res.data.data.voice,
        encoding: 'base64',
        success: res => {
          wx.cloud.uploadFile({
            cloudPath: cloudPath,
            filePath: pathMp3, // 小程序临时文件路径
            success: res => {
              wx.cloud.getTempFileURL({
                fileList: [res.fileID],
                success: res => {
                  wx.hideLoading()
                  var audioManager = wx.getBackgroundAudioManager()
                  audioManager.src = res.fileList[0].tempFileURL
                  audioManager.play()
                },
                fail: res => {
                  // console.log("temptempfail", res)
                }
              })
            },
            fail: err => {
              console.log("22222222222", err)
            }
          })

        },
        fail: res => {
          console.log("failfailfail===", res)
        },
        complete: res => {
          console.log("complete===", res)
        }
      })
    })
  },
  onLoad: function (options) { }
})