var myShelfname='未填写'

var myData=['124','名称','13']

var hang=0

var tip = ''
var initData = 'this is first line\nthis is second line'
var extraLine = [];

Page({
  data: {
    text: initData,
    // text:"这是一个页面"
    tip: '',
    inputShelfname: '',
    inputBarcode: '',
    inputName: '',
    inputNumber: '',
    myData: ['124', '名称', '13',
     '124', '名称', '13'],
    listData: [
      { "code": "01", "text": "text1", "type": "type1" },
      { "code": "02", "text": "text2", "type": "type2" },
      { "code": "03", "text": "text3", "type": "type3" },
      { "code": "04", "text": "text4", "type": "type4" },
      { "code": "05", "text": "text5", "type": "type5" },
      { "code": "06", "text": "text6", "type": "type6" },
      { "code": "07", "text": "text7", "type": "type7" }
    ],
    tables: [
      ['标题1', '标题2', '标题3', '标题4', '标题5', '标题6'],
      ['内容1', '内容2', '内容3', '内容4', '内容5', '内容6'],
      ['内容1', '内容2', '内容3', '内容4', '内容5', '内容6'],
      ['内容1', '内容2', '内容3', '内容4', '内容5', '内容6'],
    ],
    iconSize: [20, 30, 40, 50, 60, 70],
    iconColor: [
      'red', 'orange', 'yellow', 'green', 'rgb(0,255,255)', 'blue', 'purple'
    ],
    iconType: [
      'success', 'success_no_circle', 'info', 'warn', 'waiting', 'cancel', 'download', 'search', 'clear'
    ]
  },
  add: function (e) {
    extraLine.push('other line')
    this.setData({
      text: initData + '\n' + extraLine.join('\n')
    })
  },
  remove: function (e) {
    if (extraLine.length > 0) {
      extraLine.pop()
      this.setData({
        text: initData + '\n' + extraLine.join('\n')
      })
    }
  },
  onLoad: function () {
 
    console.log('onLoad ',tip)
  },

  formBindsubmit: function (e) {
    if (e.detail.value.inputNumber.length == 0 ) {
      this.setData({
        tip: '提示：数量不能为空！',
      })
      
    } else {
      this.setData({        
        hang:hang+1,
        myBarcode: e.detail.value.inputBarcode,
        myName:e.detail.value.inputName,
        myNumber:e.detail.value.inputNumber,
        tip: ''
      })
      if (e.detail.value.inputShelfname.length != 0) {
        this.setData({
          myShelfname: e.detail.value.inputShelfname,
        })
      }
      console.log(hang, myBarcode, myName, myNumber, tip, myShelfname)
    }
  },
  formReset: function () {
    this.setData({
      tip: '',
      inputBarcode: '',
      inputName: '',
      inputNumber: ''
    })
    console.log(hang, myBarcode, myName, myNumber, tip, myShelfname)
  },
  openModel(e) {
    let id = e.target.dataset.id;
    this.setData({
      titles: this.data.tables[0],
      cols: this.data.tables[id],
      id: id,
      show: true
    });
  }, 
  editModel(e) {
    let tables = this.data.tables;
    tables[this.data.id] = this.data.cols;

    this.setData({
      tables: tables,
      show: false
    });

  },
  data: {
    nodes: [{
      name: 'div',
      attrs: {
        class: 'div_class',
        style: 'line-height: 60px; color: red;'
      },
      children: [{
        type: 'text',
        text: 'Hello World!'
      }]
    }]
  },
  tap() {
    console.log('tap')
  },
  data: {
    items: [
      { name: 'USA', value: '美国' },
      { name: 'CHN', value: '中国', checked: 'true' },
      { name: 'BRA', value: '巴西' },
      { name: 'JPN', value: '日本' },
      { name: 'ENG', value: '英国' },
      { name: 'TUR', value: '法国' },
    ]
  },
  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
  }, 
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  formReset: function () {
    console.log('form发生了reset事件')
  },
  data: {
    focus: false,
    inputValue: ""
  },
  bindButtonTap: function () {
    this.setData({
      focus: true
    })
  },
  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  bindReplaceInput: function (e) {
    var value = e.detail.value;
    var pos = e.detail.cursor;
    if (pos != -1) {
      //光标在中间
      var left = e.detail.value.slice(0, pos);
      //计算光标的位置
      pos = left.replace(/11/g, '2').length;
    }

    //直接返回对象，可以对输入进行过滤处理，同时可以控制光标的位置
    return {
      value: value.replace(/11/g, '2'),
      cursor: pos
    }

    //或者直接返回字符串,光标在最后边
    //return value.replace(/11/g,'2'),
  },
  
})