<template>
    <div class="goods">
       <Goodslistitem v-for="(item,index) in goods" :goodsitem="item" :key="index+item"></Goodslistitem>
    </div>
</template>

<script>
  import Goodslistitem from './GoodsListItem'
    export default {
        name: "GoodsList",
      props: {
          goods:{
            type: Array,
            default(){
              return []
            }
          }
      },
      components:{
          Goodslistitem
      }
    }
</script>

<style scoped>
  .goods {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 2px;
  }
</style>
