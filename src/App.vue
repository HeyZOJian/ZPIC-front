<template>
    <div id="app" >
        <navbar v-if="isLogin"></navbar>
        <router-view style="margin-top:55px"/>
    </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import store from "@/store/index";
export default {
    name: "App",
    components: {
        Navbar
    },
    computed:{
        isLogin(){
            return store.state.login.myInfo
        }
    }
};
</script>

<style>
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    /* background-color:#F2F2F2 */
}
</style>
