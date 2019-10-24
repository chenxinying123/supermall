<template>
   <div class="recommend">
       <div v-for="(item,index) in recommends" :key="index" class="recommend-item">
           <img :src="item.image" alt="">
           <div>{{item.title}}</div>
       </div>
   </div>
</template>

<script>
export default {
    name: "Recommend",
    props: {
        recommends: {
            type: Array,
            default() {
              return []
            }
        }
    }
}

</script>
<style scoped>
.recommend{
    /* position: absolute;
    top: 240px;
    left: 0; */
    display: flex;
    width: 100%;
    text-align: center;
    font-size: 15px;
    padding: 5px 0 10px;
    border-bottom: 8px solid #eee;
}
.recommend-item{
    flex: 1;
}
.recommend-item img{
    width: 80px;
    height: 80px;
}
</style>