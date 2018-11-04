//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    grids: [{
      id: 'ocr',
      name: 'OCR',
    }, {
      id: 'face',
      name: '人脸识别',
    }, {
      id: 'ptu',
      name: '图片特效',
    }, {
        id: 'imageVision',
      name: '图片识别',
    }, {
        id: 'imageVision',
      name: '敏感信息审核',
    }, {
      id: 'nlp',
      name: '智能闲聊',
    }, {
      id: 'nlp',
      name: '机器翻译',
    }, {
      id: 'nlp',
      name: '基础文本分析',
    }, {
      id: 'nlp',
      name: '语义解析',
    }, {
      id: 'asr',
      name: '语音识别',
    }, {
      id: 'tts',
      name: '语音合成',
    }]
  },

  onLoad: function() {

  },

  open: function(e) {
    console.log(e)
    var id = e.target.dataset.grid.id
    wx.navigateTo({
      url: '../tengxun/'+id,
    })
  }
})