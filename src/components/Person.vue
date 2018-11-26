<template>
    <div v-if="status==0 || isMe" class="container-fluid">
        <div class="row">
            <div class="col-md-10 col-md-offset-1" style="margin-top:5%">
                <div class="col-md-4">
                    <img v-if="profilePhotoUrl" :src="profilePhotoUrl" width="45%" class="img-circle" style="border-width:1px;border-color:#bfbfbf;border-style: solid;" />
                    <img v-else src="@/assets/avatar.png" width="45%" class="img-circle" style="border-width:1px;border-color:#bfbfbf;border-style: solid;" />
                </div>

                <div class="col-md-7" style="text-align: left">
                    <div class="row">
                        <div class="col-md-4">
                            <strong style="font-size:190%">{{nickname}}</strong>
                        </div>
                        <div class="col-md-3" v-if="!isMe">
                            <button v-if="isFollow" @click="unfollow" class="btn btn-danger btn-block btn-sm">
                                <strong>取消关注</strong>
                            </button>
                            <button v-else @click="follow" class="btn btn-primary btn-block btn-sm">
                                <strong>关注</strong>
                            </button>
                        </div>
                        <div class="col-md-3" v-if="isMe">
                            <button class="btn btn-default btn-block btn-sm" @click="editInfo">
                                <strong>编辑</strong>
                            </button>
                        </div>
                        <div class="col-md-3" v-if="!isMe">
                            <button class="btn btn-default btn-block btn-sm" @click="chat">
                                <strong>私信</strong>
                            </button>
                        </div>
                        <div v-if="isMe" class="col-md-2">
                            <img @click="showSetting" src="@/assets/setting.png" style="width:28px;" />
                        </div>
                    </div>
                    <div class="row" style="font-size:120%;margin-top:2%">
                        <div class="col-md-3">
                            <strong style="color:black">{{imageNum}} 帖子</strong>
                        </div>
                        <div class="col-md-3">
                            <strong>
                                <a v-if="isMe" @click="showFollowers" style="color:black">
                                    正在关注 {{followNum}}</a>
                                <span v-else>正在关注 {{followNum}}</span>
                            </strong>
                        </div>
                        <div class="col-md-3">

                            <strong>
                                <a v-if="isMe" @click="showFollowings" style="color:black">
                                    关注者 {{followingNum}}
                                </a>
                                <span v-else>
                                    关注者 {{followingNum}}
                                </span>
                            </strong>
                        </div>
                    </div>

                    <div class="row" style="font-size:130%;margin-top:2%">
                        <div class="col-md-11 col-offset-1">
                            {{description}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-10 col-md-offset-1" style="margin-top:3%">
                <image-brief v-for="image in images" :key="image.index" :imgUrl="image.img_url+'?imageView2/1/w/300/h/300/format/webp/q/75|imageslim'" :imgId="image.id" />
            </div>
        </div>
        <div class="row" style="margin:5%">
            <a v-if="moreImages" @click="showMore">加载更多</a>
            <p v-else>已经到底了</p>
        </div>
        <vue-modal v-model="showEditModal" :backdrop="true" style="margin-top:55px">
            <edit-item v-if="isLogin"></edit-item>
        </vue-modal>

        <vue-modal v-model="showFollowersModal" :backdrop="true" style="margin-top:55px">
            <followers-item v-if="isLogin"></followers-item>
        </vue-modal>

        <vue-modal v-model="showFollowingsModal" :backdrop="true" style="margin-top:55px">
            <followings-item v-if="isLogin"></followings-item>
        </vue-modal>

        <vue-modal v-model="showSettingModal" :backdrop="true" style="margin-top:55px">
            <div style="width:400px;padding:15px">
                <button class="btn btn-default btn-block btn-lg" @click="toggleShow">修改头像</button>
                <button class="btn btn-default btn-block btn-lg" @click="showPassword">更改密码</button>
                <button v-if="status==0" @click="lock" class="btn btn-default btn-block btn-lg">设为私人账户</button>
                <button v-else-if="status==1" @click="unlock" class="btn btn-default btn-block btn-lg">设为公开账号</button>
                <button class="btn btn-danger btn-block btn-lg" @click="logout">退出</button>
            </div>
        </vue-modal>

        <vue-modal v-model="showChatModal" :backdrop="true" style="margin-top:55px">
            <chat-item :roomId='roomId' :friendNickname='nickname' :friendId='userId'></chat-item>
        </vue-modal>

        <vue-modal v-model="show" :backdrop="true" style="margin-top:55px">
            <div style="padding:10px">
                <h3>修改头像</h3>
                <vue-img-inputer v-model="picValue" :nhe=true></vue-img-inputer>
                <button @click="changeAvatar" class="btn btn-success btn-block btn-lg">确定</button>
            </div>
        </vue-modal>

        <vue-modal v-model="showPaaswordModal" :backdrop="true" style="margin-top:55px">
            <password-item></password-item>
        </vue-modal>
    </div>
    <h3 v-else style="height:300px;padding-top:200px">这是私人账户</h3>
</template>

<script>
import store from "@/store/index";
import { mapActions, mapState } from "vuex";
import { component as VueModal } from "@xunlei/vue-modal";
import ImageBrief from "@/components/Image/ImageBrief";
import EditItem from "@/components/User/EditItem";
import FollowersItem from "@/components/User/FollowersItem";
import FollowingsItem from "@/components/User/FollowingsItem";
import UploadImageItem from "@/components/Image/UploadImageItem";
import ChatItem from "@/components/Chat/ChatItem";
import VueImgInputer from "vue-img-inputer";
import PasswordItem from '@/components/User/PasswordItem';
export default {
    data() {
        return {
            showEditModal: false,
            showFollowersModal: false,
            showFollowingsModal: false,
            showSettingModal: false,
            showUploadModal: false,
            showChatModal: false,
            showPaaswordModal: false,
            picValue: null,
            show: false,
            params: {
                token: "123456798",
                name: "avatar"
            },
            headers: {
                smail: "*_~"
            },
            imgDataUrl: "" // the datebase64 url of created image
        };
    },
    computed: mapState({
        userId: state => state.user.userId,
        nickname: state => state.user.nickname,
        profilePhotoUrl: state => state.user.profilePhotoUrl,
        imageNum: state => state.user.imageNum,
        followNum: state => state.user.followNum,
        followingNum: state => state.user.followingNum,
        description: state => state.user.description,
        status: state => state.user.status,
        images: state => state.images.imagesInfo,
        isLogin() {
            return Boolean(localStorage.getItem("myInfo"));
        },
        userImagesPage() {
            return store.state.images.imagesPage;
        },
        moreImages() {
            return store.state.images.moreImages;
        },
        isMe() {
            if (localStorage.getItem("myInfo")) {
                if (
                    JSON.parse(localStorage.getItem("myInfo")).nickname ==
                    this.nickname
                )
                    return true;
                else return false;
            } else return false;
        },
        roomId() {
            var myId = JSON.parse(localStorage.getItem("myInfo")).id;
            if (this.userId < myId) return this.userId + "-" + myId;
            else return myId + "-" + this.userId;
        },
        isFollow(){
            return store.state.user.isFriend;
        }
    }),
    components: {
        ImageBrief,
        VueModal,
        EditItem,
        FollowersItem,
        FollowingsItem,
        UploadImageItem,
        ChatItem,
        VueImgInputer,
        PasswordItem
    },
    beforeCreate: function() {
        this.$Spin.show();
        setTimeout(() => {
            this.$Spin.hide();
            this.$store.dispatch("UserInfo", {
                nickname: this.$route.params.nickname,
                page: 1
            });
        }, 500);
    },
    methods: {
        showMore() {
            store.dispatch("UserInfo", {
                nickname: this.$route.params.nickname,
                page: this.userImagesPage
            });
        },
        editInfo() {
            this.showEditModal = !this.showEditModal;
        },
        showFollowers() {
            this.showFollowersModal = !this.showFollowersModal;
            store.dispatch("InitFollowersPageNum");
        },
        showFollowings() {
            this.showFollowingsModal = !this.showFollowingsModal;
            store.dispatch("InitFollowingsPageNum");
        },
        showSetting() {
            this.showSettingModal = !this.showSettingModal;
        },
        showUpload() {
            this.showUploadModal = !this.showUploadModal;
        },
        logout() {
            this.$store.dispatch("UserLogout");
        },
        toggleShow() {
            this.show = !this.show;
        },
        lock() {
            store.dispatch("LockAccount");
            window.location = "/user/" + this.nickname + "/";
        },
        unlock() {
            store.dispatch("UnlockAccount");
            window.location = "/user/" + this.nickname + "/";
        },
        changeAvatar() {
            let data = new FormData();
            data.append("image", this.picValue);
            store.dispatch("UploadAvatar", data);
        },
        chat() {
            this.showChatModal = !this.showChatModal;
        },
        showPassword(){
            this.showPaaswordModal = !this.showPaaswordModal;
        },
        follow(){
            console.log('follow');
            store.dispatch('FollowUser',this.userId);
        },
        unfollow(){
            store.dispatch('UnfollowUser', this.userId);
        }
    }
};
</script>

<style>

</style>