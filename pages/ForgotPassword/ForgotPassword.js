// pages/用户中心/用户中心.js
Page({

  data: {
      Email: '',
      ConfirmEmail:'',
      Password: '',
      Authencode: '',
      time: 'Get Authen Code', //倒计时 
      currentTime: 60,//限制60s
      isClick: false,//获取验证码按钮，默认允许点击
  },

  bindEmailInput: function (e) {
    this.setData({
      Email: e.detail.value
    })
  },

  bindEmailInputAgain: function (e) {
    this.setData({
      ConfirmEmail: e.detail.value
    })  
  },

  bindAuthencodeInput: function(e){
    this.setData({
      Authencode: e.detail.value
    })
  },

  AuthenCode: function (e) {
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if(regex.test(this.data.Email)){
      console.log(this.data.Email)
      console.log(this.data.ConfirmEmail)
      if (this.data.Email != this.data.ConfirmEmail || this.data.Email == '' || this.data.ConfirmEmail == '') {
        wx.showModal({
          title: 'Failed to Proceed',
          content: 'Check your Email Input',
          showCancel: false,
        });
        this.setData({
          isClick: false,
        })
        this.setData({
          time: "Get Authen Code",
        })
      }

      if (this.data.Email === this.data.ConfirmEmail && this.data.Email != '') {
        const address = 'https://dingziku.herokuapp.com'
        getApp().globalData.Email = this.data.Email
        getApp().globalData.address = address
        wx.request({
          url: address + '/auth' + '/send_email_verification_code',
          data:{
            email: this.data.Email
          },
          method: "POST",
          header:{
            'Content-type': 'application/x-www-form-urlencoded',
          },
          success: function(res){
            console.log(res)
          }
        })
        var that = this
        that.setData({
          isClick: true,
        })
        // 60s倒计时 setInterval功能用于循环，常常用于播放动画，或者时间显示
        var currentTime = that.data.currentTime;
        var interval = setInterval(function () {
          currentTime--;//减
          that.setData({
            time: currentTime + ' Seconds Later'
          })
          if (currentTime <= 0) {
            clearInterval(interval)
            that.setData({
              time: 'Get Authen Code',
              currentTime: 60,
              isClick: false
            })
          }
        }, 1000);
      }

    }
    else{
      wx.showModal({
        title: 'Error',
        content: 'Invalid Email Address',
      })

    }

    /*第一步：验证手机号码*/
    // var reg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;// 判断手机号码的正则
    // if (this.data.Email.length == 0) {
    //   util.progressTips('手机号码不能为空')
    //   return;
    // }
 
    // if (that.data.Email.length < 11) {
    //   util.progressTips('手机号码长度有误！')
    //   return;
    // }

    // if (!myreg.test(that.data.Email)) {
    //   util.progressTips('错误的手机号码！')
    //   return;
    // }
    /*第二步：设置计时器*/
    // 先禁止获取验证码按钮的点击
    
    /*第三步：请求验证码接口，并记录服务器返回的验证码用于判断，这里服务器也可能不返回验证码，那验证码的判断交给后台*/
    // wx.request({})
  },

  Confirm: function(e){
    var that = this
    const address = getApp().globalData.address
    wx.request({
      url: address + '/auth' + '/verify_code',
      data: {
        email: this.data.Email,
        verification_code: this.data.Authencode
      },
      method: "POST",
      header: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        getApp().globalData.VerifyCode = that.data.Authencode
        if(res.data.is_verified == 1){
          console.log('成功')
          wx.navigateTo({
            url: '../ChangePassword/ChangePassword',
          })
        }
        if(res.data.success == 0 || res.data.is_verified == 0){
          wx.showModal({
            title: 'Failed',
            content: 'Your AuthCode is wrong',
          })
        }
      },
      fail: function (res){
        if (res.statusCode == 400){
          wx.showModal({
            title: 'Missing or illegal argument',
            content: 'Check your Inputs',
          })
        }
        if (res.statusCode == 404){
          wx.showModal({
            title: 'Wrong URL or resource not found',
            content: 'Email Not Found',
          })
        }
        if (res.statusCode == 500){
          wx.showModal({
            title: 'Internal error',
            content: 'Check your network',
          })
        }
      },
      
    })
    
  },

  /**
   * 登录
   */
  loginBtnClick: function () {
    var that = this;
    // 判断账户、密码、验证码
    // wx.request({})
  },

  // authcodeInput: function (e) {
  //   // console.log("password==", event.detail.value)
  //   this.setData({ authcode: e.detail.value })
  // },


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
    wx.setNavigationBarTitle({
      title: 'Forgot Password',
    })
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
