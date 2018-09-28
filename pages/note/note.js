// pages/note/note.js
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    json: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var json = JSON.parse(options.json)
    console.log(json)
    this.setData({
      json: json,
      message: json.message,
      title : json.title
    })
    console.log(this.data)
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
    var value = e.detail.value
    this.setData({
      [a]: value
    })
    return {
      value: value,
      cursor: value.length
    }
    console.log(this.data)
  },

  save: function(e){
    var json = this.data.json
    json.message = encodeURI(this.data.message)
    json.title = encodeURI(this.data.title)
    util.request({
      url:'https://jhonliu.club/VoiceNote/NoteUpdate', 
      data:{
        data: JSON.stringify(json)
      },
      msg: '正在保存',
      success: function (json) {
        wx.showToast({
          title: '保存成功',
          duration: 2000,
          mask: true,
          complete: function (res) {
            setTimeout(function () {
              wx.navigateBack({
              })
            }, 2000)
          },
        })
      }
    })
  }
})