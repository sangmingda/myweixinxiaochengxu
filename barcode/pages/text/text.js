
var firstLine = '货柜号：';
var secondLine = '条 码  ,  名 称  ,  数 量';
var shelfName = [];
var extraLine = [];
var tip = '';
var input1 = '';
var input2 = '';
var input3 = '';
var input4 = '';

var mynickName = '操作员：';
var time = '';

var util = require('../../utils/util.js');  

Page({
  onReady: function () {
    var that = this;
    that.myName()
  },
  onPullDownRefresh: function () {
    var that = this;
    that.gettime()
  },
  gettime: function () {
    time = util.formatTime(new Date()),
      this.setData({
        time: util.formatTime(new Date()),
      });
    console.log(time)
  },
  data: {
    text_title:'条 码 ， 名 称 ， 数 量',
    text0: firstLine,
    text1: secondLine,
    tip: '',
    time: '',
  },
  onLoad: function () {
    var that = this;
    that.gettime()
  },
  myName: function () {
    var that = this;
    wx.getUserInfo({
      success: function (res) {
        mynickName = '操作员：' + res.userInfo.nickName,
          that.setData({
            mynickName: '操作员：' + res.userInfo.nickName, //用户名        
          })
      },
    })
  },
  removeLine: function () {
    if (extraLine.length > 0) {
      extraLine.pop()
      this.setData({
        text1: secondLine + '\n' + extraLine.join('\n'),
        tip: '提示：已删除最后一行',
      }),
        wx.showModal({
          title: '提示',
          content: '已删除最后一行',
        })
    }
  },
  clearall: function () {
    extraLine = [];
    this.setData({
      text1: secondLine + '\n',
      shelfName: '无',
      tip: '提示：已清空数据',

    }),
      wx.showModal({
        title: '提示',
        content: '已清空数据',
      })
  },
  comeback: function () {
    wx.navigateTo({
      url: "../index/index"
    })
  },
  formBindsubmit: function (e) {
    if (e.detail.value.inputNumber.length == 0 && e.detail.value.inputShelfname.length == 0) {
      this.setData({
        tip: '提示：数量不能为空！',
      }),
        wx.showModal({
          title: '提示',
          content: '数量不能为空！',
        })
    } else if (e.detail.value.inputNumber.length == 0 && e.detail.value.inputShelfname.length !== 0) {
      shelfName = e.detail.value.inputShelfname,
        this.setData({
          shelfName: e.detail.value.inputShelfname,
        })
      this.setData({
        tip: '提示：已修改货柜号，未输入数量！',
        input1: '',
      }),
        wx.showModal({
          title: '提示',
          content: '已修改货柜号，未输入数量！',
        })

    } else{
      extraLine.push(e.detail.value.inputBarcode + ',' + e.detail.value.inputName + ',' + e.detail.value.inputNumber),
        this.setData({
          text1: secondLine + '\n' + extraLine.join('\n'),
          tip: '',
        })
      if (e.detail.value.inputShelfname.length != 0) {
        shelfName = e.detail.value.inputShelfname,
          this.setData({
            shelfName: e.detail.value.inputShelfname,
          })
      }
      var that = this;
      that.formReset()
    }
  },
  formReset: function () {
    this.setData({
      input1: '',
      input2: '',
      input3: '',
      input4: '',
    })
  },
  scanmycode: function (e) {
    input2 = '未识别',
      // 只允许从相机扫码
      wx.scanCode({
        onlyFromCamera: true,
        success: (res) => {
          console.log(res)
          this.setData({
            input2: res.result
          })
        }
      })
  },
  copyTBL: function (e) {
    var that = this;
    that.gettime()
    var self = firstLine + shelfName + ' ' + mynickName + ' ' + time + '\n' + extraLine.join('\n');
    console.log(self),
      wx.setClipboardData({
        data: self,
        success: function (res) {
          wx.showModal({
            title: '提示',
            content: '复制成功',
          })
        }
      })
  }
})
