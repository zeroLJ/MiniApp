//index.js
const app = getApp()
const util = require('../../utils/util.js')
Page({
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
   
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.showLoading({
      title: '正在加载数据',
    })
    wx.getStorage({
      key: 'user',
      success: function (res) {
        console.log(res)
        app.globalData.name = res.data.name
        app.globalData.password = res.data.password
        // wx.switchTab({
        //   url: './../main/main',
        // })
        util.request({
          url: 'https://jhonliu.club/VoiceNote/Signin',
          success: function (json) {
            setTimeout(function(){
              wx.switchTab({
                url: './../main/main',
              })
            },1000)
          },
          error: function(json){
            setTimeout(function () {
              wx.redirectTo({
                url: './../signin/signin',
              })
            },1000)
          }
        })
      },
      fail: function (res) {
        setTimeout(function () {
          wx.redirectTo({
            url: './../signin/signin',
          })
        },1000)
      }
    })
  },
})
