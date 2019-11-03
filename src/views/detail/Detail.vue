<template>
  <div id="detail">
      <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
        <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScorll">
            <!-- 属性： topimages传入值： top-imgages -->
            <detail-swiper :top-images="topImages"/>
            <detail-base-info :goods="goods"/>
            <detail-shop-info :shop="shop"/>
            <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
            <detail-param-info ref="params" :param-info="paramInfo"/>
            <detail-comment-info ref="comment" :comment-info="commentInfo"/>
            <goods-list ref="recommend" :goods="recommends"/>
        </scroll>
          <back-top  @click.native="backTop" v-show="isShowBackTop"/>
        <detail-bottom-bar @addCart="addToCart"/>
  </div>
</template>

<script>
import {getDetail,Goods,Shop ,GoodsParam , getRecommend} from 'network/detail'
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'


import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList/'
import {backTopMixin} from 'common/mixin'


export default {
    name: 'Detail',
    components: {
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        Scroll,
        DetailGoodsInfo,
        DetailParamInfo,
        DetailCommentInfo,
        GoodsList,
        DetailBottomBar,
    },
    mixins:[backTopMixin],

    data() {
        return {
            iid: null,
            topImages: [],
            goods: {},
            shop: {},
            detailInfo: {},
            paramInfo: {},
            commentInfo: {},
            recommends: [],
            themeTopY: [],
            currentIndex: 0
        }
    },
    methods: {
        imageLoad() {
            this.$refs.scroll.refresh();

           
            this.themeTopY = [];
            this.themeTopY.push(0);
            this.themeTopY.push(this.$refs.params.$el.offsetTop-44);
            this.themeTopY.push(this.$refs.comment.$el.offsetTop-44);
            this.themeTopY.push(this.$refs.recommend.$el.offsetTop-44);
            console.log(this.themeTopY);
    
        },
        titleClick(index) {
            this.$refs.scroll.scrollTo(0, -this.themeTopY[index], 1000)
        },
        contentScorll(position){
            const positionY = -position.y;
            for(let i=0 ; i<this.themeTopY.length; i++){ 
                // if(positionY>this.themeTopY[i] && positionY<this.themeTopY[i+1]){
                // }
                if(this.currentIndex !== i &&(i<this.themeTopY.length-1&&positionY>=this.themeTopY[i] && positionY<this.themeTopY[i+1])||
                (i===this.themeTopY.length-1&&positionY>=this.themeTopY[i])){
                    this.currentIndex =i;
                    this.$refs.nav.currentIndex = this.currentIndex;
                }
            }

            this.isShowBackTop = -position.y > 1000

        },
        addToCart() {
            //1.获取购物车需要展示的信息
            const product = {}
            product.image = this.topImages[0],
            product.title = this.goods.title;
            product.desc = this.goods.desc;
            product.price = this.goods.realPrice;
            product.iid = this.iid;

            //将我的商品添加购物车
            // this.$store.commit('addCart',product)
            this.$store.dispatch("addCart",product)
        }
    },
    created() {
        //保存传入的iid
        this.iid = this.$route.params.iid
        

         //2.根据iid请求详情数据
        getDetail(this.iid).then(res =>{
            // console.log(res);
            const data = res.result

            
            //1.获取顶部轮播图的数据
            this.topImages = data.itemInfo.topImages

            //2.获取商品信息
            this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

            //3创建店铺信息
            this.shop = new Shop(data.shopInfo)

            //4.保存商品详情数据
            this.detailInfo = data.detailInfo;

            //5.获取参数信息
            this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
            
            //6.取出评论信息
            if(data.rate.cRate !==0){
                this.commentInfo = data.rate.list[0]
                console.log(this.commentInfo);
                
            }
        })

        //3.请求推荐数据
        getRecommend().then(res => {
            this.recommends = res.data.list
        })

       
    },
    updated() {
        
    }
}
</script>

<style scoped>
    #detail {
       position: relative;
       z-index: 99;
       background-color: #fff;
       height: 100vh;
     
    }
    .detail-nav {
        position: relative;
        z-index: 9;
        background-color: #fff;
    }
    .content {
        height: calc(100% - 93px);
    }
</style>