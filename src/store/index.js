import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import login from './modules/login'
import images from './modules/images'
import imageDialog from './modules/imageDialog'
import user from './modules/user'
import moment from './modules/moment'
import followers from './modules/followers'
import followings from './modules/followings'
import explore from './modules/explore'
import chat from './modules/chat'
import notice from './modules/notice'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    actions,
    getters,
    modules: {
        login,
        images,
        user,
        imageDialog,
        moment,
        followers,
        followings,
        explore,
        chat,
        notice,
    },
    strict: debug
})