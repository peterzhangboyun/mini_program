// pages/AnnContent/AnnContent.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: 'AnnContent',
    })
    var that = this
    const address = getApp().globalData.address
    const tkn = getApp().globalData.token
    var courseid = getApp().globalData.currentCourse
    var headup = getApp().globalData.announcement
    //console.log(courseid)
    wx.request({
      url: address + '/courses' + '/getAnnouncement',
      data: {
        course: courseid
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'x-access-token': tkn
      },
      success: function (res) {
        console.log(headup);
        that.setData({
          content: headup
        })
       //console.log(that.data.content)
      },
      fail: function (res) {

      },
      complete: function (res) {

      }
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