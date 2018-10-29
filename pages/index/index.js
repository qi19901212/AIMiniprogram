//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    grids: [{
      id: 'tengxun',
      name: '腾讯AI'
    }, {
      id: 'kedaxunfei',
      name: '科大讯飞AI'
    }, {
      id: 'baidu',
      name: '百度AI',
      src: ''
    }]
  },

  onLoad: function() {

  },

  open:function(e){
    console.log(e)
   var id= e.target.dataset.grid.id
      wx.navigateTo({
        url: '../' + id +"/index",
      })
  }
})