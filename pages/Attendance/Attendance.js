// pages/签到/签到.js
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    SectionArray: [
      {
        str: '张三',
        styleClass: 'list_title'
      },
      {
        str: '李四',
        styleClass: 'list_title'
      },
      {
        str: '王五',
        styleClass: 'list_title'
      },
      {
        str: '赵六',
        styleClass: 'list_title'
      },
      {
        str: '钱七',
        styleClass: 'list_title'
      }
    ],
    AttendArray: [
      { name: 'Attended', value: 'yes', checked: 'true' },
      { name: 'Not Attended', value: 'no'}
    ]
  },

  save_status: function (e){
    console.log('status saved')
  },

  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },

  Home: function () {
    wx.navigateTo({
      url: '../../pages/Course列表/Course列表',
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