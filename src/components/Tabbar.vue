<template>
  <footer>
    <ul>
      <router-link to="/films" custom v-slot="{ navigate, isActive }">
        <li @click="navigate" :class="isActive ? 'wwactive' : ''">
          <i class="iconfont icon-video"></i>
          <span>电影</span>
        </li>
      </router-link>
      <router-link to="/cinemas" custom v-slot="{ navigate, isActive }">
        <li @click="navigate" :class="isActive ? 'wwactive' : ''">
          <i class="iconfont icon-all"></i>
          <span>影院</span>
        </li>
      </router-link>
      <router-link to="/center" custom v-slot="{ navigate, isActive }">
        <li @click="navigate" :class="isActive ? 'wwactive' : ''">
          <i class="iconfont icon-account"></i>
          <span>我的</span>
        </li>
      </router-link>
    </ul>
  </footer>
</template>
<script>
import '@/assets/iconfont/iconfont.css'
export default {}
</script>
<style lang="scss" scoped>
footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3.0625rem;
  background: white;
  z-index: 100;
  ul {
    display: flex;
    li {
      flex: 1;
      line-height: 1.5625rem;
      text-align: center;
      display: flex;
      flex-direction: column;
      i{
        font-size: 20px;
      }
      span{
        font-size: 16px;
      }
    }
  }
}
.wwactive{
  color:red
}
</style>
