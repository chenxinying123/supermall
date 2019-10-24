import Vue from 'vue'
import Router from 'vue-router'

const Home = () =>import('pages/home/Home')
const Category = () =>import('pages/category/Category')
const ShopCart = () =>import('pages/shopcart/ShopCart')
const Profile = () =>import('pages/profile/Profile')
const Detail = () =>import('pages/detail/Detail')

Vue.use(Router)

export default new Router({
    routes:[
        {
            path:'',
            redirect: '/home'
        },
        {
            path:'/home',
            component:Home
        },
        {
            path:'/category',
            component:Category
        }, 
        {
            path:'/shopcart',
            component:ShopCart
        },
        {
            path:'/profile',
            component:Profile
        },
        {
            path:'/detail/:iid',
            component:Detail
        },
    
    ],
    mode: 'history'
})
