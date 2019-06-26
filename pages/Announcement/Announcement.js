// pages/Announcement/Announcement.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    AnnouncementArray: []
  },

  Announcement(event) {
    console.log(event.currentTarget.dataset);
    wx.navigateTo({
      url: '../AnnContent/AnnContent',
      success: function () {
        console.log(event.currentTarget.dataset.announce.content);
      }
    });
  },


  Home: function () {
    getApp().globalData.currentCourse = null
    wx.navigateTo({
      url: '../CrsList/CrsList',
      success: function () {
        //console.log("called switchetab");
      }
    });
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    wx.setNavigationBarTitle({
      title: '声明',
    })
    var that = this
    const address = getApp().globalData.address
    wx.request({
      url: address + '/course/announcement/get_all',
      data: {
        course_id: getApp().globalData.currentCourse
      },
      method: "Get",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'cookie': getApp().globalData.cookie
      },
      success: function (res) {
        if (res.statusCode == 200)
        {
          that.setData({
            AnnouncementArray: res.data.announcements
          })
          console.log('---Get Anouncement List Successfully---');

        }
        else
        {
          console.log(res.errmsg)
        }
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
    // wx.setNavigationBarTitle({
    //   title: 'Announcement',
    // })
    // var that = this
    // const address = getApp().globalData.address
    // var courseid = getApp().globalData.currentCourse
    // console.log(courseid)
    // wx.request({
    //   url: address + '/courses' + '/getAnnouncement',
    //   data: {
    //     course: courseid
    //   },
    //   method: "POST",
    //   header: {
    //     'content-type': 'application/x-www-form-urlencoded',
    //     'cookie': getApp().globalData.cookie
    //   },
    //   success: function (res) {
    //     if (res.statusCode == 404) {
    //       //Empty Announcement
    //       //Do Nothing
    //       console.log("No Anouncement")
    //     }
    //     else if (res.statusCode == 200) {
    //       that.data.AnnouncementArray = [];
    //       var al = that.data.AnnouncementArray;
    //       al = res.data.data;
    //       that.setData({
    //         AnnouncementArray: al
    //       })
    //       console.log('---Get Anouncement List Successfully---');
    //     }
    //   },
    //   fail: function (res) {

    //   },
    //   complete: function (res) {

    //   }
    // })

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