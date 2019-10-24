<template>
<div class="nav">
  <div class="nav-bar">
      <div class="left"><slot name="left"></slot></div>
      <div class="center"><slot name="center"></slot></div>
      <div class="right"><slot name="right"></slot></div>
  </div>
</div>  
</template>

<script>

export default {
  name: 'NavBar',
}
</script>

<style scoped>
/* 在使用浏览器原生滚动时,为了让导航不跟随一起滚动 */
/* .nav{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 998;
} */
.nav-bar{
    display: flex;
    line-height: 44px;
    text-align: center;
    box-shadow: 0 1px 1px rgba(100, 100, 100, 0.1)
}
.left,.right{
    width: 60px;
}
.center{
    flex: 1;
}
</style>>
