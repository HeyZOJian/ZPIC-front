<template>
    <div class="container-fluid" style="width:750px;height:515px">
        <h4>{{friendNickname}}</h4>
        <div class="row">
            <div class="col" style="padding:5px">
                <!-- <textarea v-model="msgList" type="text" class="form-control" style="height:495px"></textarea> -->
                <message-item :messageList='messageList'></message-item>
            </div>
        </div>
        <div class="row">
            <div class="col" style="padding-left:5px;padding-right:5px">
                <input @keyup.13="send" v-model="message" type="text" class="form-control" style="height:50px" placeholder="请输入消息..." />
            </div>
        </div>

    </div>
</template>

<script>
import Notice from "iview";
import MessageItem from "@/components/Chat/MessageItem";
import store from "@/store/index";
export default {
    props: ["roomId", "friendNickname", "friendId"],
    components: {
        MessageItem
    },
    data() {
        return {
            message: "",
            ws: null
            // messageList: []
        };
    },
    computed: {
        myNickname() {
            return JSON.parse(localStorage.getItem("myInfo")).nickname;
        },
        mySimpleInfo() {
            var myInfo = JSON.parse(localStorage.getItem("myInfo"));
            return {
                userId: myInfo.id,
                nickname: myInfo.nickname,
                profile_photo_url: myInfo.profile_photo_url
            };
        },
        messageList() {
            return store.state.chat.messageList;
        },
        msg(){
            return store.state.chat.message;
        }
    },
    watch:{
        msg(data){
            // if(data.userInfo.nickname!=this.myNickname)
            // this.$Notice.info({
            //     title: '你收到一条消息',
            //     desc: data.message,
            //     duration: 2,
            // });
        }
    },
    mounted() {
        this.ws = new WebSocket(
            "ws://localhost:8000/ws/chat/" + this.roomId + "/"
        );
        this.ws.onopen = function() {
            console.log("chat连接成功");
        };
        this.ws.onmessage = function(message) {
            store.dispatch("ReceivedChatMsg", JSON.parse(message.data));
        };
    },
    methods: {
        send() {
            // console.log("send");
            if (this.message != "") {
                var message = {
                    userInfo: this.mySimpleInfo,
                    message: this.message,
                    friend_id: this.friendId
                };
                this.ws.send(JSON.stringify(message));
                this.message = "";
            }
        }
    }
};
</script>

<style>

</style>
