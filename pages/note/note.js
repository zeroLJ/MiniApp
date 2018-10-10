// pages/note/note.js
const util = require('../../utils/util.js')
const dateutil = require('../../utils/dateutil.js')
const app = getApp();
const innerAudioContext = wx.createInnerAudioContext()
const recorderManager = wx.getRecorderManager()
var audioPath = ""
recorderManager.onStop(function (res) {
  console.log('recorder stop', res)
  audioPath = res.tempFilePath
})
Page({

  /**
   * 页面的初始数据
   */
  data: {
    json: null,
    disabled: true,
    focus: false,
    iconPath: './../../images/play.png'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var json = JSON.parse(options.json)
    console.log(json)
    this.setData({
      json: json,
      date: dateutil.getStringDate(new Date())+'的笔记',
      tips: '点击输入内容',
      isNew: util.isEmpty(json.addTime)? true:false
    })
    if(!this.data.isNew){
      this.setData({
        message: json.message,
        title: json.title,
      })
    }
    console.log(this.data)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    if(this.data.isNew){
      return
    }
    wx.showLoading({
      title: '正在加载数据',
    })
    var that = this
    var url = util.url + 'NoteGetAudio';
    url = url + "?name=" + app.globalData.name
    url = url + "&password=" + app.globalData.password
    url = url + "&addTime=" + encodeURI(this.data.json.addTime)
    wx.downloadFile({
      url: url,
      success(res) {
        // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
        console.log(res)
        if (res.statusCode === 200) {
          audioPath = res.tempFilePath
        }
      },
      fail: function (res) {
        console.log(res)
       },
      complete: function (res) { 
        wx.hideLoading()
      },
    })
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
  play: function(e){
    if (this.data.iconPath == './../../images/stop.png'){
      innerAudioContext.stop();
      this.setData({
        iconPath: './../../images/play.png'
      })
      return
    }
    var that = this
    innerAudioContext.autoplay = true
    innerAudioContext.src = audioPath
    innerAudioContext.onPlay(() => {
      console.log('开始播放')
      that.setData({
        iconPath: './../../images/stop.png'
      })
    })
    innerAudioContext.onError((res) => {
      wx.showToast({
        title: '音频不存在',
        icon: 'none'
      })
    })
    innerAudioContext.onEnded((res) =>{
      console.log('播放结束')
      that.setData({
        iconPath: './../../images/play.png'
      })
    })
    innerAudioContext.play();
  },
  a: function (e) {
    this.setData({
      disabled: false,
    })
    this.setData({
      focus: true
    })
  },
  b: function (e) {
    this.setData({
      disabled: true,
      focus: false
    })
  },
  start: function (e) {
    wx.showToast({
      title: '开始录音',
      icon: 'none'
    })
    recorderManager.start();
  },
  end: function (e) {
    wx.showToast({
      title: '录音结束',
      icon: 'none'
    })
    recorderManager.stop();
  },
  save: function(e){
    var json = this.data.json
    json.message = util.isEmpty(this.data.message) ? '' : encodeURI(this.data.message)
    if (util.isEmpty(this.data.title)){
      json.title = encodeURI(this.data.date)
    }else{
      json.title = encodeURI(this.data.title)
    }
    var url
    if(this.data.isNew){
      url = 'NoteAdd'
    }else{
      url = 'NoteUpdate'
      json.tips = ''
    }
    util.request({
      url: url, 
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