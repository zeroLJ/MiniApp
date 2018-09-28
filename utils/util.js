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



function request(url,data,showMsg,success,fail){
  if(showMsg!=''){
    wx.showLoading({
      title: showMsg,
    })
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
    success: function(res) {
      console.log('success:')
      var a = decodeURIComponent(res.header.data)
      // if (a.indexOf("+")>=0){
      //   var b = "+"
      //   a = a.replace(new RegExp(b), " ")
      // }

      //从后端传来的字符串中的空格会变成+号，故需替换回来
      while(a.indexOf("+")>=0){
        a = a.replace("+", " ")
      }
    
      var json = JSON.parse(a);
      if (json.success) {
        success(json, res.data)
      }else{
        if(fail==null || fail == undefined){
          wx.showModal({
            title: '',
            content: json.msg,
            showCancel: false
          })
        }else{
          fail(json)
        }
      }
      console.log(json);    
    },
    fail: function(res) {
      console.log('fail:')
      console.log(res)
      wx.showModal({
        title: '',
        content: '网络请求失败',
        showCancel: false
      })
    },
    complete: function(res) {
      if (showMsg != '') {
        wx.hideLoading()
      }
    },
  })
}

module.exports = {
  formatTime: formatTime,
  request : request
}
