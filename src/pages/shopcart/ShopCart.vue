<template>
   <div class="shop-cart">
   <nav-bar class="nav">
       <div slot="center">购物车{{length}}</div>
   </nav-bar>
   <cart-list></cart-list>
   <bottom-bar/>
   </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

import CartList from './CartList'
import BottomBar from './BottomBar'

import {mapGetters} from 'vuex'

export default {
    name: "ShopCart",
    components: {
        NavBar,CartList,BottomBar
    },
    computed: {
        //两种语法
        // ...mapGetters(['cartLength','cartList'])
        ...mapGetters({
            length: 'cartLength'
        })
    },
}
</script>

<style scoped>
.shop-cart{
    height: 100vh;
}
.nav{
  background-color: var(--color-tint);
  color: #fff;
  font-weight: 600;
}
/* .cart-list {
    position: absolute;
    top: 44px;
    bottom: 49px;
    width: 100%;
} */
</style>