//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    //请点击你认为比较帅的头像
    description: '请点击你认为比较帅的头像',
    bluebutterfly: {
      name: 'bluebutterfly',
      src: '../../asset/mochan.jpg',
      score: 100
    },
    me: {
      name: 'me',
      src: '../../asset/melonpi.jpg',
      score:101
    },
    voted:true
  },
  onClick: function (e) {
    console.log(e)
    // app.getUserInfo(function(userinfo,rawData,signature,encryptedData,iv){
    //   console.log(userinfo)
    //   console.log(rawData)
    //   console.log(signature)
    //   console.log(encryptedData)
    //   console.log(iv)
    // })
    wx.getUserInfo({
      success: function(res){
        // success
        console.log(res)
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this


  }
})
