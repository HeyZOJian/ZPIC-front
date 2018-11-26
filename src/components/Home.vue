<template>
    <div class="container-fluid">
        <div class="row" style="margin-top:5%">
            <div class="col-md-1" />
            <div class="col-md-4">
                <img src="@/assets/logo.png" />
                <h3 style="font-family: sans-serif;">PIC</h3>
                <h3>分享你的新鲜事</h3>
                <h5>下载应用</h5>
                    <img src="@/assets/AppStore.png" style="width:40%;margin-right:10px" />  
                    <img src="@/assets/GooglePlay.png" style="width:40%" />
            </div>

            <div class="col-md-5" v-show="login">
                <login-panel></login-panel>
                还没有账号？
                <a @click="change">注册</a>
            </div>
            <div class="col-md-5" v-show="!login">
                <register-panel></register-panel>
                已经有账号？
                <a @click="change">登录</a>
            </div>
        </div>
    </div>
</template>
<script>
import LoginPanel from "@/components/User/LoginPanel";
import RegisterPanel from "@/components/User/RegisterPanel";
import { component as VueModal } from "@xunlei/vue-modal";
// import css
import "@xunlei/vue-modal/src/vue-modal.css";
export default {
    data() {
        return {
            login: true
        };
    },
    components: {
        LoginPanel,
        RegisterPanel
    },
    methods: {
        change() {
            this.login = !this.login;
        }
    }
};
</script>
<style>

</style>

