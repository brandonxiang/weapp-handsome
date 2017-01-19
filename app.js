// import {Realtime} from './libs/realitime.weapp.min.js'

// const realtime = new Realtime({
//   appId: 'y60fkVyc62IFBawBOizTK3kY-gzGzoHsz',
//   noBinary: true,
// })

// import AV from './libs/av-weapp-min.js'

// AV.init({
//   appId: 'y60fkVyc62IFBawBOizTK3kY-gzGzoHsz', 
//   appKey: 'LMvhJY4xeuRv0EVP52PWAvyO',
// })

//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo:function(cb){
    var that = this;
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo;
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      });
    }
  },
  globalData:{
    userInfo:null
  }
})
