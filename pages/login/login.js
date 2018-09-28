// pages/login/login.js
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
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

  login: function(e){
    if(this.data.name == '' || this.data.name == undefined){
      wx.showModal({
        title: '',
        content: '用户名不能为空！',
        showCancel: false,
      })
      return;
    }
    if(this.data.password != this.data.password_2){
      wx.showModal({
        title: '',
        content: '两次输入的密码不一致，请检查！',
        showCancel: false,
      })
      return;
    }
    getApp().globalData.name = this.data.name
    getApp().globalData.password = this.data.password
    util.request({
      url:'https://jhonliu.club/VoiceNote/Login', 
      msg: '正在注册',
      success: function (json) {
        wx.showToast({
          title: '注册成功',
          duration: 2000,
          mask: true,
          complete: function (res) {
            setTimeout(function(){
              wx.navigateBack({
              })
            },2000)
          },
        })
      }
    })

  }
})