//监听图片加载完成的混入
import {debounce} from './utils'
export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null,
      newRefresh: null      
    }
  },
  mounted() {
     // 监听item中图片加载完成
     this.newRefresh = debounce(this.$refs.scroll.refresh,100)
     this.itemImgListener = () =>{
         this.newRefresh()
     }
     this.$bus.$on('itemImageLoad',this.itemImgListener)
    //  console.log('我是混入的内容')
  },
}

//回到顶部的混入
// export const backTopMixin = {
//   components:{
//     BackTop
//   },
//   data() { 
//     return {
//       isShowBackTop: false
//     }
//   },
//   methods: {
//       topClick() {
//       this.$refs.scroll.scrollTo(0, 0, 300);
//     }
//   }
// }
