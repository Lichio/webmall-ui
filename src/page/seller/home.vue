<template>
  <div class="login v2">
    <div class="wrapper">
      <div class="dialog dialog-shadow" style="display: block; margin-top: -362px;">
        <div class="title">
          <h4>WebMall 新增商品信息</h4>
        </div>
        <div v-if="loginPage" class="content">
          <ul class="common-form">
            <li class="username border-1p">
              <div class="input">
                <p style="width:100px">商品名称：</p><input type="text" v-model="ruleForm.name" placeholder="商品名称">
              </div>
            </li>
            <li class="username border-1p">
              <div class="input">
                <p style="width:100px">商品介绍：</p><input type="text" v-model="ruleForm.description" placeholder="商品介绍">
              </div>
            </li>
            <li class="username border-1p">
              <div class="input">
                <p style="width:100px">商品图片：</p><input type="text" v-model="ruleForm.picture" placeholder="商品图片">
              </div>
            </li>
            <li class="username border-1p">
              <div class="input">
                <p style="width:100px">商品数量：</p><input type="number" min=0 step=1 v-model="ruleForm.quantity" placeholder="商品数量">
              </div>
            </li>
            <li class="username border-1p">
              <div class="input">
                <p style="width:100px">商品价格：</p><input type="number" v-model="ruleForm.price" placeholder="账号">
              </div>
            </li>
            <!-- <li>
              <div class="input">
                <input type="password" v-model="ruleForm.userPwd" @keyup.enter="login" placeholder="密码">
              </div>
            </li> -->
            <!-- <li>
              <div id="captcha">
                <p id="wait">正在加载验证码...</p>
              </div>
            </li> -->
            <!-- <li style="text-align: right" class="pr">
              <el-checkbox class="auto-login" v-model="autoLogin">记住密码</el-checkbox>
              <a style="padding: 1px 0 0 10px" @click="open('待开发','此功能开发中...')">注册 </a>
              <a style="padding: 1px 0 0 10px" @click="open('待开发','此功能开发中...')">验证码登陆</a>
              <a href="javascript:;" class="register" @click="toBLogin">买家登陆 </a>
            </li> -->
          </ul>
          <!--登陆-->
          <div style="margin-top: 25px">
            <y-button :text="submittxt"
                      :classStyle="ruleForm.name&& ruleForm.description && ruleForm.picture && ruleForm.quantity && ruleForm.quantity !== 0 && ruleForm.price && ruleForm.price !== 0.0 && submittxt === '提交'?'main-btn':'disabled-btn'"
                      @btnClick="submit"
                      style="margin: 0;width: 100%;height: 48px;font-size: 18px;line-height: 48px"></y-button>
          </div>
          <!--返回-->
          <div>
            <y-button text="取消" @btnClick="cancel"
              style="marginTop: 10px;marginBottom: 15px;width: 100%;height: 48px;font-size: 18px;line-height: 48px">
            </y-button>
          </div>
          <div class="border"></div>
          <!-- <div class="footer">
            <div class="other">其它账号登录：</div>
            <a><img @click="open('待开发','此功能开发中...')" style="height: 15px; margin-top: 22px;" src="/static/images/other-login.png"></a>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import YButton from '/components/YButton'
