<template>
    <div class="panel panel-default" style="width:500px">
        <div class="panel-heading ">
            <h3>编辑</h3>
        </div>
        <div class="panel-body">
            <!-- <div class="row" style="margin-top:5%;margin-bottom:5%">
                <img v-if="profilePhotoUrl" :src="profilePhotoUrl" width="120px" class="img-circle" />
                <img v-else src="@/assets/avatar.png" width="120px" class="img-circle" />
                <input type="file">
            </div> -->
            <div class="row" style="margin-top:5%;margin-bottom:5%">
                <div class="col-md-3">
                    <label>昵称</label>
                </div>
                <div class="col-md-9">
                    <input v-model="data.nickname" type="text" class="form-control" :placeholder=nickname>
                </div>
            </div>
            <div v-if="gender" class="row" style="margin-top:5%;margin-bottom:5%">
                <div class="col-md-3">
                    <label>性别</label>
                </div>
                <div class="col-md-3">
                    <button @click="selectMan" :class=manClass value="man">
                        <strong>男</strong>
                    </button>
                </div>
                <div class="col-md-3">
                    <button @click="selectWomen" :class=womenClass value="women">
                        <strong>女</strong>
                    </button>
                </div>
                <div class="col-md-3">
                    <button @click="selectNull" :class=nullClass value="null">
                        <strong>未设置</strong>
                    </button>
                </div>
            </div>
            <div class="row" style="margin-top:5%;margin-bottom:5%">
                <div class="col-md-3">
                    <label>手机号码</label>
                </div>
                <div class="col-md-9">
                    <input v-model="data.phoneNum" type="text" class="form-control" :placeholder=phoneNum>
                </div>
            </div>
            <div class="row" style="margin-top:5%;margin-bottom:5%">
                <div class="col-md-3">
                    <label>简介</label>
                </div>
                <div class="col-md-9">
                    <textarea v-model="data.description" type="text" class="form-control" :placeholder=description></textarea>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <button @click="update" @keypress.13="update" class="btn btn-success btn-block">更新</button>
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
            data: {
                nickname: "",
                description: "",
                phoneNum: "",
                gender: ""
            },
            manClass: null,
            womenClass: null,
            nullClass: null
        };
    },
    computed: {
        nickname() {
            var nickname = JSON.parse(localStorage.getItem("myInfo")).nickname;
            this.data.nickname = nickname;
            return nickname;
        },
        description() {
            var description = JSON.parse(localStorage.getItem("myInfo")).description;
            this.data.description = description
            return description;
        },
        phoneNum() {
            var phoneNum = JSON.parse(localStorage.getItem("myInfo")).phone_num;
            this.data.phonrNum = phoneNum
            return phoneNum;
        },
        gender() {
            var num = JSON.parse(localStorage.getItem("myInfo")).gender;
            if (num == 1) this.manClass = "btn-success btn btn-block btn-sm";
            else if (num == 2)
                this.womenClass = "btn-success btn btn-block btn-sm";
            else this.nullClass = "btn-success btn btn-block btn-sm";
            this.data.gender = num;
            return num;
        },
        profilePhotoUrl() {
            if (JSON.parse(localStorage.getItem("myInfo")).profile_photo_url) {
                return JSON.parse(localStorage.getItem("myInfo"))
                    .profile_photo_url;
            } else {
                return null;
            }
        }
    },
    methods: {
        selectMan() {
            this.manClass = "btn-success btn btn-block btn-sm";
            this.womenClass = "btn-default btn btn-block btn-sm";
            this.nullClass = "btn-default btn btn-block btn-sm";
            this.data.gender = 1;
        },
        selectWomen() {
            this.manClass = "btn-default btn btn-block btn-sm";
            this.womenClass = "btn-success btn btn-block btn-sm";
            this.nullClass = "btn-default btn btn-block btn-sm";
            this.data.gender = 2;
        },
        selectNull() {
            this.manClass = "btn-default btn btn-block btn-sm";
            this.womenClass = "btn-default btn btn-block btn-sm";
            this.nullClass = "btn-success btn btn-block btn-sm";
            this.data.gender = 3;
        },
        update() {
            // console.log(this.data);
            store.dispatch('UserUpdate', this.data);
        }
    }
};
</script>