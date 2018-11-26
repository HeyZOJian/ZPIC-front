// TODO:
// 1.表单格式验证
// 2.用户名、昵称可用性验证
<template>
    <div class="panel panel-default">
        <div class="panel-heading ">
            <h3>注册</h3>
        </div>
        <div class="panel-body">
            <div class="row" style="margin-top:5%;margin-bottom:5%">
                <label class="col-sm-3 control-label">用户名</label>
                <div class="col-sm-9">
                    <input v-model="formValidate.username" type="email" class="form-control" placeholder="请输入用户名">
                </div>
            </div>

            <div class="row" style="margin-top:5%;margin-bottom:5%">
                <label class="col-sm-3 control-label">昵称</label>
                <div class="col-sm-9">
                    <input v-model="formValidate.nickname" type="text" class="form-control" placeholder="请输入昵称">
                </div>
            </div>

            <div class="row" style="margin-top:5%;margin-bottom:5%">
                <label for="inputPassword3" class="col-sm-3 control-label">密码</label>
                <div class="col-sm-9">
                    <input v-model="formValidate.password" type="password" class="form-control" placeholder="请输入密码">
                </div>
            </div>
            <div class="row" style="margin-top:5%;margin-bottom:5%">
                <div class="col-sm-offset-3 col-sm-9">
                    <button @click="register" type="submit" class="btn btn-success btn-block">注册</button>
                </div>
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
                nickname: "",
                password: ""
            }
        };
    },
    computed: {
        ...mapActions({
            UserRegister: "UserRegister"
        })
    },
    methods: {
        register: function(name) {
            if(this.formValidate.nickname.trim()==""){
                this.$Notice.error({
                    title: "昵称为空"
                });
            }
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
                        var regex = new RegExp(
                            "(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{6,30}"
                        );
                        if (regex.test(this.formValidate.password)) {
                            this.$store.dispatch(
                                "UserRegister",
                                this.formValidate
                            );
                        } else {
                            this.$Notice.error({
                                title: "密码格式不正确",
                                desc:
                                    "至少8个字符，必须包含字母，数字，特殊字符"
                            });
                        }
                    }
                } else {
                    this.$Notice.error({
                        title: "用户名格式不正确",
                        desc:"请使用邮箱格式注册"
                    });
                }
            }
        }
    },
    mounted: function() {
        if (localStorage.getItem("error")) {
            this.$Message.error("账号或密码错误!");
            localStorage.removeItem("error");
        }
    }
};
</script>

// TODO：用户名/昵称 可用性检查
