<template>
<div class="category">
    <category-nav class="category-left" :categorys-title="categorys"/>
    <div class="category-item"></div>
</div>
</template>

<script>
import {getCategory} from 'network/category'
import CategoryNav from './childComps/CategoryNav'


  export default {
    name: "Category",
    data() {
      return {
        categorys: [],
      }
    },
    components: {
      CategoryNav
    },
    created() {
      getCategory().then(res => {
        // console.log(res.data);
        
        console.log(res.data.category);
        
        // console.log(res.data.category.list);
        for(let i= 0; i<res.data.category.list.length; i++){
            this.categorys[i] = res.data.category.list[i].title
        }
        // console.log(this.categorys);
        
      })
    },
    mounted() {
      
    }
  }
</script>

<style scoped>
  .category {
    display: flex;
    height: 100vh;
    position: relative;
  }
  .category-left {
    flex: 1;
    height: calc(100% - 49px);
  }
  .category-item {
    flex: 3;
  }
</style>
