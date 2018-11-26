import { USER_LOGIN, USER_LOGOUT, USER_REG } from '../types'

var isLoggedIn = function () {
    // 判断是否登陆,
    var myInfo = localStorage.getItem('myInfo')
    return myInfo
    return false

}

const state = {
    myInfo: isLoggedIn() || null,
    sessionid:null,
    msg:null,
    error:null,
}

const getters={
    myInfo: state=>{
        return state.myInfo
    }
}

const mutations = {
    [USER_LOGIN](state, myInfo) {
        localStorage.setItem('myInfo', JSON.stringify(myInfo))
        localStorage.setItem('sessionid', myInfo.sessionid)
        state.myInfo = myInfo
        state.sessionid = myInfo.sessionid
        localStorage.setItem("csrftoken", (document.cookie).substr(10,))
        console.log(myInfo);
        
    },
    [USER_LOGOUT](state) {
        localStorage.removeItem('myInfo')
        localStorage.removeItem('sessionid')
        localStorage.removeItem('csrftoken')
        state.myInfo = null
    },
    [USER_REG](state, myInfo) {
        localStorage.setItem('myInfo', JSON.stringify(myInfo))
        state.myInfo = myInfo
    },
    ['PASSWORD_ERROR'](state){
        state.error = '更改密码失败'
    },
    ['PASSWORD_SUCCESS'](state){
        state.error = ""
    }
}

export default {
    state,
    getters,
    mutations
}