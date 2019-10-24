<template>
  <swiper v-if="banners.length">
    <swiper-item v-for="(item, index) in banners" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper'

export default {
    name: "HomeSwiper",
    props: {
        banners: {
            type: Array,
            default(){
                return []
            }
        }
    },
    components: {
        Swiper,SwiperItem
    },
    data() {
        return {
            isLoad:false
        }
    },
    methods: {
      imageLoad() {
        if(!this.isLoad){
            // console.log('===')
            this.$emit('swiperImageLoad')
            this.isLoad = true
        }
      }
    },
}
</script>

<style scoped>
/* .swiper-container{
   position: absolute;
   top: 44px;
   right: 0;
   left: 0;
} */
img{
    width: 100%;
}
</style>