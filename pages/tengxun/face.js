//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    grids: [{
      id: 'faceDetectface',
      name: '人脸检测与分析',
    }, {
        id: 'faceDetectmultiface',
        name: '多人脸检测',
    }, {
        id: 'faceDetectcrossageface',
        name: '跨年龄人脸识别',
    }, {
        id: 'faceFaceshape',
        name: '五官定位',
    }, {
        id: 'faceFacecompare',
        name: '人脸对比',
    }, {
        id: 'faceFaceidentify',
        name: '人脸搜索',
    }, {
        id: 'faceFaceverify',
        name: '人脸验证',
    }]
  },

  onLoad: function () {

  },

  open: function (e) {
    console.log(e)
    var id = e.target.dataset.grid.id
    wx.navigateTo({
      url: '../tengxun/face/' + id,
    })
  }
})