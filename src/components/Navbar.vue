// TODO: 1.导航条点击后的颜色问题
<template>
    <div class="navbar navbar-default navbar-fixed-top" style="height:55px;">
        <div class="col-md-4" style="margin-top:9px">
                    <a v-if="nickname" href='/moments'><img src="@/assets/logo.png" style="width:32px" /></a>
                    <a v-else href='/'><img src="@/assets/logo.png" style="width:32px" /></a>
        </div>
        <div class="col-md-4">
                    <input @keyup.enter="search" v-model="keyword" type="text" class="form-control" style="height:35px;margin-top:12px" placeholder="Search">
        </div>
        <div class="col-md-1" style="margin-top:15px">
            <a @click="uploadImage"><img src="@/assets/upload.png" style="width:28px" /></a>
        </div>
        <div class="col-md-1" style="margin-top:15px">
            <a href="/explore"><img src="@/assets/explore.png" style="width:28px" /></a>
        </div>
        <div class="col-md-1" style="margin-top:15px">
            <Badge :count='noticeNum' overflow-count="99">
                <a href="#" @click="showNotice"><img src="@/assets/inform.png" style="width:28px"></a>
            </Badge>
        </div>
        <div class="col-md-1" style="margin-top:15px">
            <a :href="'/user/' + nickname"><img src="@/assets/user.png" style="width:28px"></a>
        </div>


        <vue-modal v-model="showUploadModal" :backdrop="true">
            <upload-image-item></upload-image-item>
        </vue-modal>

        <vue-modal v-model="showNoticeModal" :backdrop="true">
            <notice-item></notice-item>
        </vue-modal>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { component as VueModal } from "@xunlei/vue-modal";
import UploadImageItem from "@/components/Image/UploadImageItem";
import NoticeItem from "@/components/NoticeItem";
import store from "@/store/index";
import Notice from "iview";
let ws = null;
export default {
    data() {
        return {
            showUploadModal: false,
            showNoticeModal: false,
            keyword: ""
            // ws: null
        };
    },
    components: {
        VueModal,
        UploadImageItem,
        NoticeItem,
    },
    computed: {
        ...mapGetters({
            UserInfo: "UserInfo"
        }),
        ...mapActions({
            UserLogout: "UserLogout"
        }),
        user() {
            return this.UserInfo;
        },
        nickname() {
            if (localStorage.getItem("myInfo")) {
                return JSON.parse(localStorage.getItem("myInfo")).nickname;
            } else return null;
        },
        notice() {
            return store.state.notice.noticeInfo;
        },
        noticeNum(){
            return store.state.notice.noticeNum;
        }
        // notice(){
        //     this.$Notice.info({
        //         title:'title',
        //         desc:'test',
        //         duration:10
        //     })
        //     return store.state.notice.noticeInfo
        // },
    },
    watch: {
        notice: function(data) {
            data = JSON.parse(data);
            var title = "";
            if (data.notice_type == "friend") {
                title = "你有一位新粉丝";
            } else if (data.notice_type == "comment") {
                title = "你有一条新评论";
            } else if (data.notice_type == "like") {
                title = "你有一条新点赞";
            } else if (data.notice_type == "chat") {
                title = "你有一条新私信";
            }
            this.$Notice.info({
                title: title,
                desc: data.message,
                duration: 10,
                render: h => {
                    return h("p", [data.message]);
                }
            });
        }
    },
    mounted() {
        console.log("navbar mounted");
        var userInfo = JSON.parse(localStorage.getItem("myInfo"));
        if (userInfo) {
            ws = new WebSocket(
                "ws://localhost:8000/ws/notice/" + userInfo.id + "/"
            );
            ws.onopen = function() {
                console.log("notice连接成功");
            };
            ws.onmessage = function(message) {
                // console.log(message);
                store.dispatch("ReceivedNotice", message.data);
            };
            ws.onclose = function() {
                console.log("notice连接关闭");
            };
            this.$router.afterEach(function() {
                ws.close();
            });
        }
    },
    methods: {
        uploadImage() {
            this.showUploadModal = !this.showUploadModal;
        },
        search() {
            this.keyword = this.keyword.trim();
            if (this.keyword && this.keyword != ";")
                window.location = "/search?keyword=" + this.keyword.trim();
        },
        info(message) {
            this.$Notice.open({
                title: "Notification title",
                desc: message,
                duration: 5
            });
            ws.send(JSON.stringify({ message: "????" }));
        },
        showNotice(){
            store.dispatch("GetUserNotice");
            this.showNoticeModal = !this.showNoticeModal;
        }
    }
};
</script>

<style>
input::-ms-input-placeholder {
    text-align: center;
}
input::-webkit-input-placeholder {
    text-align: center;
}
.ivu-notice {
    top: 100px !important;
}
</style>

