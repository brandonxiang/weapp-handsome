import { getValidation, getVote, errorMessage, getSession } from '../../utils/service.js'


var app = getApp()
Page({
  data: {
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
    voted: false,
    username: 'brandon'
  },
  onClick: function (e) {
    if (this.data.voted) { return }
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
    getVote({
      method: "POST",
      data: {
        "user": this.data.username,
        "score": select
      },
    })
  },
  onLoad: function () {
    var that = this

    //TODO：验证用户
    wx.login({
      success: function (res) {
        console.log(res)
        if (res.code) {
          getSession({
            data: {
              appid: "wx204a3387d9fb4892",
              secret: "6d70ccf1373e45f70a624b9a5098e03e",
              js_code: res.code,
              grant_type: "authorization_code"
            },
            success: function (res) {
              console.log(res)
              that.setData({ username: res.data.openid })
              that.validation()
            },
            fail: errorMessage
          })
        } else {
          errorMessage(res)
        }
      },
      fail: errorMessage
    })
    // that.validation()
  },
  validation: function () {
    getValidation({
      method: "POST",
      data: { "openid": this.data.username },
      success: (res) => {
        console.log(res)
        this.setScore(res)
        if (res.data.user) {
          this.setData({ voted: true })
        }
      },
      fail: errorMessage
    })
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
    this.setData({ me: meScore, bluebutterfly: bluebutterflyScore })
  },
})
