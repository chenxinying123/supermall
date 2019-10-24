<template>
   <div class="home">
       <nav-bar class="home-nav"><div slot="center">美丽街</div></nav-bar>

       <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick"
       ref="tabControl1" class="tab-control" v-show="isTabFixed"></tab-control>

       <scroll class="content" 
       ref="scroll" 
       :probe-type="3" 
       @scroll="contentScroll" 
       :pull-up-load="true" 
       @pullingUp="loadMore">
       <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
       <recommend :recommends="recommends"></recommend>
       <feature />
       <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick"
       ref="tabControl2"></tab-control>
       <goods-list :goods="showGoods" />
       </scroll> 
       
       <back-top @click.native="topClick" v-show="isShowBackTop"/>
   </div>
</template>

<script>
import HomeSwiper from './HomeSwiper'
import Recommend from './Recommend'
import Feature from './Feature'

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop'

import {getHomeMultidata,getHomeGoods} from 'network/home'
import { debounce } from 'common/utils'
import {itemListenerMixin} from 'common/mixin'

export default {
    name: "Home",
    components: {
      NavBar,HomeSwiper,Recommend,
      Feature,TabControl,GoodsList,
      Scroll,BackTop
    },
    mixins: [itemListenerMixin],
    data() {
        return {
           banners: [],
           recommends: [],
           goods: {
               'pop': {page: 0,list: []},
               'new': {page: 0,list: []},
               'sell': {page: 0,list: []}
           },
           currentType: 'pop',
           isShowBackTop: false,
           tabOffsetTop: 0,
           isTabFixed: false,
           saveY: 0,
        }
    },
    computed: {
        showGoods() {
            return this.goods[this.currentType].list
        }
    },
    methods: {
        //网络请求相关的方法
        getHomeMultidata() {
            getHomeMultidata().then(res => {
            // console.log(res);
            this.banners = res.data.banner.list;
            this.recommends = res.data.recommend.list;
        })
        },
        getHomeGoods(type)  {
            const page = this.goods[type].page + 1
            getHomeGoods(type,page).then(res =>{
                // console.log(res);
                this.goods[type].list.push(...res.data.list)
                this.goods[type].page += 1

                this.$refs.scroll.finishPullUp()
            })
        },

        //事件监听相关的方法
        tabClick(index) {
           switch (index) {
               case 0:
                this.currentType = 'pop';
                break;
               case 1:
                this.currentType = 'new';
                break;
               case 2:
                this.currentType = 'sell';
           }
           this.$refs.tabControl1.currentIndex = index;
           this.$refs.tabControl2.currentIndex = index;
        },
        topClick() {
            this.$refs.scroll.scrollTo(0,0,1000)
        },
        contentScroll(position){
            // 1.判断BackTop是否显示
           //    console.log(position);
           this.isShowBackTop = (-position.y) > 1000
           //2.决定tabControl是否吸顶(position: fixed)
           this.isTabFixed = (-position.y) > this.tabOffsetTop
        },
        loadMore() {
              this.getHomeGoods(this.currentType)

              this.$refs.scroll.refresh()
        },
        swiperImageLoad() {
            //  console.log(this.$refs.tabControl.$el.offsetTop)
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
        }
    },
    created() {
        //请求多个数据
        this.getHomeMultidata()
        //请求商品数据
        this.getHomeGoods('pop')
        this.getHomeGoods('new')
        this.getHomeGoods('sell')
    },
    mounted() {
        //获取tabControl的offsetTop
        //所有的组件都有一个属性$el：用于获取组件中的元素
        // console.log(this.$refs.tabControl.$el.offsetTop)
        
        //this.$refs.scroll.refresh对这个函数进行防抖操作
        // let newRefresh = debouce(this.$refs.scroll.refresh,100)

        // this.$bus.$on('homeItemImgLoad',() =>{
        //     newRefresh(20,30,'abc')
        // })
    },
    activated () {
        this.$refs.scroll.scrollTo(0,this.saveY,0)
        this.$refs.scroll.scroll.refresh()
    },
    deactivated () {
        //保存Y值
        this.saveY = this.$refs.scroll.getscrollY()
        // console.log(this.saveY)
        //2.取消全局事件的监听
        this.$bus.$off('itemImageLoad',this.itemImgListener)
    }
}
</script>

<style scoped>
.home-nav{
    background-color: var(--color-tint);
    color: #fff;
}
.home{
    /* padding-top: 44px; */
    height: 100vh;
    position: relative;
}
/* .tab-control{
    position: sticky;
    top: 44px;
} */
.content{
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
}
/* .content{
    height: calc(100%-93px);
    overflow: hidden;
    margin-top: px;
} */
.tab-control{
    position: relative;
    z-index: 9;
}
</style>