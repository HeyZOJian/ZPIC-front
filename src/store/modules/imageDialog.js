import { IMAGE_DIALOG, GET_IMAGE_COMMENTS, GET_IMAGE_LIKES } from '../types'

const state = {
    imageInfo: null,
    like_num: null,
    commentsInfo: [],
    likesInfo: null,
    is_like: null,
    moreComments: true,
    commentsPage:1
}

const getters = {
    imageInfo: state => {
        return state.imageInfo
    },
    commentsInfo: state => {
        return state.commentsInfo
    }
}

const mutations = {
    [IMAGE_DIALOG](state, imagesInfo) {
        state.imageInfo = imagesInfo
        state.commentsInfo = []
        state.is_like = imagesInfo.is_like
        state.moreComments = true
        state.commentsPage = 1
    },
    [GET_IMAGE_COMMENTS](state, commentsInfo) {
        // console.log(commentsInfo.comments.length);
        state.commentsPage += 1
        if (commentsInfo.comments.length == 0) {
            state.moreComments = false
        }
        // commentsInfo.comments.reverse()
        for (var id in commentsInfo.comments) {
            console.log(commentsInfo.comments[id]);
            
            if(commentsInfo.comments[id].status==0)
                state.commentsInfo.push(commentsInfo.comments[id])
        }
        // console.log(state.commentsInfo);

    },
    [GET_IMAGE_LIKES](state, likesInfo) {
        state.likesInfo = likesInfo.users
    },
    ['SEND_COMMENT'](state, commentInfo) {
        // TODO: @昵称 第二个@起前面加空格
        state.commentsInfo.unshift(commentInfo)

    },
    ['LIKE_IMAGE'](state) {
        state.is_like = true
        state.imageInfo.like_num += 1
    },
    ['UNLIKE_IMAGE'](state) {
        state.is_like = false
        state.imageInfo.like_num -= 1
    }
}

export default {
    state,
    getters,
    mutations
}