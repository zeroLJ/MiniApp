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



function request(url,data,showMsg, callback){
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
      console.log(res)
      var a = decodeURIComponent(res.header.data)
      var json = JSON.parse(a);
      if (json.success) {
        callback(json, res.data)
      }else{
        wx.showModal({
          title: '',
          content: json.msg,
          showCancel: false
        })
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
