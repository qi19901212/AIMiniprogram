var util = require('../../../utils/util.js')
Page({
  data: {
    files: [],
    filesBase64s: [],
    
  },
  requestData: {
    app_id: 2109032063,
    time_stamp: 0,
    nonce_str: '',
    image: '',
    group_ids: "group0",
    person_id: "person0",
    person_name: "孙悟空",
    face_ids:'2823396744970126187',	
    tag: "AAAA",
    sign: ''
  },
  chooseImage: function() {

    var that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        const tempFilePath = res.tempFilePaths[0]
        var fileSize = res.tempFiles[0].size
        if (fileSize / (1024 * 1024) > 1) {
          wx.hideLoading()
          wx.showToast({
            title: '图片大小超过1M',
            icon: 'none'
          })
        }
        that.data.files = [];
        that.data.filesBase64s = [];
        that.data.files.push(tempFilePath)
        that.setData({
          files: that.data.files
        })
        var fileSystemManger = wx.getFileSystemManager()
        fileSystemManger.readFile({
          filePath: tempFilePath,
          encoding: 'base64',
          success: function(res) {
            that.data.filesBase64s.push(res.data)
            // that.newperson(res.data)
          }
        })
      },
    })
  },
  newperson: function() {
    if (this.data.filesBase64s.length == 0) {
      wx.showToast({
        title: '请上传图片创建个体',
        icon: 'none'
      })
      return
    }
    wx.showLoading({
      title: '正在加载中...',
    })
    var base64 = this.data.filesBase64s[0]
    this.requestData.time_stamp = Math.round(new Date().getTime() / 1000);
    this.requestData.nonce_str = util.generateRandomString(24)
    var base64Param = encodeURIComponent(base64)
    this.requestData.image = base64Param
    var map = new Map();
    map.set("app_id", this.requestData.app_id)
    map.set("time_stamp", this.requestData.time_stamp)
    map.set("nonce_str", this.requestData.nonce_str)
    map.set("image", this.requestData.image)
    map.set("group_ids", this.requestData.group_ids)
    map.set("person_id", this.requestData.person_id)
    map.set("person_name", encodeURIComponent(this.requestData.person_name))
    // map.set("tag", encodeURIComponent(this.requestData.tag))

    var md5Param = util.signTengxunAI(map)
    this.requestData.sign = md5Param
    var that = this
    http.req('https://api.ai.qq.com', '/fcgi-bin/face/face_newperson', {
      app_id: this.requestData.app_id,
      time_stamp: this.requestData.time_stamp,
      nonce_str: this.requestData.nonce_str,
      group_ids: this.requestData.group_ids,
      person_id: this.requestData.person_id,
      person_name: this.requestData.person_name,
      // tag: this.requestData.tag,
      image: base64,
      sign: md5Param
    }, function(res) {
      wx.hideLoading()
      console.log("res==", JSON.stringify(res.data.data))
      that.requestData.face_ids = res.data.data.face_ids
      that.setData({
        content: JSON.stringify(res.data.data)
      })
    }, 'post')
  },
  deletePerson: function() {
    this.requestData.time_stamp = Math.round(new Date().getTime() / 1000);
    this.requestData.nonce_str = util.generateRandomString(24)
    var map = new Map();
    map.set("app_id", this.requestData.app_id)
    map.set("time_stamp", this.requestData.time_stamp)
    map.set("nonce_str", this.requestData.nonce_str)
    map.set("person_id", "person0")

    var md5Param = util.signTengxunAI(map)
    this.requestData.sign = md5Param
    var that = this
    http.req('https://api.ai.qq.com', '/fcgi-bin/face/face_delperson', {
      app_id: this.requestData.app_id,
      time_stamp: this.requestData.time_stamp,
      nonce_str: this.requestData.nonce_str,
      person_id: "person0",
      sign: md5Param
    }, function(res) {
      wx.hideLoading()
      console.log("res==", JSON.stringify(res.data.data))
      that.setData({
        content: JSON.stringify(res.data.data)
      })
    }, 'post')
  },
  addface: function() {
    if (this.data.filesBase64s.length == 0) {
      wx.showToast({
        title: '请上传图片创建个体',
        icon: 'none'
      })
      return
    }
    wx.showLoading({
      title: '正在加载中...',
    })
    var base64 = this.data.filesBase64s[0]
    this.requestData.time_stamp = Math.round(new Date().getTime() / 1000);
    this.requestData.nonce_str = util.generateRandomString(24)
    var base64Param = encodeURIComponent(base64)
    this.requestData.image = base64Param
    var map = new Map();
    map.set("app_id", this.requestData.app_id)
    map.set("time_stamp", this.requestData.time_stamp)
    map.set("nonce_str", this.requestData.nonce_str)
    map.set("images", this.requestData.image)
    map.set("person_id", this.requestData.person_id)
    map.set("tag", encodeURIComponent(this.requestData.tag))

    var md5Param = util.signTengxunAI(map)
    this.requestData.sign = md5Param
    var that = this
    http.req('https://api.ai.qq.com', '/fcgi-bin/face/face_addface', {
      app_id: this.requestData.app_id,
      time_stamp: this.requestData.time_stamp,
      nonce_str: this.requestData.nonce_str,
      person_id: this.requestData.person_id,
      tag:this.requestData.tag,
      images: base64,
      sign: md5Param
    }, function (res) {
      wx.hideLoading()
      console.log("res==", JSON.stringify(res.data.data))
      that.setData({
        content: JSON.stringify(res.data.data)
      })
    }, 'post')
  },
  delface: function() {
    
    wx.showLoading({
      title: '正在加载中...',
    })
    var base64 = this.data.filesBase64s[0]
    this.requestData.time_stamp = Math.round(new Date().getTime() / 1000);
    this.requestData.nonce_str = util.generateRandomString(24)
    var base64Param = encodeURIComponent(base64)
    this.requestData.image = base64Param
    var map = new Map();
    console.log("res==", this.requestData.face_ids)
    map.set("app_id", this.requestData.app_id)
    map.set("time_stamp", this.requestData.time_stamp)
    map.set("nonce_str", this.requestData.nonce_str)
    map.set("face_ids", this.requestData.face_ids)
    map.set("person_id", this.requestData.person_id)

    var md5Param = util.signTengxunAI(map)
    this.requestData.sign = md5Param
    var that = this
    http.req('https://api.ai.qq.com', '/fcgi-bin/face/face_delface', {
      app_id: this.requestData.app_id,
      time_stamp: this.requestData.time_stamp,
      nonce_str: this.requestData.nonce_str,
      face_ids: this.requestData.face_ids,
      person_id: this.requestData.person_id,
      sign: md5Param
    }, function (res) {
      wx.hideLoading()
      console.log("res==", JSON.stringify(res.data.data))
      that.setData({
        content: JSON.stringify(res.data.data)
      })
    }, 'post')
  },
  setinfo: function() {
    wx.showLoading({
      title: '正在加载中...',
    })
    this.requestData.time_stamp = Math.round(new Date().getTime() / 1000);
    this.requestData.nonce_str = util.generateRandomString(24)
    var map = new Map();
    map.set("app_id", this.requestData.app_id)
    map.set("time_stamp", this.requestData.time_stamp)
    map.set("nonce_str", this.requestData.nonce_str)
    map.set("person_id", this.requestData.person_id)
    map.set("person_name", encodeURIComponent(this.requestData.person_name))
    map.set("tag", encodeURIComponent(this.requestData.tag))

    var md5Param = util.signTengxunAI(map)
    this.requestData.sign = md5Param
    var that = this
    http.req('https://api.ai.qq.com', '/fcgi-bin/face/face_setinfo', {
      app_id: this.requestData.app_id,
      time_stamp: this.requestData.time_stamp,
      nonce_str: this.requestData.nonce_str,
      person_id: this.requestData.person_id,
      person_name: this.requestData.person_name,
      tag: this.requestData.tag,
      sign: md5Param
    }, function (res) {
      wx.hideLoading()
      console.log("res==", JSON.stringify(res.data.data))
      that.requestData.face_ids = res.data.data.face_ids
      that.setData({
        content: JSON.stringify(res.data.data)
      })
    }, 'post')
  },
  getinfo: function() {
    wx.showLoading({
      title: '正在加载中...',
    })
    this.requestData.time_stamp = Math.round(new Date().getTime() / 1000);
    this.requestData.nonce_str = util.generateRandomString(24)
    var map = new Map();
    map.set("app_id", this.requestData.app_id)
    map.set("time_stamp", this.requestData.time_stamp)
    map.set("nonce_str", this.requestData.nonce_str)
    map.set("person_id", this.requestData.person_id)

    var md5Param = util.signTengxunAI(map)
    this.requestData.sign = md5Param
    var that = this
    http.req('https://api.ai.qq.com', '/fcgi-bin/face/face_getinfo', {
      app_id: this.requestData.app_id,
      time_stamp: this.requestData.time_stamp,
      nonce_str: this.requestData.nonce_str,
      person_id: this.requestData.person_id,
      sign: md5Param
    }, function (res) {
      wx.hideLoading()
      console.log("res==", JSON.stringify(res.data.data))
      that.requestData.face_ids = res.data.data.face_ids
      that.setData({
        content: JSON.stringify(res.data.data)
      })
    }, 'post')
  },
  getgroupids: function() {
    wx.showLoading({
      title: '正在加载中...',
    })
    this.requestData.time_stamp = Math.round(new Date().getTime() / 1000);
    this.requestData.nonce_str = util.generateRandomString(24)
    var map = new Map();
    map.set("app_id", this.requestData.app_id)
    map.set("time_stamp", this.requestData.time_stamp)
    map.set("nonce_str", this.requestData.nonce_str)

    var md5Param = util.signTengxunAI(map)
    this.requestData.sign = md5Param
    var that = this
    http.req('https://api.ai.qq.com', '/fcgi-bin/face/face_getgroupids', {
      app_id: this.requestData.app_id,
      time_stamp: this.requestData.time_stamp,
      nonce_str: this.requestData.nonce_str,
      sign: md5Param
    }, function (res) {
      wx.hideLoading()
      console.log("res==", JSON.stringify(res.data.data))
      that.requestData.face_ids = res.data.data.face_ids
      that.setData({
        content: JSON.stringify(res.data.data)
      })
    }, 'post')
  },
  getpersonids: function() {
    wx.showLoading({
      title: '正在加载中...',
    })
    this.requestData.time_stamp = Math.round(new Date().getTime() / 1000);
    this.requestData.nonce_str = util.generateRandomString(24)
    var map = new Map();
    map.set("app_id", this.requestData.app_id)
    map.set("time_stamp", this.requestData.time_stamp)
    map.set("nonce_str", this.requestData.nonce_str)
    map.set("group_id", this.requestData.group_ids)
    var md5Param = util.signTengxunAI(map)
    this.requestData.sign = md5Param
    var that = this
    http.req('https://api.ai.qq.com', '/fcgi-bin/face/face_getpersonids', {
      app_id: this.requestData.app_id,
      time_stamp: this.requestData.time_stamp,
      nonce_str: this.requestData.nonce_str,
      group_id:this.requestData.group_ids,
      sign: md5Param
    }, function (res) {
      wx.hideLoading()
      console.log("res==", JSON.stringify(res.data.data))
      that.requestData.face_ids = res.data.data.face_ids
      that.setData({
        content: JSON.stringify(res.data.data)
      })
    }, 'post')
  },
  getfaceids: function() {
    wx.showLoading({
      title: '正在加载中...',
    })
    this.requestData.time_stamp = Math.round(new Date().getTime() / 1000);
    this.requestData.nonce_str = util.generateRandomString(24)
    var map = new Map();
    map.set("app_id", this.requestData.app_id)
    map.set("time_stamp", this.requestData.time_stamp)
    map.set("nonce_str", this.requestData.nonce_str)
    map.set("person_id", this.requestData.person_id)
    var md5Param = util.signTengxunAI(map)
    this.requestData.sign = md5Param
    var that = this
    http.req('https://api.ai.qq.com', '/fcgi-bin/face/face_getfaceids', {
      app_id: this.requestData.app_id,
      time_stamp: this.requestData.time_stamp,
      nonce_str: this.requestData.nonce_str,
      person_id: this.requestData.person_id,
      sign: md5Param
    }, function (res) {
      wx.hideLoading()
      console.log("res==", JSON.stringify(res.data.data))
      that.requestData.face_ids = res.data.data.face_ids
      that.setData({
        content: JSON.stringify(res.data.data)
      })
    }, 'post')
  },
  getfaceinfo: function() {
    wx.showLoading({
      title: '正在加载中...',
    })
    this.requestData.time_stamp = Math.round(new Date().getTime() / 1000);
    this.requestData.nonce_str = util.generateRandomString(24)
    var map = new Map();
    map.set("app_id", this.requestData.app_id)
    map.set("time_stamp", this.requestData.time_stamp)
    map.set("nonce_str", this.requestData.nonce_str)
    map.set("face_id", this.requestData.face_ids)
    var md5Param = util.signTengxunAI(map)
    this.requestData.sign = md5Param
    var that = this
    http.req('https://api.ai.qq.com', '/fcgi-bin/face/face_getfaceinfo', {
      app_id: this.requestData.app_id,
      time_stamp: this.requestData.time_stamp,
      nonce_str: this.requestData.nonce_str,
      face_id: this.requestData.face_ids,
      sign: md5Param
    }, function (res) {
      wx.hideLoading()
      console.log("res==", JSON.stringify(res.data.data))
      that.requestData.face_ids = res.data.data.face_ids
      that.setData({
        content: JSON.stringify(res.data.data)
      })
    }, 'post')
  },
  previewImage: function(e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },

});