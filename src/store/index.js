import Vue from 'vue'
import Vuex from 'vuex'
import http from '@/util/http'

Vue.use(Vuex)

export default new Vuex.Store({
  // state公共状态
  state: {
    cityId: '310100',
    cityName: '上海',
    cinemaList: []
  },
  // 支持异步和同步
  actions: {
    getCinemaData (store, cityId) {
      return http({
        url: `/gateway?cityId=${cityId}&ticketFlag=1&k=3581310`,
        headers: {
          'X-Host': 'mall.film-ticket.cinema.list'
        }
      }).then(res => {
        store.commit('changeCinemaData', res.data.data.cinemas)
      })
    }
  },
  // 统一管理， 被devtools 记录状态的修改
  // 只能支持同步
  mutations: {
    changeCityName (state, cityName) {
      state.cityName = cityName
    },
    changeCityId (state, cityId) {
      state.cityId = cityId
    },
    changeCinemaData (state, data) {
      state.cinemaList = data
    },
    clearCinema (state) {
      state.cinemaList = []
    }
  }
})
// vuex 管理保存公共状态，（分散在各个组件内的状态，统一管理，)

// 注意：
// vuex 默认是管理在内存，一刷新页面，公共状态就丢失了。
// vuex 持久化-todo

/* vuex项目应用

  1．非父子的通信
  2．后端数据的缓存快照，减少重复数据请求，减轻服务器压力，提高用户体验

*/