import { newCommodity } from '/api/index.js'
import { setStore, getStore, removeStore } from '/utils/storage.js'
export default {
  data () {
    return {
      cart: [],
      loginPage: true,
      ruleForm: {
        name: '',
        description: '',
        picture: '',
        quantity: 1,
        price: 1
      },
      registered: {
        userName: '',
        userPwd: '',
        userPwd2: '',
        errMsg: ''
      },
      autoLogin: false,
      submittxt: '提交',
      statusKey: ''
    }
  },
  computed: {
    // count () {
    //   return this.$store.state.login
    // }
  },
  methods: {
    open (t, m) {
      this.$notify.info({
        title: t,
        message: m
      })
    },
    messageSuccess () {
      this.$message({
        message: '恭喜您，注册成功！赶紧登录体验吧',
        type: 'success'
      })
    },
    message (m) {
      this.$message.error({
        message: m
      })
    },
    getRemembered () {
      var judge = getStore('remember')
      if (judge === 'true') {
        this.autoLogin = true
        this.ruleForm.userName = getStore('rusername')
        this.ruleForm.userPwd = getStore('rpassword')
      }
    },
    rememberPass () {
      if (this.autoLogin === true) {
        setStore('remember', 'true')
        setStore('rusername', this.ruleForm.userName)
        setStore('rpassword', this.ruleForm.userPwd)
      } else {
        setStore('remember', 'false')
        removeStore('rusername')
        removeStore('rpassword')
      }
    },
    toHome () {
      // this.$router.push({
      //   path: '/'
      // })
      this.open('通知', '商品信息提交成功！')
      this.cancel()
      this.submittxt = '提交'
    },
    toRegister () {
      this.$router.push({
        path: '/buyer/register'
      })
    },
    toBLogin () {
      this.$router.push({
        path: '/buyer/login'
      })
    },
    toLogin2 () {
      this.$router.push({
        path: '/login2'
      })
    },
    // 登录返回按钮
    login_back () {
      this.$router.go(-1)
    },
    cancel () {
      this.ruleForm.name = ''
      this.ruleForm.description = ''
      this.ruleForm.picture = ''
    },
    // 登陆时将本地的添加到用户购物车
    login_addCart () {
      let cartArr = []
      let locaCart = JSON.parse(getStore('buyCart'))
      if (locaCart && locaCart.length) {
        locaCart.forEach(item => {
          cartArr.push({
            userId: getStore('userId'),
            productId: item.productId,
            productNum: item.productNum
          })
        })
      }
      this.cart = cartArr
    },
    submit () {
      let sellerId = getStore('sellerId')
      this.submittxt = '提交中...'
      // this.rememberPass()
      if (!this.ruleForm.name || !this.ruleForm.description || !this.ruleForm.picture || !this.ruleForm.quantity || !this.ruleForm.price) {
        // this.ruleForm.errMsg = '账号或者密码不能为空!'
        this.message('所有商品信息均不能为空!')
        return false
      }
      newCommodity(
        {
          name: this.ruleForm.name,
          description: this.ruleForm.description,
          picture: this.ruleForm.picture,
          quantity: this.ruleForm.quantity,
          price: this.ruleForm.price,
          sellerId: sellerId
        }
      ).then(res => {
        console.log(res)
        if (res.code === 200) {
          // setStore('username', res.data.username)
          // setStore('id', res.data.buyerId)
          // setStore('role', 'buyer')
          // setStore('sellerId', res.data.sellerId)
          this.toHome()
          // 登录后添加当前缓存中的购物车
          // if (this.cart.length) {
          //   for (var i = 0; i < this.cart.length; i++) {
          //     addCart(this.cart[i]).then(res => {
          //       if (res.success === true) {
          //       }
          //     })
          //   }
          //   removeStore('buyCart')
          //   this.$router.push({
          //     path: '/'
          //   })
          // } else {
          //   this.$router.push({
          //     path: '/'
          //   })
          // }
        } else {
          this.submittxt = '提交'
          this.message(res.message)
          return false
        }
      })
    }
  },
  mounted () {
    // this.getRemembered()
    // this.open('登录提示', '测试体验账号密码：test | test')
    // this.login_addCart()
  },
  components: {
    YButton
  }
}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
* {
  box-sizing: content-box;
}

.login {
  overflow-x: hidden;
  overflow-y: hidden;
  .input {
    height: 50px;
    display: flex;
    align-items: center;
    input {
      font-size: 16px;
      width: 100%;
      height: 100%;
      padding: 10px 15px;
      box-sizing: border-box;
      border: 1px solid #ccc;
      border-radius: 6px;
    }
  }
  .wrapper {
    background: url(/static/images/bg_9b9dcb65ff.png) repeat;
    background-size: 100px;
    min-height: 800px;
    min-width: 630px;
  }
}

