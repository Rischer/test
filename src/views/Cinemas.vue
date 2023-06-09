<template>
    <div>
        <van-nav-bar title="影院" @click-left="handleLeft" @click-right="handleRight">
          <template #left>
            {{$store.state.cityName}}<van-icon name="arrow-down" color="#000"/>
          </template>
          <template #right>
            <van-icon name="search" size="22" color="#000"/>
          </template>
        </van-nav-bar>
        <div class="box">
            <ul>
                <li v-for="data in $store.state.cinemaList" :key="data.cinemaId">
                    <div class="left">
                        <div class="cinema_name">{{data.name}}</div>
                        <div class="cinema_text">{{data.address}}</div>
                    </div>
                    <div class="right cinema_text">
                        <div style="color:#ff5f16">￥{{data.lowPrice/100}}起</div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
// import http from '@/util/http'
import BetterScroll from 'better-scroll'
export default {
  data () {
    return {
      cinemaList: []
    }
  },
  mounted () {
    // 分发
    if (this.$store.state.cinemaList.length === 0) {
      this.$store.dispatch('getCinemaData', this.$store.state.cityId).then(res => {
        this.$nextTick(() => {
          new BetterScroll('.box', {
            scrollbar: {
              fade: true
            }
          })
        })
      })
    } else {
      console.log('缓存')
      this.$nextTick(() => {
        new BetterScroll('.box', {
          scrollbar: {
            fade: true
          }
        })
      })
    }

    // http({
    //   url: `/gateway?cityId=${this.$store.state.cityId}&ticketFlag=1&k=3581310`,
    //   headers: {
    //     'X-Host': 'mall.film-ticket.cinema.list'
    //   }
    // }).then(res => {
    // //   console.log(res.data.data.cinemas)
    //   this.cinemaList = res.data.data.cinemas

    //   this.$nextTick(() => {
    //     new BetterScroll('.box', {
    //       scrollbar: {
    //         fade: true
    //       }
    //     })
    //   })
    // })
  },
  methods: {
    handleLeft () {
      this.$router.push('/city')
      // 清空cinemaList
      this.$store.commit('clearCinema')
    },
    handleRight () {
      this.$router.push('/cinemas/search')
    }
  }
}
</script>
<style lang="scss" scoped>
li{
    padding: .9375rem;
    display: flex;
    justify-content: space-between;
    .left{
        width: 13.25rem;
    }
    .cinema_name{
        font-size: 15px;
    }
    .cinema_text{
        color: #797d82;
        font-size: 12px;
        margin-top: 5px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
}
.box{
    overflow: hidden;
    height: calc(100vh - 100px);
    position: relative;
    // 修正滚动条的位置
}
</style>
