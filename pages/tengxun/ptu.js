//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    grids: [{
      id: 'ptuImgfilter',
      name: '滤镜（天天P图）',
    }, {
        id: 'visionImgfilter',
        name: '滤镜（AI Lab）',
      }, {
        id: 'ptuFacecosmetic',
      name: '人脸美妆',
    }, {
        id: 'ptuFacedecoration',
      name: '人脸变妆',
    }, {
        id: 'ptuFacesticker',
      name: '大头贴',
    }, {
        id: 'ptuFaceage',
        name: '颜龄检测',
    }]
  },

  onLoad: function () {

  },

  open: function (e) {
    console.log(e)
    var id = e.target.dataset.grid.id
    wx.navigateTo({
      url: '../tengxun/ptu/' + id,
    })
  }
})