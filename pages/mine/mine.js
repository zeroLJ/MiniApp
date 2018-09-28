// pages/mine/mine.js
const util = require('../../utils/util.js')
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imagePath: "./../../images/a.png",
    nickname: "name"
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
    var that = this
    var url = 'https://jhonliu.club/VoiceNote/HeadIconGet';
    url = url + "?name=" + app.globalData.name
    url = url + "&password=" + app.globalData.password
    this.setData({
      nickname: app.globalData.name
    })
    wx.downloadFile({
      url: url, 
      success(res) {
        // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
        if (res.statusCode === 200) {
          that.setData({
            imagePath: res.tempFilePath
          })
        }
      }
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
  logout: function(e){
    wx.showModal({
      title: '',
      content: '是否要退出当前帐号？',
      success: function (res) { 
        if(res.confirm){
          app.globalData.name = null;
          app.globalData.password = null;
          wx.removeStorage({
            key: 'user',
            success: function(res) {},
            complete: function (res){
              console.log(res)
              wx.redirectTo({
                url: './../signin/signin',
              })
            }
          })  
        }
      },
    })
  },
  bindViewTap: function(e){
    var that =this
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      success: function(res) {
        const tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: 'https://jhonliu.club/VoiceNote/HeadIconChange',
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            name: app.globalData.name,
            password: app.globalData.password
          },
          success(res) {
            that.setData({
              imagePath: tempFilePaths[0]
            })
          }
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  onShare: function(e){
   wx.setTopBarText({
     text: 'sdsdsd',
     success: function(res) {},
     fail: function(res) {},
     complete: function(res) {console.log("sdsdsd")},
   })
   wx.showToast({
     title: '待实现',
     icon: 'none'
   })
  }
})