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

function isEmpty(str){
  if (str == "" || str == undefined || str == null){
    return true;
  }else{
    return false;
  }
}


const URL = 'https://jhonliu.club/VoiceNote/'
function request(mapjson) {
  // res.showMsg != undefined && res.showMsg
  var showMsg = mapjson.msg
  var url = mapjson.url
  var data = mapjson.data
  if (isEmpty(url)) {
    wx.showModal({
      title: '',
      content: 'url不能为空！',
    })
  }
  if(url.indexOf('https')!=0){
    url = URL + url
  }
  if (!isEmpty(showMsg)) {
    wx.showLoading({
      title: showMsg,
    })
  }
  if(isEmpty(data)){
    data = {}
  }
  const app = getApp()
  data.name = app.globalData.name
  data.password = app.globalData.password
  console.log('data')
  console.log(data)
  wx.request({
    url: url,
    data: data,
    header: {
      "content-type": "application/x-www-form-urlencoded;charset=utf-8"
    },
    method: 'GET',
    dataType: 'json',
    responseType: 'text',
    success: function (res) {
      console.log('success:')
      //可根据后台返回的数据来取相应的字段
      var a = decodeURIComponent(res.header.data)
      // if (a.indexOf("+")>=0){
      //   var b = "+"
      //   a = a.replace(new RegExp(b), " ")
      // }

      //从后端传来的字符串中的空格会变成+号，故需替换回来
      while (a.indexOf("+") >= 0) {
        a = a.replace("+", " ")
      }

      var json = JSON.parse(a);
      if (json.success) {
        if(!isEmpty(mapjson.success)){
          mapjson.success(json)
        }
      } else {
        if (isEmpty(mapjson.error)) {
          wx.showModal({
            title: '',
            content: json.msg,
            showCancel: false
          })
        } else {
          mapjson.error(json)
        }
      }
      console.log(json);
    },
    fail: function (res) {
      console.log('fail:')
      console.log(res)
      if (isEmpty(mapjson.fail)) {
        wx.showModal({
          title: '',
          content: '网络请求失败',
          showCancel: false
        })
      }else{
        mapjson.fail(res)
      }
    },
    complete: function (res) {
      if (!isEmpty(showMsg)) {
        wx.hideLoading()
      }
    },
  })
}

module.exports = {
  formatTime: formatTime,
  request : request,
  isEmpty: isEmpty,
  url : URL
}
