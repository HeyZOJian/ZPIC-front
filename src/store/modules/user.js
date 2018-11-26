import { USER_INFO } from '../types'

const state = {
    userId: null,
    nickname: null,
    imageNum: null,
    followNum: null,
    followingNum: null,
    description: null,
    profilePhotoUrl: null,
    status: null,
    searchUserResults: [],
    isFriend:null
}

// const getters = {
//     nickname: state => {
//         return state.nickname
//     }
// }

const mutations = {
    [USER_INFO](state, userInfo) {
        state.userId = userInfo.id
        state.nickname = userInfo.nickname
        state.imageNum = userInfo.image_num
        state.followNum = userInfo.followers_num
        state.followingNum = userInfo.followings_num
        state.description = userInfo.description
        state.profilePhotoUrl = userInfo.profile_photo_url
        state.status = userInfo.status
        state.isFriend = userInfo.isFriend
    },
    ['SEARCH_USER'](state, usersInfo) {
        state.searchUserResults = usersInfo
    },
    ['PERSONAL_ACCOUNT'](state) {
        state.status = 1
    },
    ['ADD_FOLLOW_NUM'](state) {
        state.followNum += 1
    },
    ['DEC_FOLLOW_NUM'](state) {
        state.followNum -= 1
    },
    ['ADD_FOLLOWING_NUM'](state) {
        state.followingNum += 1
    },
    ['DEC_FOLLOWING_NUM'](state) {
        state.followingNum -= 1
    }
}

export default {
    state,
    // getters,
    mutations
}