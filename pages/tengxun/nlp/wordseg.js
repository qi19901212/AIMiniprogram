var md5 = require('../../../utils/md5.js')
var http = require('../../../utils/http.js')
var util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: ""
  },
  requestData: {
    app_id: '2109032063',
    time_stamp: '',
    nonce_str: '',
    text: '',
    sign: ''
  },
  formSubmit: function(e) {
    // console.log("this.requestData.text", e.detail.value.content)
    this.requestData.text = e.detail.value.content
    this.requestData.text = this.gb2utf8(e.detail.value.content)
    console.log("this.requestData.text", this.requestData.text)
    if (this.requestData.text == '' || this.requestData.text == null) {
      wx.showToast({
        title: '请输入内容',
      })
      return
    }
    wx.showLoading({
      title: '正在加载中....',
    })
    this.requestData.time_stamp = Math.round(new Date().getTime() / 1000).toString();
    this.requestData.nonce_str = util.generateRandomString(24)


    var map = new Map();
    map.set("app_id", this.requestData.app_id)
    map.set("time_stamp", this.requestData.time_stamp)
    map.set("nonce_str", this.requestData.nonce_str)
    map.set("text", encodeURIComponent(this.requestData.text))
    var md5Param = util.signTengxunAI(map)
    this.requestData.sign = md5Param
    var that = this
    http.req('https://api.ai.qq.com', '/fcgi-bin/nlp/nlp_wordseg', {
      app_id: this.requestData.app_id,
      time_stamp: this.requestData.time_stamp,
      nonce_str: this.requestData.nonce_str,
      text: this.requestData.text,
      sign: md5Param
    }, function(res) {
      wx.hideLoading()
      that.setData({
        content: JSON.stringify(res.data)
      })
    })
  },
  gb2utf8: function (strUtf8) {
    var bstr = "";
    var nTotalChars = strUtf8.length; // total chars to be processed.
    var nOffset = 0; // processing point on strUtf8
    var nRemainingBytes = nTotalChars; // how many bytes left to be converted
    var nOutputPosition = 0;
    var iCode, iCode1, iCode2; // the value of the unicode.

    while (nOffset < nTotalChars) {
      iCode = strUtf8.charCodeAt(nOffset);
      if ((iCode & 0x80) == 0) // 1 byte.
      {
        if (nRemainingBytes < 1) // not enough data
          break;

        bstr += String.fromCharCode(iCode & 0x7F);
        nOffset++;
        nRemainingBytes -= 1;
      } else if ((iCode & 0xE0) == 0xC0) // 2 bytes
      {
        iCode1 = strUtf8.charCodeAt(nOffset + 1);
        if (nRemainingBytes < 2 || // not enough data
          (iCode1 & 0xC0) != 0x80) // invalid pattern
        {
          break;
        }

        bstr += String.fromCharCode(((iCode & 0x3F) << 6) | (iCode1 & 0x3F));
        nOffset += 2;
        nRemainingBytes -= 2;
      } else if ((iCode & 0xF0) == 0xE0) // 3 bytes
      {
        iCode1 = strUtf8.charCodeAt(nOffset + 1);
        iCode2 = strUtf8.charCodeAt(nOffset + 2);
        if (nRemainingBytes < 3 || // not enough data
          (iCode1 & 0xC0) != 0x80 || // invalid pattern
          (iCode2 & 0xC0) != 0x80) {
          break;
        }

        bstr += String.fromCharCode(((iCode & 0x0F) << 12) |
          ((iCode1 & 0x3F) << 6) |
          (iCode2 & 0x3F));
        nOffset += 3;
        nRemainingBytes -= 3;
      } else // 4 or more bytes -- unsupported
        break;
    }

    if (nRemainingBytes != 0) {
      return "";
    }

    return bstr;

  },


  onLoad: function(options) {}
})