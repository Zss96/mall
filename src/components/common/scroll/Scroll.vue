<template>
<!-- ref如果是绑定在组件中，那么通过this.$refs.refname获取到的是一个组件对象
如果是绑定普通的元素中，那么通过this.$refs.refname获取到的是一个元素对象-->
  <div class="wrapper" ref="wrapper">
      <slot></slot>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'Scroll',
  props:{
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type:Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null
    }
  },
  methods:{
    scrollTo(x, y, time=300) {
      // this.scroll.scrollTo(x,y,time)
      //&&逻辑与，当this.scroll为null时，this.scroll.scrollTo不执行
      
      this.scroll && this.scroll.scrollTo(x,y,time)
    },
    finishPullUp() {
      this.scroll.finishPullUp
    },
    refresh() {
      // console.log(11111);
      this.scroll && this.scroll.refresh()
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0
    }
  },
  mounted() {
    //创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      probeType: this.probeType,
      click: true,
      pullUpLoad: this.pullUpLoad
    })
    //2.监听滚动的位置
   if(this.probeType ===2 || this.probeType ===3){
      this.scroll.on('scroll',(position)=>{
      // console.log(position);
      this.$emit('scroll',position)
    })
   }
    //监听scroll滚动到底部
    if(this.pullUpLoad){
      this.scroll.on('pullingUp',() => {
      // console.log('监听到滚动底部');
      this.$emit('pullingUp')
    })
    }
  }
}
</script>

<style>

</style>