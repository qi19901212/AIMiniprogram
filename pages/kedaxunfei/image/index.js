//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    grids: [{
      id: 'aaiAsr',
      name: '语音听写',
    }, {
      id: 'aaiAsrs',
      name: '实时语音转写',
    }, {
      id: 'aaiWxasrs',
      name: '歌曲识别',
    }, {
      id: 'aaiWxasrlong',
      name: '语音合成',
    }, {
      id: 'aaiDsssetectkeyword',
      name: '语音评测',
    }, {
      id: 'aaiDsssetectkeyword',
      name: 'AI客服平台能力中间件',
    }]
  },

  onLoad: function () {

  },

  open: function (e) {
    console.log(e)
    var id = e.target.dataset.grid.id
    wx.navigateTo({
      url: '../tengxun/asr/' + id,
    })
  }
})