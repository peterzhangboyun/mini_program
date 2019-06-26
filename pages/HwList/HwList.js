// pages/作业列表/作业列表.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    AssignmentArray: [] 
  },

  Assignment: function (e) {
    getApp().globalData.currentHomework = e.currentTarget.dataset.hwlist;
    wx.navigateTo({
      url: '../../pages/HwSubm/HwSubm',
      success: function () {
        console.log("Switch to HwSubm");
      }
    });
  },

  Home: function () {
    wx.navigateTo({
      url: '../../pages/CrsList/CrsList',
      success: function () {
        console.log("Switch to CrsList");
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    const address = getApp().globalData.address
    wx.request({
      url: address + '/course/homework/get_all',
      data: {
        course_id: getApp().globalData.currentCourse,
      },
      header: {
        //'content-type': 'application/x-www-form-urlencoded',
        'cookie': getApp().globalData.cookie
      },
      method: "GET",
      success: function (res) {
        console.log(res)
        var ALT = [];
        var getHomeworkLength = res.data.homeworks.length;
        for (var i = 0; i < getHomeworkLength; i++) {
          if (res.data.homeworks[i].deadline.length > 10) {
            res.data.homeworks[i].deadline = res.data.homeworks[i].deadline.substring(0, 10);
          }
        }
        ALT = res.data.homeworks
        that.setData({
          AssignmentArray: ALT
        })
        console.log(that.data.AssignmentArray)
      }, 
    })
    wx.setNavigationBarTitle({
      title: '作业列表',
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