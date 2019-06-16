<template>
  <div class="layout-container">
    <y-header>
      <div slot="nav"></div>
    </y-header>
    <div class="w">
      <div class="content">
        <div class="account-sidebar">
          <div class="avatar gray-box ">
            <div>
              <img :src="avatar"> <h5>
              {{username}}</h5></div>
            <div class="box-inner">
              <ul class="account-nav">
                <li v-for="(item,i) in nav" :key='i' :class="{current:item.name===title}"
                    @click="tab(item)">
                  <a href="javascript:;">{{item.name}}</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="account-content">
          <router-view></router-view>
        </div>
      </div>
    </div>
    <y-footer></y-footer>

  </div>

</template>
<script>
// import YFooter from '/common/footer'
import YHeader from '/components/header'
// import { mapState } from 'vuex'
import { getStore } from '/utils/storage'
// import { open } from 'fs';
export default {
  data () {
    return {
      title: '我的订单',
      nav: [
        {name: '我的订单', path: 'orderList'},
        {name: '账户资料', path: 'information'},
        {name: '收货地址', path: 'addressList'}
        // {name: '我的优惠', path: 'coupon'},
        // {name: '售后服务', path: 'support'},
        // {name: '以旧换新', path: 'aihuishou'}
      ],
      editAvatar: true,
      username: '',
      avatar: 'https://gw.alicdn.com/tps/i3/TB1yeWeIFXXXXX5XFXXuAZJYXXX-210-210.png_80x80.jpg'
    }
  },
  computed: {
  //   ...mapState(['userInfo'])
  },
  methods: {
    open (t, m) {
      this.$notify.info({
        title: t,
        message: m
      })
    },
    tab (e) {
      if (e.path === 'orderList') {
        // this.$router.push({path: '/buyer/' + e.path})
        this.open('通知', '当前页面！')
      } else {
        this.open('待开发', '此功能开发中...')
      }
    }
  },
  created () {
    this.username = getStore('username')
    let path = this.$route.path.split('/')[2]
    this.nav.forEach(item => {
      if (item.path === path) {
        this.title = item.name
      }
    })
  },
  components: {
    YHeader
  },
  watch: {
    $route (to) {
      let path = to.path.split('/')[2]
      this.nav.forEach(item => {
        if (item.path === path) {
          this.title = item.name
        }
      })
    }
  }
}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
@import "/assets/style/mixin.scss";

.w {
  padding-top: 40px;
}

.content {
  display: flex;
  height: 100%;
}

.account-sidebar {
  width: 210px;
  border-radius: 6px;
  .avatar {
    padding-top: 20px;
    border-radius: 10px;
    text-align: center;
    img {
      width: 168px;
      height: 168px;
    }
    h5 {
      font-size: 18px;
      line-height: 48px;
      font-weight: 700;
    }
  }
  .account-nav {
    padding-top: 15px;
    li {
      position: relative;
      height: 48px;
      border-top: 1px solid #EBEBEB;
      line-height: 48px;
      &:hover {
        a {
          position: relative;
          z-index: 1;
          height: 50px;
          background-color: #98AFEE;
          line-height: 50px;
          color: #FFF;
        }

      }
      a {
        display: block;
      }
      &.current {
        a {
          position: relative;
          z-index: 1;
          height: 50px;
          background-color: #98AFEE;
          line-height: 50px;
          color: #FFF;
        }
      }

    }
  }
}

.account-content {
  margin-left: 20px;
  flex: 1;
}

</style>
