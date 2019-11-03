<template>
  <swiper>
    <Swiperitem v-for="item in banners">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imgLoad">
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
    data() {
      return {
        isLoad: false
      }
    },
    components: {
      Swiper,
      Swiperitem
    },
    methods: {
      imgLoad() {
        if(!this.isLoad){
          this.$emit('swiperImgLoad')
          this.isLoad=true
        }        
      }
    }
  }
</script>

<style scoped>

</style>
