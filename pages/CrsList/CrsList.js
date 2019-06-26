// pages/课程列表/课程列表.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classArray: []
  },

  course(event) {
    console.log(event.currentTarget.dataset.course.course_id);
    getApp().globalData.currentCourse = event.currentTarget.dataset.course.course_id;
    wx.switchTab({
      url: '../Module/Module',
      success: function () {
        console.log('Switch to Module 成功');
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
      url: address + '/course/search',
      method: "GET",
      header: {
        //'content-type': 'application/x-www-form-urlencoded',
        'cookie': getApp().globalData.cookie
      },
      success: function (res) {
        console.log(res)
        var cl = that.data.classArray;
        cl = res.data.courses;
        that.setData({
          classArray: cl
        });
        console.log('---Get Class List Successful---');
        console.log(res);
      },
      fail: function (res) {
        console.log('---Get Class List Fail---');
        console.log(res);
      },
      complete: function (res) {
        console.log('---Get Class List Complete---');
      }
    })

    wx.setNavigationBarTitle({
      title: '课程'
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