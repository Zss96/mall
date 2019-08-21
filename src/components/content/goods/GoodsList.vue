<template>
    <div class="goods">
       <Goodslistitem v-for="item in goods" :goodsitem="item"></Goodslistitem>
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
  }
</style>
