// 

var barcode = '866242'
var hang = 1
msg: '数据'

Page({


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
    console.log('onShow start');
    this.onLoad();
    
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
    wx.stopPullDownRefresh();
    console.log('onShow start');
    this.onUnload();
    this.onLoad();
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

  },
  data: {
    condition: true,
    array: ['MINA', 2, 'nihao', '你好'],
    hang : hang,
    barcode:barcode 
  },
  copyTBL: function (e) {
    var self = barcode;
    wx.setClipboardData({
      data: self,
      success: function (res) {
        // self.setData({copyTip:true}),  
        wx.showModal({
          title: '提示',
          content: '复制成功',
          success: function (res) {
            if (res.confirm) {
              console.log('确定,复制内容是', self)
            } else if (res.cancel) {
              console.log('取消,复制内容是', self)
            }
          }
        })
      }
    });
  },
  ScanCode: function (e) {
    barcode = '条码'
    // 只允许从相机扫码
    wx.scanCode({
      onlyFromCamera: true,
      success: (res) => {
        console.log('确定,复制内容是', res.result);
        hang = hang + 1;
        console.log(hang);
        barcode = res.result;
        console.log(barcode);
        wx.startPullDownRefresh();
      },
      fail: (res) => {
        console.log('取消,复制内容是', res);
      }
    })
  }
})