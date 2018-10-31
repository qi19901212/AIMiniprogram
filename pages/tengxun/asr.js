//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    grids: [{
      id: 'aaiAsr',
      name: '语音识别-echo版',
    }, {
        id: 'aaiAsrs',
        name: '语音识别-流式版（AI Lab）',
    }, {
        id: 'aaiWxasrs',
        name: '语音识别-流式版(WeChat AI)',
    }, {
        id: 'aaiWxasrlong',
      name: '长语音识别',
    }, {
        id: 'aaiDsssetectkeyword',
      name: '关键词搜索',
    }]
  },

  onLoad: function() {

  },

  open: function(e) {
    console.log(e)
    var id = e.target.dataset.grid.id
    wx.navigateTo({
      url: '../tengxun/asr/' + id,
    })
  }
})