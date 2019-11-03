import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        cartList: []
    },
    getters,
    actions: {
        addCart(context,payload){
            let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
            if(oldProduct){
                context.commit('addCounter',oldProduct)
            }else {
                payload.count = 1
                context.commit('addToCart',payload)
            }
            
        }
    },
    mutations: {
        // addCart(state,payload){
        //     // let oldProduct = null;
        //     // for(let item of state.cartList){
        //     //     if(item.iid === payload.iid){
        //     //         oldProduct = item
        //     //     }
        //     // }
        //     let oldProduct = state.cartList.find(item => item.iid === payload.iid)
        //     if(oldProduct){
        //         oldProduct.count +=1
        //     }else {
        //         payload.count = 1
        //         state.cartList.push(payload)
        //     }
            
        // }

      addCounter(state,payload){
          payload.count++
      },
      addToCart(state,payload){
        payload.checked = true
        state.cartList.push(payload)
      }
    }
})
export default store