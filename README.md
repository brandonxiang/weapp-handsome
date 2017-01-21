# weapp-handsome
A weapp to determine who is more handsome

该库为小程序[brandonxiang/weapp-handsome-backend](https://github.com/brandonxiang/weapp-handsome-backend/)的后端部分。

TODO:

- ~~验证用户信息~~
- ~~（已投票的直接显示结果，未投票保持投票状态）~~
- ~~发送结果保存到后端~~

# 微信小程序笔记三：彩蛋“谁更帅”

> 前端源码github地址在此，记得点星：
https://github.com/brandonxiang/weapp-handsome

> 后端源码github地址在此，记得点星：
hhttps://github.com/brandonxiang/weapp-handsome-backend

## 构思

毕竟是个彩蛋，整个构思来自一个“玩笑”。这个玩笑就是“比谁更帅”的一个投票App，缘由看下方图片。

![缘由](http://upload-images.jianshu.io/upload_images/685800-c3014c724e536aa3.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

那么一个简单的双人投票应用需要考虑哪些方面。


### UI界面
整个界面需要非常简洁。由于手机屏幕是纵向，希望头像是上下布局。用户可以非常清晰的看到候选者的颜值。与此同时，操作也非常简单。直接点击认为比较帅的头像，完成投票，显示结果。结果的显示也很简洁，右上角出现小红点，直接显示数据结果。

![界面](http://upload-images.jianshu.io/upload_images/685800-31359de87b84f084.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 编码

前端采用flex的布局。考虑到每个微信用户只能投一票。在初始化的过程中，小程序需要进行登陆`wx.login`，拿到对应的code。再通过腾讯的rest服务`https://api.weixin.qq.com/sns/jscode2session`获取唯一的openid。

```
wx.login({
      success: function (res) {
        console.log(res)
        if (res.code) {
          getSession({
            data: {
              appid: "你的appid",
              secret: "你的appsecret",
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
```

由于openid是每个用户唯一值，接下来就是业务逻辑的问题。参考后端的表结构。

##小结

考虑到大家的身心健康，该小程序最终还是不上线。

转载，请表明出处。[总目录跨平台快速开发](http://www.jianshu.com/p/0348e33fb9d0)

![请关注我的微信公众号](http://upload-images.jianshu.io/upload_images/685800-b90086f21952919c.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
