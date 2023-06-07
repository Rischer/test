<template>
  <div v-if="filmInfo">
    <i class="iconfont icon-back" @click="handleBack"></i>
    <detail-header v-scroll="50">
      {{filmInfo.name}}
    </detail-header>
    <!-- <img :src="filmInfo.poster"> -->
    <div
      :style="{
        backgroundImage: 'url(' + filmInfo.poster + ')',
      }"
      class="poster"
    ></div>
    <div class="content">
      <div>{{ filmInfo.name }}</div>
      <div>
        <div class="detail-text">{{ filmInfo.category }}</div>
        <div class="detail-text">
          {{ filmInfo.premiereAt | dateFilter }}上映
        </div>
        <div class="detail-text">
          {{ filmInfo.nation }} | {{ filmInfo.runtime }}分钟
        </div>
        <div
          class="detail-text"
          style="line-height: 20px"
          :class="isHidden ? 'hidden' : ''"
        >
          {{ filmInfo.synopsis }}
        </div>
        <div style="text-align: center">
          <i
            class="iconfont"
            @click="isHidden = !isHidden"
            :class="isHidden ? ' icon-moreunfold' : 'icon-less'"
          ></i>
        </div>
      </div>

      <!-- 演职人员 -->
      <div>
        <div>演职人员</div>
        <detail-swiper :perview="4" name="actors">
          <detail-swiper-item v-for="(data,index) in filmInfo.actors" :key="index">
            <div :style="{
              backgroundImage: 'url(' + data.avatarAddress + ')',
            }" class="avatar" ></div>
            <div class="actorname">{{data.name}}</div>
            <div style="width:5.3125rem;text-align:center;font-size:13px">{{data.role}}</div>
          </detail-swiper-item>
        </detail-swiper>
      </div>

      <!-- 剧照 -->
      <div>
        <div>剧照</div>
        <detail-swiper :perview="2" name="photos">
          <detail-swiper-item v-for="(data,index) in filmInfo.photos" :key="index">
            <div :style="{
              backgroundImage: 'url(' + data + ')',
            }" class="avatar"
            @click="handlePreview(index)"
            ></div>
          </detail-swiper-item>
        </detail-swiper>
      </div>
    </div>
  </div>
</template>
<script>
// import axios from 'axios'
import http from '@/util/http'
import moment from 'moment'
import Vue from 'vue'
import detailSwiper from '@/components/detail/DetailSwiper'
import detailHeader from '@/components/detail/DetailHeader'
import detailSwiperItem from '@/components/detail/DetailSwiperItem'

import { ImagePreview } from 'vant'
// ImagePreview(['https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg'])
Vue.use(ImagePreview)

Vue.filter('dateFilter', (date) => {
  return moment(date * 1000).format('YYYY-MM-DD')
})
Vue.directive('scroll', {
  inserted (el, binding) {
    el.style.display = 'none'

    window.onscroll = () => {
      console.log('scroll')
      if ((document.documentElement.scrollTop || document.body.scrollTop) > binding.value) {
        el.style.display = 'block'
      } else {
        el.style.display = 'none'
      }
    }
  },
  // 销毁执行
  unbind () {
    window.onscroll = null
  }
})
export default {
  data () {
    return {
      filmInfo: null,
      isHidden: true
    }
  },
  components: {
    detailSwiper,
    detailSwiperItem,
    detailHeader
  },
  created () {
    // 匹配当前路由
    console.log('created', this.$route.params.id)

    // axios 利用id 发请求到详情接口,获取详细数据,布局页面

    http({
      url: `/gateway?filmId=${this.$route.params.id}&k=5589453`,
      headers: {
        'X-Host': 'mall.film-ticket.film.info'
      }
    }).then((res) => {
      console.log(res.data.data.film)
      this.filmInfo = res.data.data.film
    })
  },
  methods: {
    handleBack () {
      this.$router.back()
    },
    handlePreview (index) {
      ImagePreview({
        images: this.filmInfo.photos,
        startPosition: index,
        closeable: true,
        closeIconPosition: 'top-left'
      })
    }
  }
  // mounted () {
  //   window.onscroll = () => {
  //     if (document.documentElement.scrollTop > 50) {
  //       console.log('显示')
  //     } else {
  //       console.log('隐藏')
  //     }
  //   }
  // },
  // destroyed () {
  //   window.onscroll = null
  // }
}
</script>
<style lang="scss" scoped>
body{
  background-color: #f4f4f4;
}
.poster {
  width: 100%;
  height: 13.125rem;
  background-position: center;
  background-size: cover;
}
.content {
  padding: 0.9375rem;
  font-size: 1.125rem;
  .detail-text {
    color: #797d82;
    font-size: 0.8125rem;
    margin-top: 0.25rem;
  }
}
.hidden {
  overflow: hidden;
  height: 38px;
}
.avatar{
  width: 100%;
  height: 5.3125rem;
  background-position: center;
  background-size: cover;
}
.actorname{
  width: 5.3125rem;
  text-align:center;
  font-size:12px;
  text-overflow:ellipsis;
  white-space:nowrap;
  overflow : hidden;
}
.icon-back{
  font-size: 30px;
  position: fixed;
  left: 10px;
  top: 7px;
  width: 1.875rem;
  height: 1.875rem;
  line-height: 1.875rem;
  border-radius: 50%;
  background-color: rgba(244, 244, 244,.5);
}
</style>
