import { stat } from "fs";

const state = {
    momentsInfo: [],
    momentsNum: 0,
    momentsPage:1,
    recommendUser:[]
}

const mutations = {
    ['MOMENT_IMAGES'](state, momentsInfo) {
        // 上拉时加载更多朋友圈动态
        state.momentsInfo.push(momentsInfo)
        // state.momentsNum = momentsInfo.moments_num;

    },
    ['MOMENT_NUMS'](state, nums){
        state.momentsNum = nums
    },
    ['RECOMMEND_USER'](state, data){
        state.recommendUser = data.recommend_user_info;
        // console.log(state.recommendUser);
        
    }
}

const getters = {
    momentsInfo: state => {
        return state.momentsInfo
    },
    momentsNum: state=>{
        return state.momentsNum
    }
}

export default {
    state,
    getters,
    mutations
}