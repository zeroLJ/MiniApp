// pages/signin/signin.js
//获取应用实例
const app = getApp()
const util = require('../../utils/util.js')
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    name: 'zero',
    password: '2'
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    //console.log(get)
    //app.globalData.userInfo = e.detail.userInfo
    app.globalData.name = this.data.name
    app.globalData.password = this.data.password
    util.request({
      url:'Signin',
      msg:'正在登录',
      success: function (json) {
        // wx.redirectTo({
        //   url: './../main/main',
        // })
        wx.setStorage({
          key: 'user',
          data: {
            name: app.globalData.name,
            password: app.globalData.password
          },
        })
        wx.switchTab({
          url: './../main/main',
        })
      }
    })
  },
  bindinput: function (e) {
    console.log(e)
    var a = e.target.id;
    var value = e.detail.value.replace(/\s+/g, '')
    this.setData({
      [a]: value
    })
    return {
      value: value,
      cursor: value.length
    }
    console.log(this.data)
  },

  skip: function (e) {
    wx.navigateTo({
      url: './../login/login',
    })
  }
})
