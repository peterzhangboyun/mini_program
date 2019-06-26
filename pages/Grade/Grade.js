// pages/Grade/Grade.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    GradeArray: [
      {
        str: 'Score: 95',
        styleClass: 'list_title'
      },
      {
        str: 'Highest: 100',
        styleClass: 'list_title'
      },
      {
        str: 'Lowest: 72',
        styleClass: 'list_title'
      }, 
      {
        str: 'Average: 88',
        styleClass: 'list_title'
      }
    ]
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
      title: 'Grade',
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