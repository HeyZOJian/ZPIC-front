<template>
    <span v-if="imgId">

        <img @click="show" :src="imgUrl" style="width:30%; height:30%">

        <vue-modal v-model="showModal" :backdrop="true" style="margin-top:55px">
            <div class="modal-4">
                <image-detail></image-detail>
            </div>
        </vue-modal>

    </span>
</template>

<script>
import { component as VueModal } from "@xunlei/vue-modal";
import "@xunlei/vue-modal/src/vue-modal.css";
import store from "@/store/index";
import ImageDetail from "@/components/Image/ImageDetail";
export default {
    name: "ImgBrief",
    props: ["imgUrl", "imgId"],
    components: {
        VueModal,
        ImageDetail
    },
    data() {
        return {
            showModal: false
        };
    },
    methods: {
        show() {
            store.dispatch("GetImageDetail", {img_id:this.imgId,page:1});
            store.dispatch("GetImageLikes", this.imgId);
            this.showModal = !this.showModal;
        }
    }
};
</script>


<style>
img {
    margin: 1%;
}
.modal-4 {
    border: 1px solid #fff;
    padding: 3em;
    border-radius: 5em;
    background: rgba(255, 255, 255, 0.01);
}
</style>
