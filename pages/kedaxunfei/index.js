//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    grids: [{
      id: 'voice',
      name: '语音',
    }, {
      id: 'ocr',
      name: 'OCR',
    }, {
      id: 'face',
      name: '人脸识别',
    }, {
      id: 'filter',
      name: '内容审核',
    }, {
      id: 'ltp',
      name: '自然语言处理',
    }, {
      id: 'image',
      name: '图像识别',
    }]
  },

  onLoad: function () {

  },

  open: function (e) {
    console.log(e)
    var id = e.target.dataset.grid.id
    wx.navigateTo({
      url: '../kedaxunfei/' + id+'/index',
    })
  }
})