<template>
    <div class="category-nav">
       <scroll class="content">
        <div v-for="(item,index) in categorysTitle" :key="index" class="nav-item"
          :class="{active: index===currentIndex}" @click="itemClick(index)">{{item}}
        </div>
       </scroll>
    </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'
export default {
    name: 'CategoryNav',
    components: {
        Scroll
    },
    data(){
        return{
            currentIndex: 0
        }
    },
    props: {
        categorysTitle: {
            type: Array,
            default() {
                return []
            }
        }
    },
    methods: {
        itemClick(index) {
            this.currentIndex = index
        }
    }
}
</script>

<style scoped>
    .category-nav {
        background-color: #f6f6f6;
    }
    .content {
        height: 100%;
        overflow: hidden;
    }
    .nav-item {
        font-size: 14px;
        height: 40px;
        line-height: 40px;
        text-align: center;
              
    }
    .active {
      background-color: #fff;  
      color: #FF5777;
    }
</style>