export default{
    cartLenth(state) {
        return state.cartList.length
    },
    // cartLenth() {
    //     return this.$store.state.cartList.length
    //   }
    cartList(state){
        return state.cartList
    }
}