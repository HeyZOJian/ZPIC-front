const state = {
    noticeInfo: {},
    noticesInfo:[],
    noticeNum:0
}

const mutations = {
    ['RECEIVE_NOTICE'](state, noticeInfo) {
        // console.log(noticeInfo);
        state.noticeNum += 1
        state.noticeInfo = noticeInfo
    },
    ['GET_NOTICE'](state, noticesInfo){
        state.noticesInfo = noticesInfo
        state.noticeNum = 0
    }
}

export default{
    state,
    mutations
}