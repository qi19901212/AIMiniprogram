var md5 = require('md5.js')
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
/** 生成随机字符串*/
function generateRandomString(n){
  var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  var res = "";
  for (var i = 0; i < n; i++) {
    var id = Math.ceil(Math.random() * 35);
    res += chars[id];
  }
  return res;
}
/** 腾讯AI 签名*/ 
function signTengxunAI(map){
  var mapKeys = map.keys;
  var keysArr = []
  for (let key of map.keys()) {
    keysArr.push(key);
  }
  console.log("sort", keysArr.sort())
  var param = '';
  for (var i = 0; i < keysArr.length; i++) {
    param = param + keysArr[i] + "=" + map.get(keysArr[i]) + "&"
  }
  param = param + "app_key=WfGqmAc8HN1hkZRj"
  var md5Param = md5.hexMD5(param).toUpperCase()
  // console.log("param============", param)
  console.log("md5Param=========", md5Param)
  return md5Param
}
module.exports = {
  formatTime: formatTime,
  generateRandomString: generateRandomString,
  signTengxunAI: signTengxunAI
}
