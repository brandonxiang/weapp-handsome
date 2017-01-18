const host = 'http://brandonhandsome.applinzi.com/'

const wxRequest = (params, url) => {
  wx.showToast({
    title: '加载中',
    icon: 'loading'
  })
  wx.request({
    url: url,
    method: params.method || 'GET',
    data: params.data || {},
    header: {
      'Content-Type': 'application/json'
    },
    success: (res) => {
      params.success && params.success(res)
      wx.hideToast()
    },
    fail: (res) => {
      params.fail && params.fail(res)
    },
    complete: (res) => {
      params.complete && params.complete(res)
    }
  })
}

const getValidation = (params) => wxRequest(params, host + "validation")

const getVote = (params) => wxRequest(params, host + "vote")

const getSession = (params) =>wxRequest(params, "https://api.weixin.qq.com/sns/jscode2session")

const errorMessage = (err) => {
  wx.showModal({
    title: '错误',
    content: err.errMsg
  })
}

module.exports = {
  getValidation,
  getVote,
  errorMessage,
  getSession
}