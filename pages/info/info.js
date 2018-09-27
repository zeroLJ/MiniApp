// pages/info/info.js

const dateutil = require('../../utils/dateutil.js')
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
     sexArray : ["男","女"]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      startDate: dateutil.getStartDate(new Date()),
      endData: dateutil.getStringDate(new Date()),
    });
    var that = this
    util.request('https://jhonliu.club/VoiceNote/InfoGet', {
    }, '正在获取数据', function (json) {
      console.log(json)
      var a = json.resultList[0]
      that.setData({
        birthday: a.birthday,
        e_mail: a.e_mail,
        job: a.job,
        nickname: a.nickname,
        sex: a.sex,
        telephone: a.telephone
      })
    })
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
  bindDateChange: function (e) {
    this.setData({
      birthday: e.detail.value
    })
  },
  bindSexChange: function (e) {
    console.log(e)
    this.setData({
      sex: this.data.sexArray[e.detail.value]
    })
  },
  bindinput: function (e) {
    var a = e.target.id;
    var value = e.detail.value.replace(/\s+/g, '')
    this.setData({
      [a]: value
    })
    console.log(this.data)
    return {
      value: value,
      cursor: value.length
    }
  },
  save: function(e){
    util.request('https://jhonliu.club/VoiceNote/InfoUpdate', {
      birthday: encodeURI(this.data.birthday),
      e_mail: encodeURI(this.data.e_mail) ,
      job: encodeURI(this.data.job),
      nickName: encodeURI(this.data.nickname),
      sex: encodeURI(this.data.sex),
      telephone: encodeURI(this.data.telephone) 
    }, '正在保存', function (json) {
      wx.showToast({
        title: '保存成功',
      })
    })
  }
})