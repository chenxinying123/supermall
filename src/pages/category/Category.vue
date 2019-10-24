<template>
<div>
   <scroll class="content1">
     <div class="menu">
         <ul>
             <li class="current">
                 <span>女装</span>
             </li>
             <li class="menu-item">
                 <span>鞋包</span>
             </li>
             <li class="menu-item">
                 <span>服饰</span>
             </li>
             <li class="menu-item">
                 <span>男装</span>
             </li>
             <li class="menu-item">
                 <span>母婴</span>
             </li>
             <li class="menu-item">
                 <span>内衣</span>
             </li>
             <li class="menu-item">
                 <span>食品</span>
             </li>
             <li class="menu-item">
                 <span>手机</span>
             </li>
             <li class="menu-item">
                 <span>美妆</span>
             </li>
             <li class="menu-item">
                 <span>百货</span>
             </li>
             <li class="menu-item">
                 <span>保健</span>
             </li>
             <li class="menu-item">
                 <span>水</span>
             </li>
             <li class="menu-item">
                 <span>鞋包</span>
             </li>
             <li class="menu-item">
                 <span>鞋包</span>
             </li>
         </ul>
     </div>
   </scroll>
   <scroll class="content2">
    <div class="center">
    <span style="padding:7px;">衣服</span>
    <span style="float:right;padding:6px;">查看更多</span>
   <ul>
       <li class="yifu">
           <img src="~assets/img/shop.svg" alt="">
           <div>衣服</div>
       </li>
       <li class="yifu">
           <img src="~assets/img/shop.svg" alt="">
           <div>衣服</div>
       </li>
       <li class="yifu">
           <img src="~assets/img/shop.svg" alt="">
           <div>衣服</div>
       </li>
       <li class="yifu">
           <img src="~assets/img/shop.svg" alt="">
           <div>衣服</div>
       </li>
   </ul>
   </div>
   <goods-list :goods="recommends"/>
   </scroll>
</div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'
import { getRecommend } from 'network/detail'

export default {
    name: "Category",
    components: {
        Scroll,GoodsList
    },
    data() {
        return {
            recommends: []
        }
    },
    created() {
         getRecommend().then(res => {
            this.recommends = res.data.list
        })
    },
}
</script>

<style scoped>
body{
    position: relative;
}
 .content1{
        position: absolute;
        top: 0;
        bottom: 50px;
        background-color: #ccc;
        width: 60px;
    }
     .content2{
        position: absolute;
        left: 60px;
        top: 0;
        bottom: 50px;
        background-color: #eee;
        width: 316px;
    }
 .menu-item,.current{
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
 }
 .current::before{
     content: '';
     background-color: red;
     width: 4px;
     height: 30px;
     position: absolute;
     left: 0;
 }
 .yifu{
     font-size: 20px;
 }
 .yifu img{
   width: 50px;
   height: 50px;
 }
</style>