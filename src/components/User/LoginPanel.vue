<template>
    <div class="panel panel-default">
        <div class="panel-heading ">
            <h3>登录</h3>
        </div>
        <div class="panel-body">
            <div class="row" style="margin-top:5%;margin-bottom:5%">
                <div class="col-md-3">
                    <label>用户名</label>
                </div>
                <div class="col-md-9">
                    <input v-model="formValidate.username" type="email" class="form-control" placeholder="请输入用户名">
                </div>
            </div>
            <div class="row" style="margin-top:5%;margin-bottom:5%">
                <div class="col-md-3">
                    <label>密码</label>
                </div>
                <div class="col-md-9">
                    <input v-model="formValidate.password" type="password" class="form-control" placeholder="请输入密码">
                </div>
            </div>
            <div class="row" style="margin-top:5%;margin-bottom:3%">
                <div class="col-sm-offset-3 col-sm-9">
                    <button @click="login" @keyup.enter="login" class="btn btn-success btn-block">登录</button>
                </div>
            </div>
            <div class="col-sm-offset-3 col-sm-9">
                <a>忘记密码</a>
            </div>
        </div>

    </div>
</template>

<script>
import { mapActions } from "vuex";
import store from "@/store/index";
export default {
    data() {
        return {
            formValidate: {
                username: "",
                password: ""
            }
        };
    },
    computed: {
        ...mapActions({
            UserLogin: "UserLogin"
        })
    },
    methods: {
        login: function(name) {
            if (this.formValidate.username.trim() == "") {
                this.$Notice.error({
                    title: "用户名为空"
                });
            } else {
                var regex = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g;
                if (regex.test(this.formValidate.username)) {
                    if (this.formValidate.password.trim() == "") {
                        this.$Notice.error({
                            title: "密码为空"
                        });
                    } else {
                        this.$store.dispatch("UserLogin", this.formValidate);
                    }
                } else {
                    this.$Notice.error({
                        title: "用户名格式不正确"
                    });
                }
            }
        }
    },
    mounted: function() {
        if (localStorage.getItem("error")) {
            // this.$Message.error("账号或密码错误!");
            this.$Notice.error({
                title: "账号或密码错误!"
            });
            localStorage.removeItem("error");
        }
        if (localStorage.getItem("msg")) {
            this.$Message.success(localStorage.getItem("msg"));
            localStorage.removeItem("msg");
        }
    }
};
</script>

