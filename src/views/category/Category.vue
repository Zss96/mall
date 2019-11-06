<template>
<div class="category">
    <category-nav class="category-left" :categorys-title="categorys" @itemclick="itemClick"/>
    <category-item class="category-item" :subcategories="subcategories"> </category-item>
</div>
</template>

<script>
import {getCategory, getSubcategory, getCategoryDetail} from 'network/category'
import CategoryNav from './childComps/CategoryNav'
import CategoryItem from './childComps/CategoryItem'


  export default {
    name: "Category",
    data() {
      return {
        categorys: {},
        subcategories: [],
        currentIndex: 0,
      }
    },
    components: {
      CategoryNav,
      CategoryItem
    },
    methods: {
       itemClick(index){
        this.currentIndex = index;
        this._getSubcategories(index)
      },
        _getSubcategories(index){
         const maitKey = this.categorys.list[index].maitKey;
         console.log(maitKey)
        // 2.请求的数据
        getSubcategory(maitKey).then(res => {
        this.subcategories = res.data.list;
        //  console.log(res.data.data.list)
       console.log(res)
      })
    }
    },
    created() {
      getCategory().then(res => {
        // console.log(res.data);
        
        console.log(res.data.category);
        this.categorys= res.data.category;
        // console.log(res.data.category.list);
      
        // for(let i= 0; i<res.data.category.list.length; i++){
        //     this.categorys[i] = res.data.category.list[i].title
        // }
        // console.log(this.categorys);

      // console.log(res.data.category.list[this.currentIndex].maitKey)
      this._getSubcategories(0)
      
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
    padding-bottom: 40px;
   
  }
  .category-left {
    flex: 1;
  }
  .category-item {
    flex: 3;
  
  }
</style>
