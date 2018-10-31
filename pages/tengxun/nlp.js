//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    grids: [{
      id: 'wordcom',
      name: '意图成分',
    }, {
      id: 'textpolar',
      name: '情感分析',
    }, {
      id: 'wordseg',
      name: '分词',
    }, {
      id: 'wordpos',
      name: '词性',
    }, {
      id: 'wordner',
      name: '专有名词',
    }, {
      id: 'wordsyn',
      name: '同义词',
    }, {
      id: 'texttrans',
      name: '文本翻译（AI Lab）',
    }, {
      id: 'texttranslate',
      name: '文本翻译（翻译君）',
    }, {
      id: 'speechtranslate',
      name: '语音翻译',
    }, {
      id: 'imagetranslate',
      name: '图片翻译',
    }, {
      id: 'textdetect',
      name: '语种识别',
    }]
  },

  onLoad: function() {

  },

  open: function(e) {
    console.log(e)
    var id = e.target.dataset.grid.id
    wx.navigateTo({
      url: '../tengxun/nlp/' + id,
    })
  }
})