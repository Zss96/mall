<template>
    <div class="category-nav">
        <scroll class="content">
            <div>
                <div v-for="(item,index) in categorysTitle.list" :key="index" class="nav-item"
                    :class="{active: index===currentIndex}" @click="itemClick(index)">
                    {{item.title}}
                </div>
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
        return {
            currentIndex: 0
        }
    },
    props: {
        categorysTitle: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    methods: {
        itemClick(index) {
            this.currentIndex = index;
            this.$emit('itemclick', index)
        }
    }
}
</script>

<style scoped>
    .category-nav {
        background-color: #f6f6f6;
    }
    .content {
        background-color: #f6f6f6;
        height: 100%;
        width: 100px;
        box-sizing: border-box;
    }
    .nav-item {
        height: 45px;
        line-height: 45px;
        text-align: center;
        font-size: 14px;         
    }
    .active {
      background-color: #fff;  
      color: #FF5777;
    }
</style>