import Vue from 'vue'
import VueRouter from 'vue-router'
import Films from '@/views/Films'
import Nowplaying from '@/views/films/Nowplaying'
import Detail from '@/views/Detail'
import Comingsoon from '@/views/films/Comingsoon'
import Cinemas from '@/views/Cinemas'
import Search from '@/views/Search'
// import Center from '@/views/Center'
import Login from '@/views/Login'

Vue.use(VueRouter) // 注册路由插件，两个全局router-view router-link

// 配置表
const routes = [
  {
    path: '/films',
    component: Films,
    // 嵌套路由
    children: [
      {
        path: '/films/nowplaying',
        component: Nowplaying
      },
      {
        path: '/films/comingsoon',
        component: Comingsoon
      },
      {
        path: '/films',
        redirect: '/films/nowplaying'
      }
    ]
  },
  {
    name: 'wwDetail', // 命名路由
    path: '/detail/:id', // 动态二级路由
    component: Detail
  },
  {
    path: '/cinemas',
    component: Cinemas
  },
  {
    path: '/cinemas/search',
    component: Search
  },
  {
    path: '/center',
    component: () => import('@/views/Center'), // 路由懒加载
    meta: {
      isRequired: true
    }
    // 路由独享拦截
    // beforeEnter: (to, from, next) => {
    //   if (localStorage.getItem('token')) {
    //     next()
    //   } else {
    //     next('/login')
    //   }
    // }
  },
  {
    path: '/login',
    component: Login
  },
  // 重定向
  {
    path: '*',
    redirect: '/films'
  }
]

const router = new VueRouter({
  // mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  // to 将访问哪一个路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数,表示放行
  console.log(to)
  if (to.meta.isRequired) {
    // 判断 本地存储中是否有token
    if (localStorage.getItem('token')) {
      next()
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }
  } else {
    next()
  }
})

export default router
