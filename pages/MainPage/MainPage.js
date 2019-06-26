// pages/主页/主页.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      '../images/poster/主页1.jpg',
      '../images/poster/主页2.jpg',
      '../images/poster/主页3.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 1000,
    array:['学生', '老师', '主任', '管理员'],
    objectArray:[
      {
        id: 0,
        name: '学生'
      },
      {
        id: 1,
        name: '老师'
      },
      {
        id: 2,
        name: '主任'
      },
      {
        id: 3,
        name: '管理员'
      }
    ],
    index: 0,
  },

  //next跳转至登陆界面
  next: function (e) {
    //进行 tab 跳转
    wx.navigateTo({
      url: '../../pages/UserCenter/UserCenter',
      success: function () {
      console.log("called switchetab");
      }
    });    
  },

  //选择器选择登陆身份
  bindPickerChange: function(e){
    console.log('picker值发生改变，目前为', e.detail.value)
    this.setData({
      index: e.detail.value    
    })
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