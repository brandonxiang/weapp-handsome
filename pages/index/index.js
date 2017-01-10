//index.js
//获取应用实例
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    //请点击你认为比较帅的头像
    description:'请点击你认为比较帅的头像',
    bluebutterfly:{
      name:'bluebutterfly',
      src:'../../asset/mochan.jpg',
      score:{}
    },
    me:{
      name:'me',
      src:'../../asset/melonpi.jpg',
      score:{}
    }
  },
  onClick: function(e) {
    console.log(e)
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this

   
  }
})
