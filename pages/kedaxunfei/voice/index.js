//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    grids: [{
      id: 'iat',
      name: '语音听写',
    }, {
      id: 'AA',
        name: '(暂未实现)实时语音转写',
    }, {
        id: 'qbh',
        name: '歌曲识别',
    }, {
        id: 'tts',
        name: '语音合成',
    }, {
        id: 'ise',
        name: '语音评测',
      }, {
        id: 'BB',
        name: '（暂未实现）AI客服平台能力中间件',
      }]
  },

  onLoad: function () {

  },

  open: function (e) {
    console.log(e)
    var id = e.target.dataset.grid.id
    wx.navigateTo({
      url: '../../kedaxunfei/voice/' + id,
    })
  }
})