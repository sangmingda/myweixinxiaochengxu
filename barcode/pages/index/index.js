//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '欢迎参加盘点',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    shareData: {
      //title: '忘去一切',
      //desc: '超市盘点小程序',
      path: '/pages/index/index'
    }
  },
  onReady:function(){
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  onShareAppMessage: function () {
    return this.data.shareData
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  navigatortoscan:function(){

    var pages_num = getCurrentPages()
    if (pages_num.length==2){    
      wx.navigateBack({
        delta: pages_num.length
    })
    }else{
      wx.redirectTo({
        url: "../text/text"
      })
}

  }
  
})
