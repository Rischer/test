<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="我是有底线的"
      @load="onLoad"
      :immediate-check="false"
    >
      <van-cell v-for="data in datalist" :key="data.filmId" @click="handleChangePage(data.filmId)">
        <img :src="data.poster" />
        <div>
          <div class="title">{{ data.name }}</div>
          <div class="content">
            <div class="grade" :class="data.grade?'':'hidden'">观众评分  <span>{{data.grade}}</span></div>
            <div class="actors">主演：{{data.actors | actorsFilter}}</div>
            <div>
              {{data.nation}} | {{data.runtime}}分钟
            </div>
          </div>
        </div>
      </van-cell>
    </van-list>
  </div>
</template>
<script>
// import axios from 'axios'
import Vue from 'vue'
import http from '@/util/http'

Vue.filter('actorsFilter', (data) => {
  if (data === undefined) return '暂无主演'
  return data.map(item => item.name).join(' ')
})
export default {
  data () {
    return {
      datalist: [],
      loading: false,
      finished: false,
      current: 1,
      total: 0
    }
  },
  mounted () {
    // http.httpForList().then((res) => {
    http({
      url: '/gateway?cityId=310100&pageNum=1&pageSize=10&type=1&k=9316576',
      headers: {
        'X-Host': 'mall.film-ticket.film.list'
      }
    }).then((res) => {
      console.log(res.data.data.films)
      this.datalist = res.data.data.films

      this.total = res.data.data.total
    })
  },
  methods: {
    onLoad () {
      // 总长度 匹配, 禁用懒加载
      // console.log('到底了')
      if (this.datalist.length === this.total && this.total !== 0) {
        this.finished = true
        return
      }

      this.current++
      http({
        url: `/gateway?cityId=310100&pageNum=${this.current}&pageSize=10&type=1&k=9316576`,
        headers: {
          'X-Host': 'mall.film-ticket.film.list'
        }
      }).then((res) => {
        // console.log(res.data.data.films)
        this.datalist = [...this.datalist, ...res.data.data.films]

        // loading主动设置成false
        this.loading = false
      })
    },
    handleChangePage (id) {
      // 编程式导航
      // location.href = '#/detail'

      // /detail/1111
      // 1-通过路径跳转
      // this.$router.push(`/detail/${id}`)

      // 2-通过命名路由跳转
      this.$router.push({
        name: 'wwDetail',
        params: {
          id
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.van-list{
  .van-cell{
    overflow: hidden;
    padding: 15px;
    img{
      float: left;
      width: 4.125rem;
      margin-right: 10px;
    }
    .content{
      font-size: .8125rem;
      color: #797d82;
      .grade{
        span{
          color: #ffb232;
          font-size: .875rem;
        }
      }
      .actors{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 12.5rem;
      }
    }
  }
}
.hidden{
  visibility: hidden;
}
</style>
