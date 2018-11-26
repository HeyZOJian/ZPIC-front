import api from '@/api'
import {
    USER_LOGIN, USER_LOGOUT, USER_REG,
    USER_IMAGES, USER_INFO,
    GET_IMAGE_COMMENTS,
    GET_IMAGE_LIKES,
    IMAGE_DIALOG
} from './types'
import store from "@/store/index";
import { read } from 'fs';

export const UserLogin = ({ commit }, data) => {
    api.login(data).then((res) => {
        commit(USER_LOGIN, res.data.userInfo, res.data.msg)
        location.href='/moments'
        // window.location = '/moments'
    }).catch(function () {
        localStorage.setItem('error', '账号或密码错误')
        window.location = '/'
    })
}

export const UserRegister = ({ commit }, data) => {
    // console.log('register-form:' ,data);

    api.register(data).then((res) => {
        // console.log(res.status==200);
        if (res.data.status == 'username fail') {
            Notice.error({
                title: '该用户名已被注册'
            })
        }
        else if (res.data.status == 'nickname fail') {
            Notice.error({
                title: '该昵称已被使用'
            })
        }
        else {
            localStorage.setItem('msg', "注册成功")
            window.location = '/'
        }
    })

}

export const ChangePassword = ({ commit }, data) => {
    api.changePassword(data).then((res) => {
        console.log(res.data);
        if (res.data.msg == 'success') {
            console.log('更改成功');
            commit('PASSWORD_SUCCESS')
        }
        else {
            commit('PASSWORD_ERROR')
        }
    })
}

export const UserLogout = ({ commit }) => {
    api.logout().then((res) => {
        commit(USER_LOGOUT);
        window.location = '/'
    })
}

export const SearchUser = ({ commit }, data) => {
    api.searchUser(data.keyword).then((res) => {
        // console.log(res.data);
        commit('SEARCH_USER', res.data)
    })
}

export const SearchTag = ({ commit }, data) => {
    api.searchTag(data.keyword).then((res) => {
        commit('SEARCH_TAG', res.data.images_info)
    })
}

export const UserInfo = ({ commit }, data) => {
    api.getUserInfo(data.nickname, data.page).then(async (res) => {
        if (res.data.userInfo) {
            if (res.data.images_id.length == 0)
                commit('MORE_IMAGES', false)

            await commit(USER_INFO, res.data.userInfo)
            for (var id in res.data.images_id) {
                await api.getImageDetailByID(res.data.images_id[id]).then(res => {
                    commit(USER_IMAGES, res.data)
                })
            }
            await commit('NEXT_PAGE')
        }
        else {
            if (res.data.type == 'personal') {
                commit('PERSONAL_ACCOUNT')
            }
        }
    })
}
import { Notice } from 'iview';
export const UserUpdate = ({ commit }, data) => {
    api.updateUserInfo(data).then((res) => {
        console.log(res.data);
        if (res.data.status == 'fail') {
            Notice.error({
                title: '该昵称已被使用'
            })
        } else {
            var myInfo = JSON.parse(localStorage.getItem('myInfo'))
            myInfo.nickname = data.nickname;
            myInfo.gender = data.gender;
            myInfo.phoneNum = data.phoneNum;
            myInfo.description = data.description;
            localStorage.setItem('myInfo', JSON.stringify(myInfo))
            window.location = '/user/' + data.nickname
        }

    })
}

export const LockAccount = ({ commit }) => {
    api.lockAccount().then((res) => {
        console.log(res);
    })
}

export const UnlockAccount = ({ commit }) => {
    api.unlockAccount().then((res) => {
        console.log(res);
    })
}

export const GetUserFollowers = ({ commit }, data) => {
    api.getUserFollowers(data.nickname, data.page).then((res) => {

        if (res.data.length == 0)
            commit('HAVE_NOT_MORE_FOLLOWERS');
        else {
            commit('USER_FOLLOWERS', res.data);
            if (res.data.length < 10) {
                commit('HAVE_NOT_MORE_FOLLOWERS');
            }
        }
    })
}

export const InitFollowersPageNum = ({ commit }) => {
    commit('INIT_FOLLOWERS_PAGE');
}

export const AddFollowersPageNum = ({ commit }) => {
    commit('ADD_FOLLOWERS_PAGE');
}

export const GetUserFollowings = ({ commit }, data) => {
    api.getUserFollowings(data.nickname, data.page).then((res) => {
        if (res.data.length == 0)
            commit('HAVE_NOT_MORE_FOLLOWINGS');
        else {
            commit('USER_FOLLOWINGS', res.data);
            if (res.data.length < 10) {
                commit('HAVE_NOT_MORE_FOLLOWINGS');
            }
        }
    })
}

export const InitFollowingsPageNum = ({ commit }) => {
    commit('INIT_FOLLOWINGS_PAGE');
}

export const AddFollowingsPageNum = ({ commit }) => {
    commit('ADD_FOLLOWINGS_PAGE');
}

// =========Friend===============

