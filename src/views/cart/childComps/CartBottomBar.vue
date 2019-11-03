<template>
    <div class="bottom-bar">
       <div class="check-content">
            <check-button class="check-botton"/>
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