<template>
    <div class="container-fluid">
        <h2 style="margin-top:5%">{{this.$route.query.keyword}} 相关用户</h2>
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <div v-if="usersInfo[0]" data-spy="scroll" data-target="#navbar-example" style="height:300px;overflow:auto; position: relative;">
                    <div @click="index(user.nickname)" class="col-md-4" v-for="user in usersInfo" :key="user.index" style="margin-top:10%">
                        <img v-if="user.profile_photo_url" :src="user.profile_photo_url" width="50%" class="img-circle" style="border-width:1px;border-color:#bfbfbf;border-style: solid;" />
                        <img v-else src="@/assets/avatar.png" width="50%" class="img-circle" style="border-width:1px;border-color:#bfbfbf;border-style: solid;" />
                        <h3>{{user.nickname}}</h3>
                        <strong>{{user.description}}</strong>
                    </div>
                </div>
                <p v-else style="margin-top:10%">搜索不到相关用户</p>
            </div>
        </div>
        <br/>
        <div class="row">
            <h2>#{{this.$route.query.keyword}} 相关图片</h2>
            <div class="col-md-8 col-md-offset-2">
                <div data-spy="scroll" data-target="#navbar-example" style="height:800px;overflow:auto; position: relative;">
                    <image-brief v-for="image in images" :key="image.index" :imgUrl="image.img_url+'?imageView2/1/w/300/h/300/format/webp/q/75|imageslim'" :imgId="image.id" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import store from "@/store/index";
import ImageBrief from "@/components/Image/ImageBrief";
export default {
    beforeCreate() {
        this.$store.dispatch("SearchUser", {
            keyword: this.$route.query.keyword
        });
        this.$store.dispatch("SearchTag", {
            keyword: this.$route.query.keyword
        });
    },
    components: {
        ImageBrief
    },
    computed: {
        usersInfo() {
            return this.$store.state.user.searchUserResults;
        },
        images(){
            return this.$store.state.images.searchTag;
        }
    },
    methods: {
        index(nickname) {
            window.location = "/user/" + nickname + "/";
        }
    }
};
</script>

<style>

</style>
