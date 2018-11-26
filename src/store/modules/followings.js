const state = {
    followingsInfo:[],
    followingsPageNum:2,
    haveMoreFollowings:true
}

const getters = {
    followingsInfo: state=>{
        return state.followingsInfo
    },
    followingsPageNum: state=>{
        return state.followingsPageNum
    },
    haveMoreFollowings:state=>{
        return state.haveMoreFollowings
    }
}

const mutations = {
    ['USER_FOLLOWINGS'](state, followingsInfo){
        state.followingsInfo = state.followingsInfo.concat(followingsInfo)
    },
    ['INIT_FOLLOWINGS_PAGE'](state){
        state.followingsPageNum = 2
    },
    ['ADD_FOLLOWINGS_PAGE'](state){
        state.followingsPageNum+=1
    },
    ['HAVE_NOT_MORE_FOLLOWINGS'](state){
        state.haveMoreFollowings = false
    }
}

export default {
    state,
    getters,
    mutations
}