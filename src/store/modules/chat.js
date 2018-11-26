const state = {
    message: null,
    messageList:[]
}

const mutations = {
    ['RECEIVE_MSG'](state, message){
        state.message = message
        state.messageList.push(message)
    }
}

export default{
    state,
    mutations
}