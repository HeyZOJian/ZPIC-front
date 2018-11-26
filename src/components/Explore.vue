<template>
    <div class="container-fluid" v-if="imagesInfo">
        <div class="row">
            <div class="col-md-10 col-md-offset-1" style="margin-top:2%">
                <image-brief v-for="image in imagesInfo" :key="image.index" :imgUrl="image.img_url+'?imageView2/1/w/300/h/300/format/webp/q/75|imageslim'" :imgId="image.id" />
            </div>
        </div>
        <div class="row" >
            <a v-if="haveMore" @click="getMoreImages" style="padding-bottom:15px">加载更多</a>
            <p v-else style="padding-bottom:15px">已经到底了</p>
        </div>
    </div>
</template>

<script>
import ImageBrief from "@/components/Image/ImageBrief";
import store from "@/store/index";
export default {
    beforeMount() {
        store.dispatch("ExploreImages", 1);
        store.dispatch("InitExplorePageNum")
    },
    components: {
        ImageBrief
    },
    data() {
        return {};
    },
    computed: {
        imagesInfo() {
            return store.state.explore.imagesInfo;
        },
        haveMore() {
            return store.state.explore.haveMoreImage;
        },
        pageNum(){
            return store.state.explore.explorePageNum;
        }
    },
    methods:{
        getMoreImages(){
            store.dispatch('ExploreImages',this.pageNum)
            store.dispatch('AddExplorePageNum')
        }
    }
};
</script>

<style>

</style>