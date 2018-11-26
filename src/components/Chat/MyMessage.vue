<template>
    <div class="row">
        <div class="col-md-11 bubble">
            {{data.message}}
        
            <img src="@/assets/avatar.png" class="img-circle avatar" />
        </div>
    </div>
</template>

<script>
export default {
    props: ["data"]
};
</script>

<style>
.bubble {
    background-color: #4d90fe;
    color: white;
    margin: 5px;
    padding: 10px;
    border-radius: 10px;
    width: 80%;
    text-align: right;
}
.avatar {
    border-width: 1px;
    border-color: #bfbfbf;
    border-style: solid;
    width: 48px;
}
</style>
