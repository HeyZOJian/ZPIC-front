<template>
    <div class="container-fluid" style="padding:10px;width:350px">
        <h3>更改密码</h3>
        <div class="row" style="padding-left:15px;padding-right:15px;padding-top:5px">
            <input v-model="psw.old_password" type="password" class="form-control" placeholder="旧密码" />
        </div>
        <div class="row" style="padding-left:15px;padding-right:15px;padding-top:5px">
            <input v-model="psw.new_password" type="password" class="form-control" placeholder="新密码" />
        </div>
        <div class="row" style="padding-left:15px;padding-right:15px;padding-top:5px;padding-bottom:10px">
            <input v-model="psw.other_new_password" type="password" class="form-control" placeholder="再输入一次新密码" />
        </div>
        <button @click="change" @keypress.13="change" class="btn btn-success btn-block">确认</button>
    </div>
</template>

<script>
import store from "@/store/index";
import {Notice} from 'iview';
export default {
    data() {
        return {
            psw: {
                old_password: "",
                new_password: "",
                other_new_password: "",
                username: JSON.parse(localStorage.getItem("myInfo")).username
            }
        };
    },
    methods: {
        change() {
            if (this.psw.new_password != this.psw.other_new_password) {
                this.$Notice.error({
                    title: "更改密码",
                    desc: "两次输入的密码不一致",
                    duration: 10
                });
                this.pws.old_password = "";
                this.pws.new_password = "";
                this.psw.other_new_password = "";
            }
            store.dispatch("ChangePassword", this.psw);
            setTimeout(function() {
                console.log(store.state.login.error);
                if (store.state.login.error == "") {
                    Notice.success({
                        title: "更改密码",
                        desc: "密码更改成功，请重新登录",
                        duration: 10
                    });
                    setTimeout(function() {
                        store.dispatch("UserLogout");
                        location.href("/");
                    }, 1500);
                } else {
                    Notice.error({
                        title: "更改密码",
                        desc: "更改密码失败",
                        duration: 10
                    });
                }
            }, 1500);
        }
    }
};
</script>

<style>

</style>
