// pages/ChangePassword/CHangePassword.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    NewPassword: '',
    ConfirmNewPassword: '',
  },

  bindPasswordInput: function(e){
    this.setData({
      NewPassword: e.detail.value
    })
  },
  bindPasswordInputAgain: function (e){
    this.setData({
      ConfirmNewPassword: e.detail.value
    })
  },

  ConfirmChange: function(e){
    var that = this
    const address = getApp().globalData.address

    if (this.data.NewPassword != this.data.ConfirmNewPassword || this.data.NewPassword == '' || this.data.ConfirmNewPassword == '') {
      wx.showModal({
        title: 'Failed to Proceed',
        content: 'Check your Password setting',
        showCancel: false,
      });
    }
 
    if (this.data.NewPassword === this.data.ConfirmNewPassword && this.data.NewPassword != ''){
      wx.request({
        url: address + '/auth/reset_password',
        data: {
          email: getApp().globalData.Email,
          verification_code: getApp().globalData.VerifyCode,
          new_password: this.data.NewPassword
        },
        method: "POST",
        header: {
          'Content-type': 'application/x-www-form-urlencoded',
        },
        success: function(res){
          console.log(res)
          if(res.data.is_verified == 1 && res.data.success == 1){
            wx.showModal({
              title: 'Success!',
              content: 'Password Changed',
              success(res) {
                if (res.confirm) {
                  wx.navigateTo({
                    url: '../UserCenter/UserCenter',
                  })
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
          }
          else{
            wx.showModal({
              title: 'Failed!',
              content: 'Password Reset Failed',
            })
          }
        }
      })
    }
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
    wx.setNavigationBarTitle({
      title: 'Change Password',
    })
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