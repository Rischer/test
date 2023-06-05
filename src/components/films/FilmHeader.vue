<template>
  <ul>
    <router-link to="/films/nowplaying" custom v-slot="{ navigate, isActive }">
      <li @click="navigate">
        <span :class="isActive ? 'wwactive' : ''">正在热映</span>
      </li>
    </router-link>
    <router-link to="/films/comingsoon" custom v-slot="{ navigate, isActive }">
      <li @click="navigate">
        <span :class="isActive ? 'wwactive' : ''">即将上映</span>
      </li>
    </router-link>
  </ul>
</template>

<style lang="scss" scoped>
ul{
    display: flex;
    height: 3.0625rem;
    line-height: 3.0625rem;
    li{
        flex: 1;
        text-align: center;
    }
}
.wwactive{
  color:red;
  border-bottom: 2px solid red;
  padding: .875rem 0;
}
</style>
