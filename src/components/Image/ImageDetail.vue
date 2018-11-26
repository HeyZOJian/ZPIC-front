<template>
    <div class="container-fluid">
        <div class="row" v-if="imageInfo" style="width:900px;height:500px">
            <div class="col-md-7">
                <img :src="imageInfo.img_url" style="width:480px;margin-top:5px">
            </div>
            <div class="col-md-5">
                <div class="row" style="text-align: left;margin-top:1%">
                    <div class="col-md-6">
                        <a :href="/user/+imageInfo.author.nickname">
                        <img v-if="imageInfo.author.profile_photo_url" :src="imageInfo.author.profile_photo_url" width="35%" class="img-circle">
                        <img v-else src="@/assets/avatar.png" width="35%" class="img-circle" />
                        </a>
                        <strong style="font-size:130%"> {{imageInfo.author.nickname}}</strong>
                    </div>
                    <div v-if="isMe(imageInfo.author.id)"  class="col-md-6">
                        <button @click="deleteImage(imageInfo.id)" class="btn btn-danger btn-block btn-sm" style="margin-top:12px">删除图片</button>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-12" style="text-align: left;margin-top:3%">
                        <strong style="font-size:130%">
                            {{imageInfo.author.nickname}} {{imageInfo.title}}
                        </strong>

                    </div>
                    <div class="col-md-12" style="text-align: left;margin-top:3%">
                        <strong style="font-size:130%">
                            共{{imageInfo.comment_num}}条评论
                        </strong>
                    </div>
                </div>
                <div class="row comment-div">
                    <div data-spy="scroll" data-target="#navbar-example" style="height:180px;overflow:auto; position: relative; ">
                        <div class="row" v-for="comment in comments" :key="comment.index">
                            <div class="col-md-12" style="text-align: left;margin-top:3%;font-size:130%">
                                <strong>
                                    <a :href="/user/+comment.publisher_nickname">
                                        {{comment.publisher_nickname}}
                                    </a>
                                </strong>
                                <!-- TODO: 评论内容中的@用户变为链接 -->
                                {{comment.content}}
                            </div>
                        </div>
                        <a v-if="moreComments" @click="showMoreComments">点击加载更多...</a>
                        <p v-else>已经到底了</p>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-12" style="text-align: left;margin-top:3%;">
                        <strong style="font-size:130%">
                            {{imageInfo.like_num}} 赞
                        </strong>
                        <img v-if="isLike" @click="clike_like" src="@/assets/like.png" width="32px">
                        <img v-else @click="clike_like" src="@/assets/dislike.png" width="32px">
                        <p style="padding-top:2%">{{date}}</p>
                    </div>
                </div>

                <div class="row comment-input">
                    <div class="col-md-12">
                        <input @keypress.13="send_comment" v-model="comment.content" placeholder="请输入评论" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import store from "@/store/index";
export default {
    data() {
        return {
            comment: {
                content: "",
                publisher_nickname: JSON.parse(localStorage.getItem('myInfo')).nickname
            },
        };
    },
    computed: {
        imageInfo() {
            // console.log(store.state.imageDialog.imageInfo);
            
            return store.state.imageDialog.imageInfo;
        },
        comments() {
            return store.state.imageDialog.commentsInfo;
        },
        commentsNum() {
            return store.state.imageDialog.commentsNum;
        },
        date() {
            var date = store.state.imageDialog.imageInfo.create_time;
            return date.substr(0, 19).replace("T", " ");
        },
        isLike() {
            return store.state.imageDialog.is_like
        },
        moreComments(){
            return store.state.imageDialog.moreComments
        },
        commentsPage(){
            return store.state.imageDialog.commentsPage
        }
    },
    methods: {
        clike_like() {
            if (this.isLike == false) {
                store.dispatch("LikeImage", this.imageInfo.id);
            } else {
                store.dispatch("UnlikeImage", this.imageInfo.id);
            }
        },
        send_comment() {
            store.dispatch("SendComment", {
                img_id: this.imageInfo.id,
                comment: this.comment
            });
            this.comment = {
                content: "",
                publisher_nickname: JSON.parse(localStorage.getItem('myInfo')).nickname
            };
        },
        showMoreComments() {
            // console.log("page: " + this.page);
            store.dispatch("GetImageComments", {
                img_id: this.imageInfo.id,
                page: this.commentsPage
            });
        },
        isMe(user_id){

            return user_id == JSON.parse(localStorage.getItem('myInfo')).id
        },
        deleteImage(image_id){
            store.dispatch('DeleteImage', image_id)
        }
    },
};
</script>


<style>
input {
    border: none;
    width: 100%;
    height: 40px;
    font-size: 20px;
    outline: none;
}
.comment-div {
    border-top-style: solid;
    border-bottom-style: solid;
    border-width: 1px;
    margin: 10px 0px 0 0;
    padding-top: 10px;
    padding-bottom: 10px;
}
.comment-input {
    border-top-style: solid;
    border-width: 1px;
    margin: 5px 0px 0 0;
    padding: 5px 5px;
}
</style>