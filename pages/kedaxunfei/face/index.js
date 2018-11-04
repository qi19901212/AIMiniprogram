//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    grids: [{
      id: 'aaiAsr',
      name: '人脸比对',
    }, {
      id: 'aaiAsrs',
      name: '人脸水印对比',
    }, {
      id: 'aaiWxasrs',
      name: '静默人体检测',
    }, {
      id: 'aaiWxasrlong',
        name: '表情-人脸特征分析',
    }, {
      id: 'aaiDsssetectkeyword',
        name: '年龄-人脸特征分析',
    }, {
      id: 'aaiDsssetectkeyword',
        name: '性别-人脸特征分析',
      }, {
        id: 'aaiDsssetectkeyword',
        name: '颜值-人脸特征分析',
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