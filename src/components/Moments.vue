// TODO: 分页显示全部页码
<template>
    <div class="container-fluid">
        <div class="row" v-if="momentsInfo" style="margin-top:25px">
            <div class="col-md-6 col-md-offset-1">
                <div data-spy="scroll" data-target="#navbar-example" style="height:970px;overflow:auto; position: relative;">
                    <div class="col">
                        <div data-spy="scroll" data-target="#navbar-example" data-offset="10" style="overflow:auto; position: relative; ">
                            <image-moments v-for="img in momentsInfo" :key="img.index" :imageInfo="img"></image-moments>
                        </div>
                    </div>
                </div>
                <div class="col" style="margin-top:20px">
                    <a @click="showMore" v-if="moreMoments"> 加载更多</a>
                    <p v-else>已经到底了</p>
                </div>
            </div>
            <div class="col-md-4" style="padding-top:3%">
                <div class="row" style="border-width:1px;border-color:#bfbfbf;border-bottom-style: solid;padding-bottom:10px">
                    <div @click="index" class="col-md-4">
                        <img v-if="this.loginUserInfo.profile_photo_url" :src="this.loginUserInfo.profile_photo_url" width="60%" class="img-circle" style="border-width:1px;border-color:#bfbfbf;border-style: solid;" />
                        <img v-else src="@/assets/avatar.png" width="60%" class="img-circle" style="border-width:1px;border-color:#bfbfbf;border-style: solid;" />
                    </div>
                    <div class="col" style="text-align:left;">
                        <strong @click="index" style="font-size:150%">{{this.loginUserInfo.nickname}}</strong>
                        <p>{{this.loginUserInfo.description}}</p>
                    </div>
                </div>
                <div class="row" style="padding-top:20px">
                    <p style="text-align:left;font-size:120%;margin-bottom:5%">可能认识的人</p>
                    <div v-for="user in recommendUser" :key="user.index">
                        <div v-if="user.id!=myId" class="col-md-3">
                            <a :href="/user/+user.nickname">
                                <img v-if="user.profile_photo_url" :src="user.profile_photo_url" width="90%" class="img-circle" style="border-width:1px;border-color:#bfbfbf;border-style: solid;" />
                                <img v-else src="@/assets/avatar.png" width="90%" class="img-circle" style="border-width:1px;border-color:#bfbfbf;border-style: solid;" />
                            </a>
                            <strong>{{user.nickname}}</strong>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import store from "@/store/index";
import ImageMoments from "@/components/Image/ImageMoments";
import { mapActions, mapState } from "vuex";
export default {
    data() {
        return {
            page: 2,
            moreMoments: true,
            loginUserInfo: JSON.parse(localStorage.getItem("myInfo"))
        };
    },
    computed: mapState({
        myId() {
            return JSON.parse(localStorage.getItem("myInfo")).id;
        },
        momentsInfo: state => state.moment.momentsInfo,
        pageNum() {
            var momentsNum = parseInt(store.state.moment.momentsNum);
            // console.log(momentsNum);
            return Math.ceil(momentsNum / 5);
        },
        recommendUser() {
            return this.$store.state.moment.recommendUser;
        }
    }),
    components: {
        ImageMoments
    },
    beforeCreate: function() {
        this.$Spin.show();
        setTimeout(() => {
            this.$Spin.hide();
            this.$store.dispatch(
                "UserMoments",
                // JSON.parse(localStorage.getItem("myInfo")).id
                { page: 1 }
            );
            this.$store.dispatch("RecommendUser");
        }, 1000);
    },
    methods: {
        showMore(id) {
            this.$store.dispatch(
                "UserMoments",
                // JSON.parse(localStorage.getItem("myInfo")).id
                { page: this.page }
            );
            this.page += 1;
            this.moreMoments =
                localStorage.getItem("moreMoments") == "true" ? true : false;
            // console.log(this.moreMoments);
        },
        index() {
            window.location = "/user/" + this.loginUserInfo.nickname + "/";
        }
    }
};
</script>
