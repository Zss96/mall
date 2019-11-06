<template>
  <div class="category-item">
      <scroll class="content">
        <div class="clearfix">
            <div v-for="(item,index) in subcategories" :key="index" class="item clearfix">
                <img :src="item.image" />
                <div>{{item.title}}</div>
            </div>
        </div>
      </scroll>
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'
export default {
    data() {
        return {

        }
    },
    props: {
        subcategories: {
            type: Array,
            default: {
                return: []
            }
        }
    },
    components: {
        Scroll
    }
}
</script>

<style scoped>
    .category-item{
        display: flex;
        flex-wrap: wrap;
        padding: 10px;
        margin-top: 16px;
    }
    .content {
        height: 100%;
    }
    .item {
        width: 33.33%;
        float: left;
        text-align: center;
    }
    .item img {
        width: 80%;
        font-size: 14px
    }
    .clearfix:after{
        content:"";
        height:0;
        line-height:0;
        display:block;
        visibility:hidden;clear:both
    }
　　　　.clearfix{
            zoom:1;
            }
</style>