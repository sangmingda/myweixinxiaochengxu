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

  },
  showtip:function(){
    var content = '海报纸\r\n黑卡纸\r\n4号信封\r\n5号航空信封\r\n7号信封\r\n9号信封\r\n实验报告纸\r\n信纸\r\n小文稿纸\r\n包装绳\r\n封箱带\r\n大购物袋\r\n3M口罩（两个）'
    wx.showModal({
      title: '无条码商品标准名称',
      content: content,
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else {
          console.log('用户点击取消')
        }

      }
    })
  },
  showhelp: function () {
    var content = '需输入4个数字以上的条码\r\n或输入1个字符以上的名称\r\n等待1.5秒后\r\n开始自动查找货品名称\r\n结果不多于6个时\r\n弹出选择框\r\n'
    wx.showModal({
      title: '操作指南',
      content: content,
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else {
          console.log('用户点击取消')
        }

      }
    })
  }
  
})
