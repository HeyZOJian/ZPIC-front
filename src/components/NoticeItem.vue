<template>
    <div class="container-fluid" style="width:500px">
        <h3>通知列表</h3>
        <div data-spy="scroll" data-target="#navbar-example" style="height:450px;overflow:auto; position: relative; margin-top:5%">
            <div v-for="notice in noticesInfo" :key="notice.index">
                <div class="row" style="height:98px; border-bottom-style: solid;border-width: 1px; border-color:#CFCFCF">
                    <div class="col-md-2">
                        <img v-if="notice.notice_type=='like'" src="@/assets/dislike.png" style="width:32px;padding-top:55%" />
                        <img v-else-if="notice.notice_type=='comment'" src="@/assets/comments.png" style="width:32px;padding-top:55%" />
                        <img v-else-if="notice.notice_type=='friend'" src="@/assets/avatar.png" style="width:32px;padding-top:55%" />
                    </div>
                    <div class="col-md-6">
                        <p style="font-size:120%;padding-top:15%;text-align:left">
                            {{notice.message}}
                        </p>
                    </div>
                    <div class="col-md-4">
                        <img v-if="notice.img_url" @click="show(notice.img_id)" :src="notice.img_url+'?imageView2/1/w/300/h/300/format/webp/q/75|imageslim'" style="height:94px" />
                    </div>
                </div>
            </div>
        </div>
        <vue-modal v-model="showModal" :backdrop="true" style="margin-top:10px">
            <div class="modal-4" style="padding:20px">
                <image-detail></image-detail>
            </div>
        </vue-modal>
    </div>
</template>

<script>
import store from "@/store/index";
import ImageDetail from "@/components/Image/ImageDetail";
import { component as VueModal } from "@xunlei/vue-modal";
import "@xunlei/vue-modal/src/vue-modal.css";
export default {
    data(){
        return{
            showModal:false
        }
    },
    computed: {
        noticesInfo() {
            return store.state.notice.noticesInfo;
        }
    },
    methods: {
        show(img_id) {
            store.dispatch("GetImageDetail", { img_id: img_id, page: 1 });
            store.dispatch("GetImageLikes", img_id);
            this.showModal = !this.showModal;
        }
    },
     components: {
        VueModal,
        ImageDetail
    },
};
</script>

<style>
notice-type img {
    width: 32px;
}
</style>