export const FollowUser = ({ commit }, userId) => {
    api.followUser(userId).then((res) => {
        console.log(res.data);
        // commit('ADD_FOLLOW_NUM')
        location.reload()
    })
}


export const UnfollowUser = ({ commit }, userId) => {
    api.unfollowUser(userId).then((res) => {
        console.log(res.data);
        // commit('DEC_FOLLOW_NUM')
        location.reload()
    })
}

//=========Image==================

export const UploadImage = ({ commit }, data) => {
    api.uploadImage(data).then((res) => {
        //  console.log(res.data);
    })
}

export const UploadAvatar = ({ commit }, data) => {
    api.uploadAvatar(data).then((res) => {
        // console.log(res.data);
        var url = res.data.img_url
        var myInfo = JSON.parse(localStorage.getItem('myInfo'))
        localStorage.removeItem('myInfo')
        myInfo.profile_photo_url = url
        console.log(myInfo);
        localStorage.setItem('myInfo', JSON.stringify(myInfo))
        setTimeout(function () {
            location.reload();
        }, 1000);
    })
}

export const DeleteImage = ({ commit }, data) => {
    api.deleteImage(data).then((res)=>{
        console.log(res.data);
        
    })
}

export const GetImageDetail = ({ commit }, data) => {
    api.getImageDetailByID(data.img_id).then(async (res) => {
        await commit(IMAGE_DIALOG, res.data);
        await api.getImageComments(data.img_id, data.page).then((res) => {
            commit(GET_IMAGE_COMMENTS, res.data)
        })
    })
}

export const GetImageComments = ({ commit }, data) => {
    // console.log(data); 
    api.getImageComments(data.img_id, data.page).then((res) => {
        commit(GET_IMAGE_COMMENTS, res.data)
    })
}

export const GetImageLikes = ({ commit }, imgId) => {
    api.getImageLikes(imgId).then((res) => {
        commit(GET_IMAGE_LIKES, res.data)
    })
}

export const SendComment = ({ commit }, data) => {
    api.sendComment(data.img_id, data.comment).then((res) => {
        commit('SEND_COMMENT', data.comment)
    }).catch(function () {
        console.log('error');

    })
}

export const LikeImage = ({ commit }, img_id) => {
    api.likeImage(img_id).then((res) => {
        commit('LIKE_IMAGE')
    })
}

export const UnlikeImage = ({ commit }, img_id) => {
    api.unlikeImage(img_id).then((res) => {
        commit('UNLIKE_IMAGE')
    })
}

// moments
export const UserMoments = ({ commit }, data) => {
    api.getMoments(data.page, 5).then(async (res) => {
        if (res.data.images_id.length < 5) {
            localStorage.setItem('moreMoments', false)
        }
        else {
            localStorage.setItem('moreMoments', true)
        }
        await commit('MOMENT_NUMS', res.data.moments_num)

        for (var id in res.data.images_id) {
            await api.getImageDetailByID(res.data.images_id[id]).then((res) => {
                commit('MOMENT_IMAGES', res.data)
            })
        }

    })

}

export const MomentsSendComment = ({ commit }, data) => {
    api.sendComment(data.img_id, data.comment).then((res) => {
        console.log("评论成功")
    }).catch(function () {
        console.log('error');
    })
}

export const MomentsLikeImage = ({ commit }, img_id) => {
    // console.log(img_id);
    api.likeImage(img_id).then((res) => {
        console.log("Moments点赞成功");
    }).catch(function () {
        console.log("Moments点赞失败");

    })
}

export const MomentsUnLikeImage = ({ commit }, img_id) => {
    api.unlikeImage(img_id).then((res) => {
        console.log("Moments取消点赞成功");
    }).catch(function () {
        console.log("Moments取消点赞失败");

    })
}

// ==============explore=================
export const ExploreImages = ({ commit }, page) => {
    api.getExploreImages(page).then((res) => {
        if (res.data.length == 0) {
            commit('HAVE_NOT_MORE_EXPLORE_IMAGES')
        }
        else {
            commit('EXPLORE_IMAGES', res.data);
            if (res.data.length < 9) {
                commit('HAVE_NOT_MORE_EXPLORE_IMAGES')
            }
        }
    })
}

export const InitExplorePageNum = ({ commit }) => {
    commit('INIT_EXPLORE_PAGE_NUM');
}

export const AddExplorePageNum = ({ commit }) => {
    commit('ADD_EXPLORE_PAGE_NUM');
}

// ==============Chat===================
export const ReceivedChatMsg = ({ commit }, data) => {
    console.log(data);
    
    commit('RECEIVE_MSG', data.message)
}

// ==============Notice=================
export const ReceivedNotice = ({ commit }, data) => {
    console.log('收到通知');
    
    console.log(data);
    commit('RECEIVE_NOTICE', data)
}

export const GetUserNotice = ({ commit }) => {
    api.getUserNotice().then((res) => {
        commit('GET_NOTICE', res.data)
    })
}

//==============Recommend user============
export const RecommendUser = ({ commit }, data) => {
    api.getRecommendUser().then((res) => {
        commit('RECOMMEND_USER', res.data)
    })
}