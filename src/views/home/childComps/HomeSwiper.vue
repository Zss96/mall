<template>
  <swiper>
    <Swiperitem v-for="item in banners">
      <a :href="item.link">
        <img :src="item.image" alt="">
      </a>
    </Swiperitem>
  </swiper>
</template>

<script>
  import {Swiper, Swiperitem} from 'components/common/swiper'

  export default {
    name: "HomeSwiper",
    props: {
      banners: {
        type: Array,
        default() {
          return []
        }
      }
    },
    components: {
      Swiper,
      Swiperitem
    }
  }
</script>

<style scoped>

</style>
