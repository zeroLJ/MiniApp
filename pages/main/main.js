// pages/main/main.js
const util = require('../../utils/util.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    notes:{}
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
    var that = this
    util.request({
      url:'https://jhonliu.club/VoiceNote/NoteRefresh',
      data: {
        data: '[{}]'
      },
      msg:'正在查询数据',
      success: function (json) {
        for (var i = 0; i < json.resultList.length; i++) {
          if (util.isEmpty(json.resultList[i].message)) {
            json.resultList[i].tips = '点击进行编辑'
          }else{
            json.resultList[i].tips = json.resultList[i].message
          }
          // json.resultList[i].addTime = json.resultList[i].addTime.replace("+", " ")
        }
        that.setData({
          notes: json.resultList
        })
        console.log(that.data)
        console.log(json)
      }
    })
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
  skip: function(e){
    var json = this.data.notes[e.currentTarget.id]
    wx.navigateTo({
      url: './../note/note?json=' + JSON.stringify(json)
    })
  },
  add: function(e){
    wx.navigateTo({
      url: './../note/note?json={}'
    })
  }
})