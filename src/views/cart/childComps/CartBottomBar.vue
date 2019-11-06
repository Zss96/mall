<template>
    <div class="bottom-bar">
       <div class="check-content"  >
            <check-button class="check-botton "   :is-checked="isSelectAll" @click.native="selectAllClick"/>
            <span>全选</span>
       </div>
       <div class="price">
           合计：{{totalPrice}}
       </div>
       <div class="calculate">
           去计算{{checkLength}}
       </div>
    </div>
</template>

<script>
import  CheckButton from 'components/content/checkButton/CheckButton'
export default {
    name:'CartBottomBar',
    components: {
        CheckButton
    },
    computed: {
        totalPrice() {
            return '￥'+this.$store.getters.cartList.filter(item => {
                return item.checked
            }).reduce((preValue,item)=> {
                return preValue+item.price * item.count
            }, 0).toFixed(2)
        },
        checkLength(){
            return this.$store.state.cartList.filter(item =>item.checked).length
        },
          isSelectAll() {
        //选出没被选中的返回false
        if (this.$store.state.cartList.length === 0) {
          return false;
        }else{
          return !(this.$store.state.cartList.filter(item => !item.checked).length)
        }
      }
    },
    methods: {
         selectAllClick() {
        if (this.isSelectAll) {
          this.$store.state.cartList.forEach(item => item.checked = false)
        } else {
          this.$store.state.cartList.forEach(item => item.checked = true)
        }
      }
    }
}
</script>

<style scoped>
    .bottom-bar {
        height: 40px;
        background-color: #eee;
        position: relative;
        display: flex;
        line-height: 40px;
    }
    .check-content {
        display: flex;
        align-items: center;
        margin-left: 10px;
        width: 60px;
    }
    .check-botton {
        width: 20px;
        height: 20px;
        line-height: 20px;
        margin-right: 5px;
    
    }
    .price {
        margin-left: 30px;
        flex: 1;
    }
    .calculate {
        width: 90px;
        color: #fff;
        background-color: red;
    }
</style>