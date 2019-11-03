<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
     <tab-control :titles="['流行','新款','精选']" 
        @tabClick="tabClick" ref="tabControl1" class="tab-control" v-show="isTabFixed"/>
    <scroll class="content" ref="scroll" :probe-type="3" :pull-up-load="true"
        @scroll="contentScroll" @pullingUp="loadMore">
        <home-swiper :banners="banners" @swiperImgLoad="swiperImgLoad"/>
        <recommend-view :recommends="recommends"/>
        <Featureview/>
        <tab-control :titles="['流行','新款','精选']" 
        @tabClick="tabClick" ref="tabControl2" />
        <Goodslist :goods="goods[currentType].list"/>
    </scroll>
    <back-top  @click.native="backClick" v-show="isShowBack"/>
  </div>
</template>

<script>

  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import Featureview from './childComps/FeatureView'

  import NavBar from 'components/common/navbar/NavBar';
  import TabControl from 'components/content/tabControl/TabControl'
  import Goodslist from 'components/content/goods/GoodsList'
  import Scroll from 'components/common/scroll/Scroll'
  import BackTop from 'components/content/backTop/BackTop'

  import {getHomeMultidata,getHomeGoods} from "network/home";
  import {debounce} from 'common/utils'
  // import BScroll from 'better-scroll'


  export default {
    name: "Home",
    components: {
      NavBar,
      HomeSwiper,
      RecommendView,
      Featureview,
      TabControl,
      Goodslist,
      Scroll,
      BackTop
    },
    data() {
      return {
        banners: [],//用于保存url请求函数的值，因为函数执行完了，函数就会再栈中弹出，会回收
        recommends: [],
        goods: {
          'pop':{page:0,list:[]},
          'new':{page:0,list:[]},
          'sell':{page:0,list:[]},
        },
        currentType: 'pop',
        isShowBack: false,
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0,
        homeItemListener: null
      }
    },
    created() {
      //首页创建完就发送网络请求
      // 1.请求多个数据
      this.getHomeMultidata()

      //2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')

    },
    mounted(){
      //图片加载完成的事件监听
      const newrefresh =debounce(this.$refs.scroll.refresh, 100)
      //在mounted中保证这个this.scroll不为空

      this.homeItemListener = () => {
        // this.$refs.scroll.scroll.refresh()
        newrefresh(20,30)
      }
        //3.监听item图片加载完成
      this.$bus.$on('itemImgLoad',this.homeItemListener)

      //获取tabControl的offset
      //获取组件
      // this.tabOffsetTop = this.$refs.tabControl
      //所有组件中都有$el，用来获取组件所有的元素
      //此时拿到的offset的值时错的，应为在这里，图片是否加载完成
      // console.log(this.$refs.tabControl.$el.offsetTop);
    },
    destroyed() {
      // console.log('home destory');
      
    },
    //回来
    activated() {
      this.$refs.scroll.scrollTo(0,this.saveY,0)
      this.$refs.scroll.refresh()
      // console.log("actived"+this.saveY);
      
      
    },
    //离开
    deactivated() {
      //保存Y值
      this.saveY = this.$refs.scroll.getScrollY()
      // console.log('deactived============='+this.saveY);
      
      //取消全局事件的监听
      // this.$bus.off('监听事件',监听函数)
      this.$bus.$off('itemImgLoad',this.homeItemListener)
    },
    methods:{
       tabClick(index){
          switch (index) {
            case 0:
              this.currentType = 'pop'
              break;
            case 1:
              this.currentType = 'new'
              break;
            case 2:
              this.currentType = 'sell'
              break;
          }
          this.$refs.tabControl1.currentIndex = index;
          this.$refs.tabControl2.currentIndex = index;
      },
      // 网络请求相关的
      getHomeMultidata(){
        // 1.请求多个数据
        getHomeMultidata().then(res => {
          // console.log(res)
          // this.result = res;
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type){
          const page=this.goods[type].page+1
            getHomeGoods(type,page).then(res => {
              // console.log(res);
              
              // console.log(res.data);
              console.log(res.data.list);
              
              
              // console.log(res.data.list.length);
              this.goods[type].list.push(...res.data.list)
              // for(let i= 0; i<res.data.list.length; i++){
              //   this.goods[type].list.push=res.data.list[i]
              // }
             this.goods[type].page += 1

            //完成加载更多
             this.$refs.scroll.finishPullUp()
        })
      },
      backClick(){
        // console.log('native修饰符'); 
        //scrollTo(x,y,ms);ms表示毫秒
        this.$refs.scroll.scroll.scrollTo(0,0)
      },
      //监听滚动
      contentScroll(position){
        //1.判断BackTop是否显示
       this.isShowBack =(-position.y)>1000
       //2.决定tabControl是否吸顶(position:fixed)
       this.isTabFixed = (-position.y) > this.tabOffsetTop
      //  console.log(this.isTabFixed);
       
      },
      loadMore(){
        // console.log('加载更多');
        this.$refs.scroll.refresh()//重新刷新scroll的高度
        this.getHomeGoods(this.currentType)
        
      },
      swiperImgLoad() {
        // console.log(this.$refs.tabControl.$el.offsetTop);
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      }
   


    }
  }
</script>

<style scoped>
  #home{
    /* padding-top: 44px; */
    height: 100vh;
    position: relative;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
  }
  /* .tab-control {
    position: sticky;
    top: 44px;
    z-index:99
  } */
  .tab-control {
    position: relative;
    z-index: 9
  }
  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>
