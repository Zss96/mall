<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view/>
    </keep-alive>
    <Maintabbar/>
  
  </div>
</template>
<script>
  import Maintabbar from 'components/content/mainTabbar/MainTabBar'
  export default {
    name: 'app',
    components:{
      Maintabbar,
    }
  }
</script>
<style>
  @import "./assets/css/base.css";

</style>
