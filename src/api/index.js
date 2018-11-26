import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from "@/store/index";

Vue.use(VueAxios, axios)


axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:8000/'
axios.defaults.headers['Content-Type'] = 'application/json'

export default {
    login: function (data) {
        return Vue.axios.post('/account/login/', data)
    },
    logout: function () {
        return Vue.axios.get('/account/logout/')
    },
    register: function (data) {
        return Vue.axios.post('/account/register/', data)
    },
    changePassword(data) {
        var instance = axios.create({
            headers: { 'X-CSRFTOKEN': localStorage.getItem('csrftoken') }
        })
        return instance.put('/account/change-password/' + data.username + '/', data)
    },
    searchUser(keyword) {
        return Vue.axios.get('/account/search/?keyword=' + keyword)
    },
    searchTag(keyword) {
        return Vue.axios.get('/p/tag/' + keyword +'/')
    },
    updateUserInfo: function (data) {
        var instance = axios.create({
            headers: { 'X-CSRFTOKEN': localStorage.getItem('csrftoken') }
        })
        return instance.put('account/edit/', data)
    },
    deleteImage(image_id){
        var instance = axios.create({
            headers: { 'X-CSRFTOKEN': localStorage.getItem('csrftoken') }
        })
        return instance.delete('p/'+image_id+'/')
    },
    getImageDetailByID: function (id) {
        return Vue.axios.get('p/' + id + '/')
    },
    getUserInfo: function (nickname, page) {
        return Vue.axios.get(nickname + '/?page=' + page + '&len=9')
    },
    getUserFollowers: function (nickname, page) {
        var len = 10;
        var instance = axios.create({
            headers: { 'X-CSRFTOKEN': localStorage.getItem('csrftoken') }
        })
        return instance.get(nickname + '/followers/?page=' + page + "&len=" + len)
    },
    getUserFollowings: function (nickname, page) {
        var len = 10;
        var instance = axios.create({
            headers: { 'X-CSRFTOKEN': localStorage.getItem('csrftoken') }
        })
        return instance.get(nickname + '/followings/?page=' + page + "&len=" + len)
    },
    lockAccount() {
        var instance = axios.create({
            headers: { 'X-CSRFTOKEN': localStorage.getItem('csrftoken') }
        })
        return instance.post('/account/lock/')
    },
    unlockAccount() {
        var instance = axios.create({
            headers: { 'X-CSRFTOKEN': localStorage.getItem('csrftoken') }
        })
        return instance.post('/account/unlock/')
    },
    followUser(userId) {
        var instance = axios.create({
            headers: { 'X-CSRFTOKEN': localStorage.getItem('csrftoken') }
        })
        return instance.post('/account/friend/' + userId + "/follow/")
    },
    unfollowUser(userId) {
        var instance = axios.create({
            headers: { 'X-CSRFTOKEN': localStorage.getItem('csrftoken') }
        })
        return instance.post('/account/friend/' + userId + "/unfollow/")
    },
    uploadImage: function (data) {
        var instance = axios.create({
            headers: { 'X-CSRFTOKEN': localStorage.getItem('csrftoken') }
        })
        return instance.post('p/upload/', data)
    },
    uploadAvatar(data) {
        var instance = axios.create({
            headers: { 'X-CSRFTOKEN': localStorage.getItem('csrftoken') }
        })
        return instance.post('account/profile_photo/', data)
    },
    getImageComments: function (id, page) {
        var len = 6
        return Vue.axios.get('p/' + id + '/comment/?page=' + page + '&len=' + len)
    },
    getImageLikes: function (id) {
        return Vue.axios.get('p/' + id + '/like/')
    },
    sendComment: function (id, data) {
        var instance = axios.create({
            headers: { 'X-CSRFTOKEN': localStorage.getItem('csrftoken') }
        })
        return instance.post('p/' + id + '/comment/', data)
    },
    likeImage: function (id) {
        var instance = axios.create({
            headers: { 'X-CSRFTOKEN': localStorage.getItem('csrftoken') }
        })
        return instance.post('p/' + id + '/like/')
    },
    unlikeImage: function (id) {
        var instance = axios.create({
            headers: { 'X-CSRFTOKEN': localStorage.getItem('csrftoken') }
        })
        return instance.post('p/' + id + '/unlike/')
    },
    getMoments: function (page, len) {
        var instance = axios.create({
            headers: { 'X-CSRFTOKEN': localStorage.getItem('csrftoken') }
        })
        return instance.get('moments/?page=' + page + '&len=' + len)
    },

    //=================explore==============================
    getExploreImages: function (page) {
        var len = 9
        return Vue.axios.get('explore/month/?page=' + page + '&len=' + len)
    },

    //================notice================================
    getUserNotice() {
        var instance = axios.create({
            headers: { 'X-CSRFTOKEN': localStorage.getItem('csrftoken') }
        })
        return instance.get('chat/notice/')
    },
    getRecommendUser() {
        var instance = axios.create({
            headers: { 'X-CSRFTOKEN': localStorage.getItem('csrftoken') }
        })
        return instance.get('account/recommend/')
    }
}