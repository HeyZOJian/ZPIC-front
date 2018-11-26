<template>
    <div class="container-fluid image-moments" style="background-color:#ffffff">
        <div class="row">
            <div class="col-md-12">
                <!-- <div class="col-md-10 col-md-offset-1"> -->
                <div class="row" style="margin-top:2%;margin-bottom:2%">
                    <div class="col-md-3">
                         <a :href="/user/+imageInfo.author.nickname">
                        <img v-if="imageInfo.author.profile_photo_url" :src="imageInfo.author.profile_photo_url" width="35%" class="img-circle" style="border-width:1px;border-color:#bfbfbf;border-style: solid;" />
                        <img v-else src="@/assets/avatar.png" width="35%" class="img-circle" style="border-width:1px;border-color:#bfbfbf;border-style: solid;" />
                        <!-- </div> -->
                         </a>
                        <!-- <div class="col-md-9" style="text-align:left"> -->
                        <strong style="font-size:110%">
                            {{imageInfo.author.nickname}}
                        </strong>
                    </div>
                </div>

                <div @click="show(imageInfo.id)" class="row">
                    <img :src="imageInfo.img_url" width="100%" />
                </div>

                <div class="row">
                    <div class="col-md-1" style="text-align: left;margin-top:3%;">

                        <img v-if="Boolean(imageInfo.is_like)" @click="clike_like" src="@/assets/like.png" width="34px">
                        <img v-else @click="clike_like" src="@/assets/dislike.png" width="32px">
                    </div>
                    <div class="col-md-1" style="text-align: left;margin-top:3%;margin-left:3%">
                        <img @click="show(imageInfo.id)" src="@/assets/comments.png" width="32px">
                    </div>
                    <div class="col-md-4" style="text-align: left;margin-top:23px;">
                        <strong style="font-size:120%">
                            {{imageInfo.view_num}} 浏览
                        </strong>
                    </div>
                </div>
                <div class="row" style="margin: 20px 20px 0 0;text-align:left">
                    <strong style="font-size:100%">
                        {{imageInfo.like_num}} 赞
                    </strong>
                    <br/>
                    <strong style="font-size:100%">
                        {{imageInfo.author.nickname}} {{imageInfo.title}}
                    </strong>
                    <p style="padding-top:2%">{{date}}</p>
                </div>
            </div>
            <vue-modal v-model="showModal" :backdrop="true" style="margin-top:10px">
                <div class="modal-4" style="padding:20px">
                    <image-detail></image-detail>
                </div>
            </vue-modal>
        </div>

    </div>
</template>

<script>
import store from "@/store/index";
import ImageDetail from "@/components/Image/ImageDetail";
import { component as VueModal } from "@xunlei/vue-modal";
import "@xunlei/vue-modal/src/vue-modal.css";
export default {
    props: ["imageInfo"],
    data() {
        return {
            showModal: false,
            comment: {
                content: ""
            }
        };
    },
    components: {
        VueModal,
        ImageDetail
    },
    computed: {
        date() {
            var date = this.imageInfo.create_time;
            return date.substr(0, 19).replace("T", " ");
        },
        commentsInfo() {}
    },
    methods: {
        clike_like() {
            if (this.imageInfo.is_like == false) {
                // TODO: dispatch
                this.imageInfo.like_num += 1;
                this.imageInfo.is_like = true;
                store.dispatch("MomentsLikeImage", this.imageInfo.id);
            } else {
                this.imageInfo.like_num -= 1;
                this.imageInfo.is_like = false;
                store.dispatch("MomentsUnLikeImage", this.imageInfo.id);
            }
        },
        show_comments() {
            alert("评论列表");
        },
        send_comment() {
            store.dispatch("MomentsSendComment", {
                img_id: this.imageInfo.id,
                comment: this.comment
            });
            // this.$Message.success("评论成功");
            // this.imageInfo.comment_num += 1;
            this.comment = {
                content: ""
            };
        },
        show(imgId) {
            store.dispatch("GetImageDetail", {img_id:imgId,page:1});
            store.dispatch("GetImageLikes", imgId);
            this.showModal = !this.showModal;
        }
    }
};
</script>

<style>
.image-moments {
    border-style: solid;
    border-color: #d1d1d1;
    border-width: 1px;
    border-radius: 5px;
    /* box-shadow: 1px 1px 1px 1px #888888; */
    margin-top: 30px;
}
.comment-div {
    border-top-style: solid;
    border-bottom-style: solid;
    border-width: 1px;
    margin: 15px 20px 0 0;
    padding-top: 10px;
    padding-bottom: 20px;
}
.comment-input {
    border-top-style: solid;
    border-color: #bfbfbf;
    border-width: 1px;
    margin: 20px 5px 10px 5px;
    padding: 5px 5px;
}
input {
    border: none;
    width: 100%;
    height: 40px;
    font-size: 15px;
    outline: none;
}
</style>

