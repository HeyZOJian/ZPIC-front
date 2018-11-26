<template>
    <div class="container-fluid" style="height:410px">
        <div id='chat-window' data-spy="scroll" data-target="#navbar-example" style="height:400px;overflow-x:hidden; position: relative;width:720px">
            <div v-for="msg in messageList" :key="msg.index" :class="checkUser(msg.userInfo.userId)">
                <div class="row" v-if="checkUser(msg.userInfo.userId)=='my-msg'">
                    <div class="col-md-11">
                        <div class="demo clearfix fr">
                            <span class="triangle right"></span>
                            <div class="article">
                                {{msg.message}}
                            </div>
                        </div>
                    </div>
                    <div class="col-md-1">
                        <img v-if="msg.userInfo.profile_photo_url" :src="msg.userInfo.profile_photo_url" class="user-avatar img-circle" />
                        <img v-else src="@/assets/avatar.png" class="user-avatar img-circle" />
                    </div>
                </div>
                <div v-else class="row">
                    <div class="col-md-1">
                        <img v-if="msg.userInfo.profile_photo_url" :src="msg.userInfo.profile_photo_url" class="user-avatar img-circle" />
                        <img v-else src="@/assets/avatar.png" class="user-avatar img-circle" />
                    </div>
                    <div class="col-md-11" style="padding-left:25px">
                        <div class="demo clearfix">
                            <span class="triangle"></span>
                            <div class="article">
                                {{msg.message}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <a id="msg_end" name="1" href="#1"></a>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    props: ["messageList"],
    computed: {
        myId() {
            return JSON.parse(localStorage.getItem("myInfo")).id;
        }
    },
    methods: {
        checkUser(id) {
            return id == this.myId ? "my-msg" : "friend-msg";
        }
    },
    updated() {
        document.getElementById(
            "chat-window"
        ).scrollTop = document.getElementById("chat-window").scrollHeight;
    },
    
};
</script>

<style>
.my-msg {
    text-align: right;
    padding-right: 20px;
}
.friend-msg {
    text-align: left;
}
.user-avatar {
    width: 48px;
    border-width: 1px;
    border-color: #bfbfbf;
    border-style: solid;
}
strong {
    font-size: 120%;
}

.bubble {
    margin: 0px auto;
    width: 320px;
}
.demo {
    margin-bottom: 20px;
    padding-left: 8px;
    position: relative;
}

.triangle {
    position: absolute;
    top: 50%;
    margin-top: -8px;
    left: 0px;
    display: block;
    width: 0;
    height: 0;
    overflow: hidden;
    line-height: 0;
    font-size: 0;
    border-bottom: 8px solid #fff;
    border-top: 8px solid #fff;
    border-left: none;
    border-right: 8px solid #4d90fe;
}

.demo .article {
    float: left;
    color: #fff;
    display: inline-block;
    *display: inline;
    zoom: 1;
    padding: 5px 10px;
    border: 1px solid #4d90fe;
    background: #eee;
    border-radius: 5px;
    background-color: #4d90fe;
    background-image: -webkit-gradient(
        linear,
        left top,
        left bottom,
        from(#4d90fe),
        to(#4d90fe)
    );
    background-image: -webkit-linear-gradient(top, #4d90fe, #4d90fe);
    background-image: -moz-linear-gradient(center top, #4d90fe, #4d90fe);
    background-image: linear-gradient(top, #4d90fe, #4d90fe);
}

.fr {
    padding-left: 0px;
    padding-right: 8px;
}

.fr .triangle {
    left: auto;
    right: 0px;
    border-bottom: 8px solid #fff;
    border-top: 8px solid #fff;
    border-right: none;
    border-left: 8px solid #4d90fe;
}

.fr .article {
    float: right;
}
</style>
