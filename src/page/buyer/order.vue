<template>
  <div>
    <y-shelf title="我的订单">
      <div slot="content">
        <div v-loading="loading" element-loading-text="加载中..." v-if="orderList.length" style="min-height: 10vw;">
          <div v-for="(item,i) in orderList" :key="i">
            <div class="gray-sub-title cart-title">
              <div class="first">
                <div>
                  <span class="date" v-text="item.createTime.slice(0,19).replace('T',' ')"></span>
                  <span class="order-id"> 订单号： <a @click="orderDetail(item.orderSn)">{{item.orderSn}}</a> </span>
                </div>
                <div class="f-bc">
                  <span class="price">单价</span>
                  <span class="num">数量</span>
                  <span class="operation">商品操作</span>
                </div>
              </div>
              <div class="last">
                <span class="sub-total">实付金额</span>
                <span class="order-detail"> <a @click="orderDetail(item.orderSn)">查看详情 ><em class="icon-font"></em></a> </span>
              </div>
            </div>
            <div class="pr">
              <div class="cart" >
                <div class="cart-l" :class="{bt:true}">
                  <div class="car-l-l">
                    <div class="img-box"><a @click="goodsDetails(item.commodityId)"><img :src="item.picture" alt=""></a></div>
                    <div class="ellipsis"><a style="color: #626262;" @click="goodsDetails(item.commodityId)">{{item.name}}</a></div>
                  </div>
                  <div class="cart-l-r">
                    <div>¥ {{Number(item.price).toFixed(2)}}</div>
                    <div class="num">{{item.quantity}}</div>
                    <div class="type">
                      <el-button style="margin-left:20px" @click="_delOrder(item.orderSn,i)" type="danger" size="small" v-if=true class="del-order">删除此订单</el-button>
                      <!-- <a @click="_delOrder(item.orderId,i)" href="javascript:;" v-if="j<1" class="del-order">删除此订单</a> -->
                    </div>
                  </div>
                </div>
                <div class="cart-r">
                  <span></span>
                  <span></span>
                </div>
              </div>
              <div class="prod-operation pa" style="right: 0;top: 0;">
                <div class="total">¥ {{item.totalValue}}</div>
                <div v-if="item.status === 0">
                  <el-button @click="orderPayment(item.orderSn)" type="primary" size="small">现在付款</el-button>
                </div>
                <div class="status" v-if="item.status !== 0"> {{getOrderStatus(item.status)}}  </div>
              </div>
            </div>
          </div>
        </div>
        <div v-loading="loading" element-loading-text="加载中..." class="no-info" v-else>
          <div style="padding: 100px 0;text-align: center">
            你还未创建过订单
          </div>
        </div>
      </div>
    </y-shelf>
    <div style="float:right">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { orderList, deleteOrder } from '/api/index.js'
import YShelf from '/components/shelf'
import { getStore } from '/utils/storage'
// import { open } from 'fs';
export default {
  data () {
    return {
      orderList: [0],
      userId: '',
      orderStatus: '',
      loading: true,
      currentPage: 1,
      pageSize: 5,
      total: 0
    }
  },
  methods: {
    open (t, m) {
      this.$notify.info({
        title: t,
        message: m
      })
    },
    message (m) {
      this.$message.error({
        message: m
      })
    },
    handleSizeChange (val) {
      this.pageSize = val
      this._orderList()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this._orderList()
    },
    orderPayment (orderId) {
      // window.open(window.location.origin + '#/order/payment?orderId=' + orderId)
      this.open('待开发', '此功能开发中...')
    },
    goodsDetails (id) {
      window.open(window.location.origin + '#/buyer/goodsDetails?commodityId=' + id)
    },
    // -------------------
    orderDetail (orderSn) {
      this.$router.push({
        path: '/buyer/orderDetails',
        query: {
          orderSn: orderSn
        }
      })
    },
    getOrderStatus (status) {
      if (status === 1) {
        return '支付成功'
      } else if (status === 2) {
        return '待发货'
      } else if (status === 3) {
        return '待收货'
      } else if (status === 4) {
        return '交易成功'
      } else if (status === 5) {
        return '交易关闭'
      } else if (status === 6) {
        return '支付失败'
      }
    },
    _orderList () {
      // let params = {
      //   params: {
      //     userId: this.userId,
      //     size: this.pageSize,
      //     page: this.currentPage
      //   }
      // }
      orderList({
        buyerId: this.userId,
        pageSize: this.pageSize,
        pageNumber: this.currentPage - 1
      }).then(res => {
        console.log(res)
        this.orderList = res.data.content
        this.total = res.data.totalElements
        this.loading = false
      })
    },
    _delOrder (orderSn, i) {
      // let params = {
      //   params: {
      //     orderId: orderId
      //   }
      // }
      deleteOrder({
        params: {
          orderSn: orderSn
        }
      }).then(res => {
        if (res.code === 200) {
          this.orderList.splice(i, 1)
        } else {
          this.message('删除失败')
        }
      })
    }
  },
  created () {
    this.userId = getStore('id')
    this._orderList()
  },
  components: {
    YShelf
  }
}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
@import "/assets/style/mixin.scss";

.gray-sub-title {
  height: 38px;
  padding: 0 24px;
  background: #EEE;
  border-top: 1px solid #DBDBDB;
  border-bottom: 1px solid #DBDBDB;
  line-height: 38px;
  font-size: 12px;
  color: #666;
  display: flex;
  span {
    display: inline-block;
    height: 100%;
  }
  .first {
    display: flex;
    justify-content: space-between;
    flex: 1;
    .f-bc {
      > span {
        width: 112px;
        text-align: center;
      }
    }
  }
  .last {
    width: 230px;
    text-align: center;
    display: flex;
    border-left: 1px solid #ccc;
    span {
      flex: 1;
    }
  }
}

.bt {
  border-top: 1px solid #EFEFEF;
}

.date {
  padding-left: 0px;
}

.order-id {
  margin-left: 25px;
}

.cart {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  &:hover {
    .del-order {
      display: block;
    }
  }
  .del-order {
    display: none;
  }
  .cart-l {
    display: flex;
    align-items: center;
    flex: 1;
    padding: 15px 0;
    justify-content: space-between;
    position: relative;
    &:before {
      position: absolute;
      content: ' ';
      right: -1px;
      top: 0;
      width: 1px;
      background-color: #EFEFEF;
      height: 100%;
    }
    .ellipsis {
      margin-left: 20px;
      width: 220px;
    }
    .img-box {
      border: 1px solid #EBEBEB;
    }
    img {
      display: block;
      @include wh(80px);
    }
    .cart-l-r {
      display: flex;
      > div {
        text-align: center;
        width: 112px;
      }
    }
    .car-l-l {
      display: flex;
      align-items: center;
    }
  }
  .cart-r {
    width: 230px;
    display: flex;
    span {
      text-align: center;
      flex: 1;
    }
  }
}

.prod-operation {
  height: 110px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 254px;
  div {
    width: 100%;
    text-align: center;
  }
  div:last-child {
    padding-right: 24px;
  }
}
</style>
