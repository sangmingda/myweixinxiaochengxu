// pages/index2/index2.js

var firstLine= '货柜号：';
var secondLine='条码 名称 数量';
var shelfName = [];
var extraLine = [];
var tip='';
var barcode='未识别';
var mynickName ='操作员';
Page({

  data: {
    text0: firstLine,
    text1:secondLine,   
    tip: '',
  },
  myName: function () {
    wx.getUserInfo({
      success: function (res) {
        mynickName= res.userInfo.nickName, //用户名        
        console.log(mynickName)
        //console.log(res.userInfo.nickName)        
      },      
    }),
      this.setData({
        mynickName: mynickName, //用户名        
      }),
      this.setData({
        mynickName: mynickName, //用户名        
      })
  },
  

  removeLine: function (e) {
    if (extraLine.length > 0) {
      extraLine.pop()
      this.setData({
        text1: secondLine + '\n' + extraLine.join('\n'),
        tip: '已删除最后一行',
      })
    }
  },
  formBindsubmit: function (e) {
    if (e.detail.value.inputNumber.length == 0) {
      this.setData({
        tip: '提示：数量不能为空！',
      })

    } else {
      extraLine.push(e.detail.value.inputBarcode + ',' + e.detail.value.inputName+','+e.detail.value.inputNumber),
      //extraLine.push(e.detail.value.inputName),
      //extraLine.push(e.detail.value.inputNumber+'\n'),
      //extraLine.push('\n'),
      this.setData({
        text1: secondLine + '\n' + extraLine.join('\n'),
        tip: '',
      })
      if (e.detail.value.inputShelfname.length != 0) {
        //shelfName.push(e.detail.value.inputShelfname)
        this.setData({
          shelfName: e.detail.value.inputShelfname+'\n',
        })
      }
      console.log( tip, extraLine)
    }
  },
  formReset: function () {
    this.setData({
      tip: '',
      inputBarcode: '',
      inputName: '',
      inputNumber: ''
    })
    console.log(tip, extraLine)    
  },
  scanmycode: function (e) {
    barcode = '未识别',
    // 只允许从相机扫码
    wx.scanCode({
      onlyFromCamera: true,
      success: (res) => {
        console.log(res)
        this.setData({
          barcode: res.result
        })
      }
    })
  },
  copyTBL: function (e) {
    var self = firstLine + shelfName + ' ' + mynickName  + '\n' + extraLine.join('\n');
    console.log(self, mynickName),
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
})