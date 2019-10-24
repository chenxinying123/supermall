<template>
    <div id="detail">
       <detail-nav-bar class="detail-nav"
        @titleClick="titleClick"
        ref="nav"/>

       <scroll class="content" 
       ref="scroll" 
       :probe-type="3" 
       @scroll="contentScroll">
       <detail-swiper :images="topImages" />
       <detail-base-info :goods="goods" />
       <detail-shop-info :shop="shop" />
       <detail-goods-info 
       :detailInfo="detailInfo" 
       @imgLoad="imageLoad"/>
       <detail-param-info ref="params" :param-info="paramInfo"/>
       <detail-comment-info ref="comment" :comment-info="commentInfo"/>
       <goods-list ref="recommend" :goods="recommends"/>
       </scroll>
       <detail-bottom-bar @addCart="addToCart"/>

       <back-top @click.native="topClick" v-show="isShowBackTop"/>
    </div>
</template>

<script>
import DetailNavBar from './DetailNavBar'
import DetailSwiper from './DetailSwiper'
import DetailBaseInfo from './DetailBaseInfo'
import DetailShopInfo from './DetailShopInfo'
import DetailGoodsInfo from './DetailGoodsInfo'
import DetailParamInfo from './DetailParamInfo'
import DetailCommentInfo from './DetailCommentInfo'
import DetailBottomBar from './DetailBottomBar'

import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'
import BackTop from 'components/content/backTop/BackTop'

import {getDetail, Goods, Shop, GoodsParam, getRecommend} from 'network/detail'
import { debounce } from 'common/utils'
import {itemListenerMixin} from 'common/mixin'

export default {
    name: 'Detail',
    components: {
        DetailNavBar,DetailSwiper,
        DetailBaseInfo,DetailShopInfo,
        Scroll,DetailGoodsInfo,DetailParamInfo,
        DetailCommentInfo,GoodsList,
        DetailBottomBar,BackTop
    },
    mixins: [itemListenerMixin],
    data() {
        return {
            iid: null,
            topImages: [],
            goods: {},
            shop: {},
            detailInfo: {},
            paramInfo: {},
            commentInfo: {},
            recommends: [],
            themeTopYs: [],
            getThemeTopY: null,
            currentIndex: 0,
            isShowBackTop: false,
        }
    },
    methods: {
        imageLoad(){
            // this.$refs.scroll.refresh()
            this.newRefresh()
            this.getThemeTopY()
        },
        titleClick(index){
            // console.log(index);
            this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],100)
        },
        contentScroll(position){
            //1.获取y值
            const positionY = -position.y
            // console.log(positionY)
            //2.positionY和主题中值进行对比
            //[0,7700,9100,9900]
            //positionY在0和7700之间，index=0
            //positionY在7700和9100之间，index=1
            //positionY在9100和9900之间，index=2
            //positionY超过9900，index=3
            let length =this.themeTopYs.length
            for (let i = 0; i < length; i++) {
                // if(positionY>this.themeTopYs[i]&&positionY<this.themeTopYs[i+1]){
                // }
                if(this.currentIndex!==i && ((i<length-1 && positionY>=this.themeTopYs[i] && positionY<this.themeTopYs[i+1])||(i===length-1 && positionY>=this.themeTopYs[i]))){
                  this.currentIndex = i;
                //   console.log(this.currentIndex);
                this.$refs.nav.currentIndex = this.currentIndex
                }
            }
        },

         topClick() {
            this.$refs.scroll.scrollTo(0,0,1000)
        },  
        contentScroll(position){
            // 判断BackTop是否显示
           //    console.log(position);
           this.isShowBackTop = (-position.y) > 1000
        }, 
        addToCart() {
            //获取购物车需要展示的信息
            const product = {}
            product.image = this.topImages[0];
            product.title = this.goods.title;
            product.desc = this.goods.desc;
            product.price = this.goods.realPrice;
            product.iid = this.iid;
            //将商品添加到购物车
            this.$store.dispatch('addCart',product).then(res =>{
                // console.log(res);
                // console.log(this.$toast);
                this.$toast.show(res,2000)
            })
        }  
    },
    created() {
        //1.保存传入的iid
        this.iid = this.$route.params.iid

        //2.根据iid请求详情数据
        getDetail(this.iid).then(res => {
            // console.log(res)
            const data = res.result
            //2.1获取顶部图片轮播图数据
            this.topImages = data.itemInfo.topImages

            //2.2获取商品信息
            this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)

            //2.3创建店铺信息的对象
            this.shop = new Shop(data.shopInfo)

            //2.4保存商品的详情数据
            this.detailInfo = data.detailInfo;

            //2.5获取参数的信息
            this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)

            //2.6获取评论的信息
            if(data.rate.cRate !==0) {
               this.commentInfo = data.rate.list[0] 
            }
                
            //     //第一次获取值不对this.$refs.params.$el没渲染
            //     this.themeTopYs = []
            //     this.themeTopYs.push(0);
            //     this.themeTopYs.push(this.$refs.params.$el.offsetTop)
            //     this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
            //     this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
            // this.$nextTick(() =>{
            //     //根据最新的数据，对应的DOM是已经被渲染出来
            //     //但是图片依然加载完(目前获取到offsetTop不包含其中的图片)。
            //     //offsetTop值不对的时候，都是因为图片的问题
            //     this.themeTopYs = []
            //     this.themeTopYs.push(0);
            //     this.themeTopYs.push(this.$refs.params.$el.offsetTop)
            //     this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
            //     this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
            // })
            
        }) 
        //3.请求推荐数据
        getRecommend().then(res => {
            this.recommends = res.data.list
        })
        //给getThemeTopY赋值
        this.getThemeTopY = debounce(() =>{
                this.themeTopYs = []
                this.themeTopYs.push(0);
                this.themeTopYs.push(this.$refs.params.$el.offsetTop)
                this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
                this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        },100)
    },
    mounted() {
       
      },
      destroyed() {
        this.$bus.$off('itemImageLoad',this.itemImgListener)        
      },
}
</script>

<style scoped>
    #detail{
        position: relative;
        z-index: 9;
        background-color: #fff; 
        height: 100vh;
    }
    .detail-nav{
        position: relative;
        z-index: 9;
        background-color: #fff;
        max-height: 44px;
    }
    .content{
        height: calc(100% - 44px);
    }
</style>