<template>
    <div class="back-top">
       <img src="~assets/img/common/top.svg" alt=""> 
    </div>
</template>

<script>
export default {
    name: 'BackTop',
    methods: {
        backClick() {
  
        }
    }
}
</script>

<style scoped>
.back-top{
    position: fixed;
    right: 10px;
    bottom: 55px;
}
.back-top img{
    width: 35px;
    height: 35px;
}
</style>