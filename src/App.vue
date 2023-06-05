<template>
  <div id="app">
    <tabbar></tabbar>
    <!-- 路由容器 -->
    <section>
      <router-view></router-view>
    </section>
  </div>
</template>
<script>
import tabbar from '@/components/Tabbar'
export default {
  data () {
    return {

    }
  },
  components: {
    tabbar
  }
}
</script>
<style lang="scss">
*{
  margin: 0;
  padding: 0;
}
html,body{
  height: 100%;
}
ul{
  list-style: none;
}
section{
  padding-bottom: 3.0625rem;
}
</style>
