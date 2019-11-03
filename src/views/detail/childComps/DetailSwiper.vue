<template>
    <div>
         <swiper class="detail-swiper">
             <Swiperitem  v-for="item in topImages" :key="item">
                <img :src="item" alt="">
            </Swiperitem>
        </swiper>
    </div>
</template>

<script>
import {Swiper, Swiperitem} from 'components/common/swiper'
export default {
    name: 'DetailSwriper',
    components: {
        Swiper,
        Swiperitem
    },
    props: {
        topImages: {
            type: Array,
            default() {
                return []
            }
        }
    }

}
</script>

<style scoped>
  .detail-swiper {
    height: 300px;
    overflow: hidden;
  }
</style>