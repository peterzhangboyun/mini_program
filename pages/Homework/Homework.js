// pages/作业提交/作业提交.js
Page({

  /**
   * Page initial data 
   */
  data: { 
    Home: "Return To Home",
    tmpImageUrl: [],
    flexImageSize:{
      width: 0,
      height: 0
    }
  },

  Home: function () {
    wx.navigateTo({
      url: '../CrsList/CrsList',
      success: function () {
        console.log("Switch to CrsList");
      }
    }); 
  },
 
  Upload: function () {
    var that = this
    wx.chooseImage({
      count: 3,
      sizeType: ['original','compressed'],
      sourceType: ['album','camera'],
      success: function(res) {
        console.log(res)
          that.setData({
            tmpImageUrl: res.tempFilePaths
          });
      },
    })
  },

  tmpImageLoaded: function(res){
    console.log(res);
    var width = 250 ;
    var height = 250 / res.detail.width * res.detail.height
    this.setData({
      'flexImageSize.width': width + 'rpx',
      'flexImageSize.height': height + 'rpx'
    });
  },

  /**
   * Lifecycle function--Called when page load
   */
  
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '作业',
    })
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

  }
})