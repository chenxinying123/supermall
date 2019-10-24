<template>
   <div class="profile">
       <nav-bar class="profile-nav"><div slot="center">个人中心</div></nav-bar>
       <div class="top">
    <div class="img">
       <div class="yuan">
       <img src="~assets/img/profile/denglu.png" alt="">
       </div>
       </div>
       <div class="denglu">
           <span>登录/注册</span><br>
           <div class="shou">
           <img src="~assets/img/profile/phone.svg" alt="">
           <span>暂无绑定手机号</span>
           </div>
        </div>
        <div class="you">
           <img src="~assets/img/profile/right.svg" alt="">
        </div>
        </div>
        <div class="center">
            <span>
                <div class="jin">0.00元</div>
                <div>我的余额</div>
            </span>
            <span>
                <div class="jin">0个</div>
                <div>我的优惠</div>
            </span>
            <span>
                <div class="jin">0分</div>
                <div>我的积分</div>
            </span>
        </div>
        <div class="bottom">
            <div class="b1">
            <img src="~assets/img/profile/message.png" alt="">
            <span>我的消息</span>
            </div>
            <div class="b2"> 
            <img src="~assets/img/profile/mall.png" alt="">
            <span>积分商城</span>
            </div>
            <img src="~assets/img/profile/huiyuan.png" alt="">
            <span>会员卡</span>
        </div>
        <div class="footer">
            <div class="f">
            <img src="~assets/img/profile/cart.png" alt="">
            <span>我的购物车</span><br>
            </div>
            <img src="~assets/img/profile/bao.png" alt="">
            <span>下载购物APP</span>
        </div>
   </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

export default {
    name: "Profile",
    components: {
        NavBar
    },
}
</script>

<style scoped>
.profile-nav{
    background-color: var(--color-tint);
    color: #fff;
}
img{
    width: 25px;
    height: 25px;
}
.top{
    background-color: var(--color-tint);
    display: flex;
    height: 100px;
}
.img{
  flex: 1;
}
.denglu{
   flex: 2;
}
.you{
   flex: 1;
}
.top .img .yuan{
    width: 52px;
    height: 52px;
    background-color: #ccc;
    border-radius: 50%;
    position: relative;
    top: 30px;
    left: 30px;
}
.top .img img{   
   width: 50px;
   height: 50px;
}
.top .denglu{
   padding-top: 34px; 
   color: #fff;
   font-weight: 700;
}
.top .denglu .shou img{
    transform: translate(7px,7px)
}
.top .denglu .shou{
    transform: translate(-10px,-3px)
}
.top .you img{
  width: 30px;
  height: 30px;
  position: absolute;
  top: 90px;
  right: 0;
}


.center{
    display: flex;
    justify-content: space-around; 
    /* box-shadow: 0 -3px 3px rgba(100, 100, 100, 0.9)   */
    border-bottom: 15px solid #ddd;
    font-weight: 600;
    height: 85px;
}
.center .jin{
    color: red;
    transform: translate(13px,0);
}
.center span{
    padding: 20px;
    border-right: 2px solid #eee;
}
.center span:nth-last-child(1){
    border-right: 0;
}

.bottom{
    height: 120px;
    border-bottom: 15px solid #ddd;
}
.bottom img{
    transform: translate(5px,7px);
}
.bottom .b1{
    border-bottom: 2px solid #eee;
    padding: 3px;
}
.bottom .b2{
    border-bottom: 2px solid #eee;
    padding: 3px;
}

.footer img{
    transform: translate(3px,5px);   
}
.footer .f{
    border-bottom: 2px solid #eee;
    padding-bottom: 3px;
}
</style>