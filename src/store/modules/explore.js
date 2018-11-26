const state = {
    imagesInfo:[],
    explorePageNum: 2,
    haveMoreImage: true
}

const mutations = {
    ['EXPLORE_IMAGES'](state, imagesInfo){
        state.imagesInfo = state.imagesInfo.concat(imagesInfo)
    },
    ['INIT_EXPLORE_PAGE_NUM'](state){
        state.explorePageNum = 2;
        state.haveMoreImage = true;
    },
    ['ADD_EXPLORE_PAGE_NUM'](state){
        state.explorePageNum += 1
    },
    ['HAVE_NOT_MORE_EXPLORE_IMAGES'](state){
        state.haveMoreImage = false
    }
}

export default{
    state,
    mutations
}