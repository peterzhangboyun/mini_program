// pages/module/module.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ModuleArray: [
      {
        str: 'Class 1: Wireless',
        styleClass: 'list_title'
      },
      {
        str: 'Class 2: TCP/IP',
        styleClass: 'list_title'
      }
    ]
  },

  Module: function () {
    wx.navigateTo({
      url: '../ModuleInfo/ModuleInfo',
      success: function () {
        console.log("called switchetab");
      }
    });
  },

  Home: function () {
    wx.navigateTo({
      url: '../CrsList/CrsList',
      success: function () {
        console.log("called switchetab");
      }
    });
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: 'Module'
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

  }
})