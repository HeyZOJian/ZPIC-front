const state = {
    followersInfo:[],
    followersPageNum:2,
    haveMoreFollowers:true
}

const getters = {
    followersInfo: state=>{
        return state.followersInfo
    },
    followersPageNum: state=>{
        return state.followersPageNum
    },
    haveMoreFollowers:state=>{
        return state.haveMoreFollowers
    }
}

const mutations = {
    ['USER_FOLLOWERS'](state, followersInfo){
        state.followersInfo = state.followersInfo.concat(followersInfo)
    },
    ['INIT_FOLLOWERS_PAGE'](state){
        state.followersPageNum = 2
    },
    ['ADD_FOLLOWERS_PAGE'](state){
        state.followersPageNum+=1
    },
    ['HAVE_NOT_MORE_FOLLOWERS'](state){
        state.haveMoreFollowers = false
    }
}

export default {
    state,
    getters,
    mutations
}