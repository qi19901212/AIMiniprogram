//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    grids: [{
      id: 'ailab',
      name: 'AI Lab',
    }, {
      id: 'youtu',
        name: '优图',
    }]
  },

  onLoad: function () {

  },

  open: function (e) {
    console.log(e)
    var id = e.target.dataset.grid.id
    wx.navigateTo({
      url: '../tengxun/tts/' + id,
    })
  }
})