//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    grids: [{
      id: 'ocrIdcardocr',
      name: '身份证OCR',
      mode: 'ocr'
    }, {
      id: 'ocrDriverlicenseocr',
      name: '行驶证驾驶证OCR',
      mode: 'ocr'
    }, {
      id: 'ocrGeneralocr',
      name: '通用OCR',
      mode: 'ocr'
    }, {
      id: 'ocrBizlicenseocr',
      name: '营业执照OCR',
      mode: 'ocr'
    }, {
      id: 'ocrCreditcardocr',
      name: '银行卡OCR',
      mode: 'ocr'
    }, {
      id: 'ocrHandwritingocr',
      name: '手写体OCR',
      mode: 'ocr'
    }, {
      id: 'ocrPlateocr',
      name: '车牌OCR',
      mode: 'ocr'
    }, {
      id: 'ocrBcocr',
      name: '名片OCR',
      mode: 'ocr'
    }]
  },

  onLoad: function() {

  },

  open: function(e) {
    console.log(e)
    var id = e.target.dataset.grid.id
    wx.navigateTo({
      url: '../tengxun/ocr',
    })
  }
})