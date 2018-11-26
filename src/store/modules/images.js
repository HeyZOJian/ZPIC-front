import { USER_IMAGES,GET_IMAGE_COMMENTS,GET_IMAGE_LIKES } from '../types'
import { stat } from 'fs';

const state = {
    imagesInfo:[],
    commentsInfo:null,
    likesInfo:null,
    likesNum:0,
    imagesPage:1,
    moreImages:true,
    searchTag:[]
}

const getters = {
    imagesInfo: state => {
        return state.imagesInfo
    },
    contents: state=>{
        return state.contents
    }
}

const mutations = {
    [USER_IMAGES](state, imagesInfo) {
        
        // if(imagesInfo.images_id.length==0) state.moreImages = false
        state.imagesInfo.push(imagesInfo)
    },
    ['NEXT_PAGE'](state){
        state.imagesPage += 1
    },
    ['MORE_IMAGES'](state, bool){
        console.log(bool);
        
        state.moreImages = bool
    },
    ['SEARCH_TAG'](state, data){
        state.searchTag = data
    }
}

export default {
    state,
    getters,
    mutations
}