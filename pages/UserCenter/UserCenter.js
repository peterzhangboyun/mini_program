// pages/用户中心/用户中心.js
Page({

  // data: {
  //   username: '',
  //   password: '',
  //   authcode: '',
  //  time: '获取验证码', //倒计时 
  //  currentTime: 60,//限制60s
  //  isClick: false,//获取验证码按钮，默认允许点击
  // },

  bindUsernameInput: function (e) {
    this.setData({
      username: e.detail.value
    })
  },

  bindPasswordInput: function (e) {
    this.setData({
      password: e.detail.value

    })
  },


  forgetpassword: function(e){
    wx.navigateTo({
      url: '../ForgotPassword/ForgotPassword',
    })
  },

  login: function (e) {
    var that = this
    wx.showToast({
      title: '登陆请求中',
      icon: 'loading',
      duration: 1500
    });
    const address = 'https://dingziku.herokuapp.com'
    getApp().globalData.address = address
    wx.request({ //网络请求开始
      url: address + '/auth/login',
      data: {
        username: this.data.username,
        password: this.data.password
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        console.log('---Successful---');
        console.log(res);
        wx.hideToast();
        if (res && res.data.success == 1 && res.header['Set-Cookie']) {
          getApp().globalData.cookie = res.header['Set-Cookie']
          wx.request({
            url: address + '/user/get_info',
            method: "GET",
            data: {
              username: that.data.username
            },
            header: {
              //'content-type': 'application/x-www-form-urlencoded',
              'cookie': getApp().globalData.cookie
            },
            success: function (res) {
              console.log('---Successful---');
              getApp().globalData.user_id = res.data.user_id;
              if (res.data.success == 1) { //success=1,登录成功,访问老师
                wx.navigateTo({
                  url: '../CrsList/CrsList',
                })
              }
            },
            fail: function (res) {
              console.log('---Fail---');
              console.log(res);
            },
            complete: function (res) {
              console.log('---Complete---');
            }
          });
        }
        else {
          wx.showModal({
            title: '登陆失败',
            content: '请检查您填写的用户信息',
            showCancel: false,
            // success: function(res){
            // //回调函数
            // }
          });
        }
      },
      fail: function (res) {
        console.log('---Fail---');
        console.log(res);
      },
      complete: function (res) {
        console.log('---Complete---');
      }
    });
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  },

  
})
