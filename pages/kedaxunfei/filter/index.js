//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    grids: [{
      id: 'aaiAsr',
      name: '广告过滤',
    }, {
      id: 'aaiAsrs',
        name: '政治人物检查',
    }, {
      id: 'aaiWxasrs',
        name: '暴恐敏感信息过滤',
    }, {
      id: 'aaiWxasrlong',
        name: '色情内容过滤',
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