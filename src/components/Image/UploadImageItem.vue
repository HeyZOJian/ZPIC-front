<template>
    <div class="container-fluid" style="width:500px;">
        <div class="row">
            <br/>
            <vue-img-inputer v-model="picValue" theme="light" size="large"></vue-img-inputer>
        </div>
        <div class="row">
            <div class="col-md-10 col-md-offset-1" style="margin-bottom:3%">
                <strong>标题</strong>
                <div class="col">
                    <textarea v-model="title" type="text" class="form-control"></textarea>
                </div>
                <br>
                <button class="btn btn-success btn-block btn-lg" @click="upload">发布</button>
            </div>
        </div>
    </div>
</template>

<script>
import VueImgInputer from "vue-img-inputer";
import store from "@/store/index";
export default {
    name: "UploadImageItem",
    data() {
        return {
            picValue: null,
            show: false,
            title: ""
        };
    },
    components: {
        VueImgInputer
    },
    methods: {
        toggleShow() {
            this.show = !this.show;
        },
        upload() {
            let data = new FormData();
            data.append("image", this.picValue);
            data.append("title", this.title);
            console.log(this.title + this.imgDataUrl);
            store.dispatch("UploadImage", data);
            setTimeout(function() {
                location.reload();
            }, 1000);
        }
    }
};
</script>

<style>
.upload-image {
    margin-top: 5%;
}
</style>
