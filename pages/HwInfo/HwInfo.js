// pages/Homework信息/Homework信息.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Add: "Add-Assignment",
    AssignmentArray: [
      {
        str: 'Assignment 1: 15-Submissions',
        styleClass: 'list_title'
      },
      {
        str: 'Assignment 2: 3-Submissions',
        styleClass: 'list_title'
      },
      {
        str: 'Assignment 3: 0-Submission',
        styleClass: 'list_title'
      }
    ]
  },

  Add: function () {
    wx.navigateTo({
      url: '../../pages/HwContent/HwContent',
      success: function () {
        console.log("called switchetab");
      }
    });
  },

  View: function () {
    wx.navigateTo({
      url: '../../pages/Submission/Submission',
      success: function () {
        console.log("called switchetab");
      }
    });
  },

  Home: function () {
    wx.navigateTo({
      url: '../../pages/CrsList/CrsList',
      success: function () {
        console.log("called switchetab");
      }
    });
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

  }
})