.v2 .dialog {
  width: 900px;
  border: 1px solid #dadada;
  border-radius: 10px;
  top: 50%;
  left: 18%;
  margin-left: 0px;
  .title {
    // background: linear-gradient(#fff, #f5f5f5);
    height: auto;
    overflow: visible;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
    position: relative;
    // background-image: url(/static/images/smartisan_4ada7fecea.png);
    // background-size: 140px;
    // background-position: top center;
    // background-repeat: no-repeat;
    height: 0px;
    margin: 23px 0 50px;
    padding: 75px 0 0;
    box-shadow: none;
    h4 {
      padding: 0;
      text-align: center;
      color: #666;
      border-bottom: 1px solid #dcdcdc;
      -webkit-box-shadow: none;
      -moz-box-shadow: none;
      box-shadow: none;
      font-weight: 700;
      position: absolute;
      bottom: 0;
      width: 100%;
      text-align: center;
      margin: 0;
      padding: 0;
      border-bottom: 0;
      -webkit-box-shadow: none;
      -moz-box-shadow: none;
      box-shadow: none;
      line-height: 1em;
      height: auto;
      color: #333;
      font-weight: 400;
    }
  }
  .content {
    padding: 0 40px 22px;
    height: auto;
    .common-form {
      li {
        clear: both;
        margin-bottom: 15px;
        position: relative;
      }
    }
  }
}

.dialog-shadow,
.v2 .bbs .dialog-shadow,
.v2 .dialog-shadow {
  -webkit-box-shadow: 0 9px 30px -6px rgba(0, 0, 0, 0.2),
    0 18px 20px -10px rgba(0, 0, 0, 0.04), 0 18px 20px -10px rgba(0, 0, 0, 0.04),
    0 10px 20px -10px rgba(0, 0, 0, 0.04);
  -moz-box-shadow: 0 9px 30px -6px rgba(0, 0, 0, 0.2),
    0 18px 20px -10px rgba(0, 0, 0, 0.04), 0 18px 20px -10px rgba(0, 0, 0, 0.04),
    0 10px 20px -10px rgba(0, 0, 0, 0.04);
  box-shadow: 0 9px 30px -6px rgba(0, 0, 0, 0.2),
    0 18px 20px -10px rgba(0, 0, 0, 0.04), 0 18px 20px -10px rgba(0, 0, 0, 0.04),
    0 10px 20px -10px rgba(0, 0, 0, 0.04);
}

@media screen and (min-width: 737px),
  screen and (-webkit-max-device-pixel-ratio: 1.9) and (max-width: 736px) and (min-device-width: 737px) {
  .wrapper {
    background: url(/static/images/con-bg_04f25dbf8e.jpg) repeat-x;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .dialog {
    background: url(/static/images/dialog-gray-bg.png) #fff bottom repeat-x;
    border-radius: 12px;
    display: none;
    margin: -163px 0 0 -218px;
    width: 436px;
    position: fixed;
    left: 50%;
    top: 50%;
  }
  .dialog .title h4 {
    border-bottom: #d1d1d1 solid 1px;
    box-shadow: 0 2px 6px #d1d1d1;
    color: #666;
    font-size: 20px;
    height: 61px;
    line-height: 61px;
    padding: 0 0 0 35px;
  }
  .common-form li {
    clear: both;
    margin-bottom: 15px;
    position: relative;
  }
  .auto-login {
    position: absolute;
    top: 0px;
    left: 2px;
    color: #999;
  }
  .register {
    padding: 1px 10px 0;
    border-right: 1px solid #ccc;
  }
  .border {
    margin-top: 10px;
    border-bottom: 1px solid #ccc;
  }
  .other {
    margin: 20px 5px 0 0;
    width: auto;
    color: #bbb;
    font-size: 12px;
    cursor: default;
    color: #999;
  }
  .footer {
    display: flex;
    flex-direction: row;
  }
  .agree {
    margin-bottom: 30px;
    color: #999;
  }
}

.registered {
  h4 {
    padding: 0;
    text-align: center;
    color: #666;
    border-bottom: 1px solid #dcdcdc;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
    font-weight: 700;
    font-size: 20px;
    height: 60px;
    line-height: 60px;
  }
}

#wait {
  text-align: left;
  color: #999;
  margin: 0;
}
</style>
