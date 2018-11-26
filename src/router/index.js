import Vue from 'vue'
import Router from 'vue-router'
import VueRouter from 'vue-router';
import store from '@/store/index'
import iView from 'iview';

import Home from '@/components/Home'
import Person from '@/components/Person'
import LoginPanel from '@/components/User/LoginPanel'
import Register from '@/components/Register'
import Page404 from '@/components/Page404'
import ImageDetail from '@/components/Image/ImageDetail'
import Moments from '@/components/Moments'
import SearchUserItem from '@/components/User/SearchUserItem'
import Explore from '@/components/Explore'

Vue.use(iView);
Vue.use(Router)

const routes = [
    {
        path: '/',
        component: Home,
        meta: {
            auth: false
        }
    },
    {
        path: '/user/:nickname',
        component: Person,
        meta: {
            auth: false
        }
    },
    {
        path: '/p/:imgId',
        component: ImageDetail,
        meta:{
            auth:false
        }
    },
    {
        path: '/account/login',
        component: LoginPanel,
    },
    {
        path:'/moments',
        component: Moments
    },
    {
        path:'/search',
        component: SearchUserItem,
    },
    {
        path:'/explore',
        component:Explore
    },
    {
        path: '/error',
        component: Page404,
        meta: {
            auth: false
        }
    },
    {
        path: '*',
        redirect: "/error",
        meta: {
            auth: false
        }
    },
    // {
    //     path: '/moments',
    //     component: Moments,
    // },
]

const router = new VueRouter({
    mode: 'history',
    saveScrollPosition: true,
    routes
})

router.beforeEach(({ meta, path }, from, next) => {
    // 权限验证
    iView.LoadingBar.start();
    var { auth = true } = meta //对象解构默认值 var auth = meta.auth === undefined ? true : meta.auth;
    var isLogin = Boolean(store.state.login.myInfo) // 判断vuex中state保存的用户info true用户已登录， false用户未登录
    console.log('isLogin:' + Boolean(store.state.login.myInfo));

    if (auth && !isLogin && path !== '/account/login') {
        return next({ path: '/account/login' })
    }
    if (isLogin && (path == '/account/login' || path == '/register')) {
        return next({ path: '/' })
    }
    next()
    iView.LoadingBar.finish();
})

export default router