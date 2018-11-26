// TODO:关注、取关操作
<template>
    <div class="container-fluid" style="width:500px">
        <h3>粉丝列表</h3>
        <div data-spy="scroll" data-target="#navbar-example" style="height:450px;overflow:auto; position: relative; margin-top:5%">
            <div v-for="(followerInfo, index) in followingsInfo" :key="followerInfo.index" class="row" style="margin-top:5%">
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
                    <button v-if="followerInfo.bothway && !followFlagArray[index]" @click="unfollow(followerInfo.id, index)" class="btn btn-default btn-block btn-sm" style="margin-top:10%">
                        <strong>互相关注</strong>
                    </button>
                    <button v-else-if="!followFlagArray[index]" @click="follow(followerInfo.id, index)" class="btn btn-primary btn-block btn-sm" style="margin-top:10%">
                        <strong>关注</strong>
                    </button>
                </div>
            </div>
            
        </div>
        <a v-if="haveMoreFollowings"  @click="showMoreFollowings">
            加载更多
        </a>
        <p v-else>已经到底了</p>
    </div>
</template>

<script>
import store from "@/store/index";
export default {
    beforeMount() {
        store.dispatch("GetUserFollowings", {
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
        followingsInfo() {
            return store.state.followings.followingsInfo;
        },
        pageNum(){
            return store.state.followings.followingsPageNum;
        },
        haveMoreFollowings(){
            return store.state.followings.haveMoreFollowings;
        },
        both(){
            return 
        }
    },
    methods:{
        showMoreFollowings(){
            store.dispatch('GetUserFollowings', {
                nickname: this.$route.params.nickname,
                page: this.pageNum
            });
            store.dispatch('AddFollowingsPageNum');
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

<style>

</style>
