<template>
    <div class="cart">
      <nav-bar class="nav-bar">
        <div slot="center">购物车({{cartLenth}})</div>
      </nav-bar>
      <cart-list />

      <cart-bottom-bar />
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import NavBar from 'components/common/navbar/NavBar'

import CartList from './childComps/CartList'
import CartBottomBar from './childComps/CartBottomBar'

  export default {
    name: "Cart",
    components: {
      NavBar,
      CartList,
      CartBottomBar
    },
    computed: {
      //两种语法
      // ...mapGetters(['cartLenth','cartList'])
      ...mapGetters({
        cartLenth: 'cartLenth',//改名
        list: 'cartList'
      })
    }
  }
</script>

<style scoped>
  .cart {
    height: 100vh;
  }
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
    font-weight: 700;
  }
</style>
