import { getValidation, getVote } from '../../utils/service.js'

//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    //请点击你认为比较帅的头像
    description: '请点击你认为比较帅的头像',
    votedResult: '投票结果',
    bluebutterfly: {
      name: 'bluebutterfly',
      src: '../../asset/mochan.jpg',
      score: 0
    },
    me: {
      name: 'me',
      src: '../../asset/melonpi.jpg',
      score: 0
    },
    voted: false
  },
  onClick: function (e) {
    if (this.data.voted) { return }
    console.log(e.currentTarget.dataset)
    const select = e.currentTarget.dataset.select
    if (select === "me") {
      const newScore = this.data.me
      newScore.score = newScore.score + 1
      this.setData({ voted: true, me: newScore })
    } else if (select === "bluebutterfly") {
      const newScore = this.data.bluebutterfly
      newScore.score = newScore.score + 1
      this.setData({ voted: true, bluebutterfly: newScore })
    }

    //TODO：发送至服务器post
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this

    //TODO：验证用户
    //写死用户名
    const username = 'martin'
    getValidation({
      method: "POST",
      data: { "openid": username },
      success: (res) => {
        console.log(res)
        this.setScore(res)
        if (res.data.user) {
          this.setData({ voted: true})
        }

      }
    })


    // wx.getUserInfo({
    //   success: function (res) {
    //     // success
    //     console.log(res)
    //   },
    //   fail: function () {
    //     // fail
    //   },
    //   complete: function () {
    //     // complete
    //   }
    // })
  },
  setScore: function (res) {
    const score = res.data.score
    const meScore = this.data.me
    const bluebutterflyScore = this.data.bluebutterfly
    for (var i in score) {
      if (score[i][0] === "me") {
        meScore.score = score[i][1]
      } else if (score[i][0] === "bluebutterfly") {
        bluebutterflyScore.score = score[i][1]
      }
    }
    this.setData({me: meScore, bluebutterfly: bluebutterflyScore})
  }

})
