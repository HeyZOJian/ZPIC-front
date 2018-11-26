<template>
    <div class="container-fluid" style="width:500px">
        <h3>关注列表</h3>
        <div data-spy="scroll" data-target="#navbar-example" style="height:450px;overflow:auto; position: relative; margin-top:5%">
            <div v-for="(followerInfo, index) in followersInfo" :key="followerInfo.index" class="row" style="margin-top:5%">
                <div @click="userIndex(followerInfo.nickname)" class="col-md-2">
                    <img v-if="followerInfo.profile_photo_url" :src="followerInfo.profile_photo_url" width="100%" class="img-circle" />
                    <img v-else src="@/assets/avatar.png" width="100%" class="img-circle" />
                </div>
                <div @click="userIndex(followerInfo.nickname)" class="col-md-7" style="text-align:left">
                    <div class="row" style="font-size:150%">
                        <strong>{{followerInfo.nickname}}</strong>
                    </div>
                    <div v-if="followerInfo.description" class="row" style="font-size:100%">
                        <strong>{{followerInfo.description}}</strong>
                    </div>
                    <div v-else class="row" style="font-size:100%">
                        <strong>暂无简介</strong>
                    </div>
                </div>
                <div class="col-md-3">
                    <button v-if="!followFlagArray[index]" @click="unfollow(followerInfo.id, index)" class="btn btn-danger btn-block btn-sm" style="margin-top:5%">
                        <strong>取消关注</strong>
                    </button>
                    <button v-else @click="follow(followerInfo.id, index)" class="btn btn-primary btn-block btn-sm" style="margin-top:5%">
                        <strong>关注</strong>
                    </button>
                </div>
            </div>

        </div>
        <a v-if="haveMoreFollowers" @click="showMoreFollowers">
            加载更多
        </a>
        <p v-else>已经到底了</p>
    </div>
</template>

<script>
import store from "@/store/index";
export default {
    beforeCreate() {
        store.dispatch("GetUserFollowers", {
            nickname: this.$route.params.nickname,
            page: 1
        });
    },
    data() {
        return {
            followFlagArray: []
        };
    },
    computed: {
        followersInfo() {
            return store.state.followers.followersInfo;
        },
        pageNum() {
            return store.state.followers.followersPageNum;
        },
        haveMoreFollowers() {
            return store.state.followers.haveMoreFollowers;
        }
    },
    methods: {
        showMoreFollowers() {
            store.dispatch("GetUserFollowers", {
                nickname: this.$route.params.nickname,
                page: this.pageNum
            });
            store.dispatch("AddFollowersPageNum");
        },
        unfollow(id, index) {
            this.$set(this.followFlagArray, index, true);
            store.dispatch('UnfollowUser',id);
        },
        follow(id, index) {
            this.$set(this.followFlagArray, index, false);
            store.dispatch('FollowUser',id);
        },
        userIndex(nickname){
            window.location="/user/"+nickname+"/"
        }
    }
};
</script>

