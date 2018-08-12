var firstLine = '货柜号：';
var secondLine = '条 码  ，  名 称  ，  数 量 ， 价 格';
var hangnumber = ['No'];

var shelfName = '无';
var extraLine = [];
var tip = '';
var input1 = '';
var input2 = '';
var input3 = '';
var input4 = '';
var a = '';
var k = 0;
var re_ans2 = ['未找到条码'];
var re_ans3 = ['未找到名称'];

var totalprice = 0;
var messageShow = [];


var mynickName = '操作员：';
var time = '';
var DataList = {};

var taptime = 0;
var delaytime = 1500; //延时搜索数据的时长

var util = require('../../utils/util.js');


Page({
  data: {
    text_title: '条 码 ， 名 称 ， 数 量',
    text0: firstLine,
    text1: secondLine,
    hang: hangnumber,
    tip: '',
    time: '',
    shareData: {
      //title: '忘去一切',
      // desc: '超市盘点小程序',
      path: '/pages/index/index',
    }
  },
  onPullDownRefresh: function() {
    var that = this;
    that.gettime()
  },

  onShareAppMessage: function() {
    return this.data.shareData
  },
  onLoad: function() {
    var that = this;
    that.gettime()
  },

  onReady: function() {
    var that = this;
    that.myName()
    DataList = util.DataList()
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  gettime: function() {
    time = util.formatTime(new Date()),
      this.setData({
        time: util.formatTime(new Date()),
      });
    //console.log(new Date())
  },


  searchname: function(value) {
    var that = this
    re_ans2 = ['未找到条码']
    re_ans3 = ['未找到名称']
    if (value.length > 4) { //输入4个以上的字符，即可开始查找货品名称
      for (var i = 0, len = DataList.length; i < len; i++) {
        if (DataList[i].id.search(value) > -1) {
          re_ans2.push(DataList[i].id)
          re_ans3.push(DataList[i].name)
        }
      }

      if (re_ans3.length == 2) {
        this.setData({
          input2: re_ans2[1],
          input3: re_ans3[1]
        })
      } else if (re_ans3.length == 1) {
        wx.showToast({
          title: '未找到商品',
          icon: 'loading',
        })
      } else if (re_ans2.length > 5) {
        wx.showToast({
          title: '结果太多',
          icon: 'loading',
        })
      } else {
        console.log('开始选择')
        wx.showActionSheet({
          itemList: re_ans3.slice(1),
          success: function(res) {
            console.log(res, res.tapIndex)
            that.setData({
              input2: re_ans2[res.tapIndex + 1],
              input3: re_ans3[res.tapIndex + 1]
            })
          },
          fail: function(res) {
            //  console.log(res,res.errMsg)
          }
        })
      }
    } else {
      wx.showToast({
        title: '数字太少',
        icon: 'loading',
      })
    }
    return re_ans3
  },
  searchid: function(value) {
    var that = this
    re_ans2 = ['未找到条码']
    re_ans3 = ['未找到名称']
    if (value.length > 1) { //输入1个以上的字符，即可开始查找货品代码
      for (var i = 0, len = DataList.length; i < len; i++) {
        if (DataList[i].name.search(value) > -1) {
          re_ans2.push(DataList[i].id)
          re_ans3.push(DataList[i].name)
        }
      }
      if (re_ans2.length == 2) {
        this.setData({
          input2: re_ans2[1],
          input3: re_ans3[1]
        })
      } else if (re_ans2.length == 1) {
        wx.showToast({
          title: '未找到商品',
          icon: 'loading',
        })
      } else if (re_ans2.length > 5) {
        wx.showToast({
          title: '结果太多',
          icon: 'loading',
        })
      } else {
        wx.showActionSheet({
          itemList: re_ans3.slice(1),
          success: function(res) {
            console.log(res, res.tapIndex)
            that.setData({
              input2: re_ans2[res.tapIndex + 1],
              input3: re_ans3[res.tapIndex + 1]
            })
          },
          fail: function(res) {
            //  console.log(res,res.errMsg)
          }
        })
      }
    } else {
      wx.showToast({
        title: '字也太少了',
        icon: 'loading',
      })
    }

    return re_ans2
  },
  search2: function(event) {
    var that = this;
    taptime = event.timeStamp
    var timer = setTimeout(function() {
      if (Date.now() - taptime > delaytime) {
        var answer = that.searchname(event.detail.value);
      }
    }, delaytime + 1);
  },
  search3: function(event) {
    var that = this;
    taptime = event.timeStamp
    var timer = setTimeout(function() {
      if (Date.now() - taptime > delaytime) {
        var answer = that.searchid(event.detail.value);
      }
    }, delaytime + 1);
  },
  myName: function() {
    var that = this;
    wx.getUserInfo({
      success: function(res) {
        mynickName = '操作员：' + res.userInfo.nickName,
          that.setData({
            mynickName: '操作员：' + res.userInfo.nickName, //用户名        
          })
      },
    })
  },
  removeLine: function() {
    var that = this
    if (extraLine.length > 0) {

      hangnumber.pop()
      extraLine.pop()
      that.setData({
        text1: secondLine + '\n' + extraLine.join('\n'),
        tip: '提示：已删除最后一行',
        hang: hangnumber.join('\n'),
      })
      wx.showToast({
        title: '已删除最后一行',
        icon: 'success',
      })

    } else {
      wx.showToast({
        title: '没有数据可以删除',
        icon: 'success',
      })

    }
  },
  clearall: function() {
    var that = this
    wx.showModal({
      title: '注意',
      content: '确认要清空数据吗？',
      success: function(res) {
        if (res.confirm) {
          extraLine = [];
          shelfName = '无';
          hangnumber = ['No']
          that.setData({
              text1: secondLine + '\n',
              shelfName: '无',
              tip: '提示：已清空数据',
              hang: hangnumber.join('\n')
            }),
            wx.showToast({
              title: '已清空数据',
              icon: 'success',
            })
        } else if (res.cancel) {}
      }
    })

  },
  comeback: function() {
    wx.navigateTo({
      url: "../index/index"
    })
  },
  history: function() {
    wx.navigateTo({
      url: "../history/history"
    })
  },
  formBindsubmit: function(e) {
    if (shelfName == '无' && e.detail.value.inputShelfname.length == 0) {
      wx.showToast({
        title: '请输入柜名',
        icon: 'loading',
      })
      this.setData({
        tip: '新的单据请输入柜名！',
      })
    } else {
      if (e.detail.value.inputNumber.length == 0 && e.detail.value.inputShelfname.length == 0) {
        this.setData({
            tip: '提示：数量不能为空！',
          }),
          wx.showToast({
            title: '数量不能为空',
            icon: 'loading'
          })
      } else if (e.detail.value.inputNumber.length == 0 && e.detail.value.inputShelfname.length !== 0) {
        shelfName = e.detail.value.inputShelfname,
          this.setData({
            shelfName: e.detail.value.inputShelfname,
          })
        this.setData({
            tip: '提示：已修改柜号，未输入数量！',
            input1: '',
          }),
          wx.showToast({
            title: '已修改柜号',
            icon: 'success',
          })

      } else {
        //得到新的一行数据

        //得到价格
        for (var i = 0, len = DataList.length; i < len; i++) {
          if (DataList[i].id == e.detail.value.inputBarcode) {
            var price = DataList[i].price
          }
        }


        extraLine.push(e.detail.value.inputBarcode + ',' + e.detail.value.inputName + ',' + e.detail.value.inputNumber + ',' + price),
          hangnumber.push(extraLine.length)
        this.setData({
          text1: secondLine + '\n' + extraLine.join('\n'),
          tip: '',
          hang: hangnumber.join('\n'),
        })
        if (e.detail.value.inputShelfname.length != 0) {
          shelfName = e.detail.value.inputShelfname,
            this.setData({
              shelfName: e.detail.value.inputShelfname,
            })
        }
        this.formReset()
        wx.showToast({
          title: '已记录',
          icon: 'success',
        })
      }
    }
  },
  formReset: function() {
    this.setData({
        input1: '',
        input2: '',
        input3: '',
        input4: '',
      }),
      wx.showToast({
        title: '已清空输入框',
        icon: 'success',
      })
  },
  scanmycode: function(e) {
    var that = this
    input2 = '未识别',
      // 只允许从相机扫码
      wx.scanCode({
        onlyFromCamera: true,
        success: (res) => {
          this.setData({
            input2: res.result
          })
          var answer = that.searchname(res.result)
        }
      })

  },
  copyTBL: function(e) {
    var that = this;

    that.gettime()

    var timestamp = Date.parse(new Date()) / 1000;
  //  console.log(extraLine)

    //计算总金额
    totalprice = 0
   messageShow = []

    for (let i = 0, len = extraLine.length; i < len; i++) {
      var numPrice = extraLine[i].toString().split(',')
      console.log(numPrice)
      let endNum = Number(numPrice[2])
      let endPrice = Number(numPrice[3])

      //判断用户输入的是否为数字
   
      if (!(endNum>-10000)) {
        messageShow.push(numPrice[1] + '数量错误，已跳过金额合计；')
      }
      else if (!(endPrice>0)) {
        messageShow.push(numPrice[1] + '价格错误，已跳过金额合计；')
      }
      else{
      totalprice =  totalprice + endNum * endPrice

      }
      console.log(endNum, endPrice, totalprice)
    }
    totalprice = totalprice.toFixed(2)
    messageShow.push('合计金额是' + totalprice)
    wx.showModal({
      title: '合计金额',
      content: messageShow.join('\n'),
      success: function (res) {
        console.log(messageShow)
      }
    })



    var self = '时间：' + time + ' ' + firstLine + shelfName + ' 合计金额：' + totalprice + ' ' + mynickName + '\n' + extraLine.join('\n');
    wx.setStorageSync(String(timestamp), self)

    // 测试用途，储存20天前的数据  
    //    console.log(new Date() - 20 * 24 * 60 * 60, new Date() - 1)
    //   wx.setStorageSync(String(new Date() - 20 * 24 * 60 * 60), new Date() - 20 * 24 * 60 * 60)

    wx.setClipboardData({
      data: self,
      success: function(res) {
        wx.showToast({
          title: '复制成功',
        })
      }
    })
  },

})