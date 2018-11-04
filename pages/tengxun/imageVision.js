//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    grids: [{
      id: 'terrorism',
      name: '暴恐识别',
    }, {
      id: 'porn',
      name: '智能鉴黄',
    }, {
      id: 'evilaudio',
      name: '音频鉴黄',
    }, {
      id: 'imgtotext',
      name: '看图说话',
    }, {
      id: 'tag',
      name: '多标签识别',
    }, {
      id: 'fuzzy',
      name: '模糊图片检测',
    }, {
      id: 'food',
      name: '美食图片识别',
    }, {
      id: 'scener',
      name: '场景识别',
    }, {
      id: 'objectr',
      name: '物体识别',
    }]
  },

  onLoad: function () {

  },

  open: function (e) {
    console.log(e)
    var id = e.target.dataset.grid.id
    wx.navigateTo({
      url: '../tengxun/imageVision/' + id,
    })
  }
})