var history_data = [];

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showhistory: '无'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    var that = this
    wx.showShareMenu({
      withShareTicket: true
    })


    var res = wx.getStorageInfoSync()
    var keys_length = res.keys.length

    var history_data = []
    let historyIndex = 1
    for (let i = 0; i < keys_length; i++) {
 
      if (res.keys[i] != "logs") {
        var new_history = wx.getStorageSync(res.keys[i])
        history_data.push(String(historyIndex) + '\n' + new_history)
        historyIndex = historyIndex+1
     //   console.log('编号是',historyIndex)
        // history_data.push(new_history)
      }
    }
    if (history_data.length > 0) {

      that.setData({
        showhistory: history_data.join('\n\n')
      })

    } else {
      that.setData({
        showhistory: '无'
      })
    }

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  backtotext: function() {
    var pages_num = getCurrentPages()
    if (pages_num.length == 2) {
      wx.navigateBack({
        delta: pages_num.length
      })
    } else {
      wx.redirectTo({
        url: "../text/text"
      })
    }
  },
  clearhistory: function() {
    var that = this
    wx.showModal({
      title: '注意',
      content: '确认要清空历史记录吗？',
      success: function(res) {
        if (res.confirm) {
          wx.clearStorageSync()
          that.setData({
            showhistory: '无'
          })
          wx.showToast({
            title: '已清空历史记录',
            icon: 'success',
          })
        } else if (res.cancel) {}
      }
    })

  },
  clearoldhistory: function() {
    var that = this
    wx.showModal({
      title: '注意',
      content: '确认要删除旧的历史记录吗？',
      success: function(res) {
        if (res.confirm) {

          var oldhistory = wx.getStorageInfoSync()
          console.log(oldhistory.keys)
          var keys_length = oldhistory.keys.length

          for (let i = 0; i < keys_length; i++) {
            let a = parseInt(oldhistory.keys[i])
            var timestamp = Date.parse(new Date()) / 1000;
            console.log(a, timestamp, timestamp - a, timestamp - a > 60 * 60 * 24 * 20)
            if ( timestamp-a > 60 * 60 * 24 * 20) { //比当前时间早20天
           //   if ( timestamp -a> 10) { //比当前时间早10秒

              wx.removeStorage({
                key: oldhistory.keys[i]
              })
            }
          }
          that.onReady()
          that.onReady()

          wx.showToast({
            title: '已删除旧的历史记录',
            icon: 'success',
          })
        } else if (res.cancel) {}
      }
    })

  },
  copyHistory:function(){
    var that=this
    wx.setClipboardData({
      data: that.data.showhistory,
      success: function (res) {
        wx.showToast({
          title: '复制成功',
        })
      }
    })

  }
})