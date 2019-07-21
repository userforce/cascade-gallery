<script>
    export default {
        name: "cascade-gallery-spinner"
    }
</script>

<template>
    <div class="spinner">
        <div class="spinner-1"></div>
        <div class="spinner-2"></div>
        <div class="spinner-3"></div>
        <div class="spinner-4"></div>
        <div class="spinner-5"></div>
    </div>
</template>

<style>
    .spinner-1, .spinner-2, .spinner-3, .spinner-4, .spinner-5 {
        width: 3px;
        height: 7px;
        position: absolute;
        bottom: 0px;
        background: #cccccc;
    }
    .spinner-1{
        left: 5px;
        animation: jump 1s .1s ease-out infinite;
    }
    .spinner-2{
        left: 10px;
        animation: jump 1s .2s ease-out infinite;
    }
    .spinner-3{
        left: 15px;
        animation: jump 1s .3s ease-out infinite;
    }
    .spinner-4{
        left: 20px;
        animation: jump 1s .4s ease-out infinite;
    }
    .spinner-5{
        left: 25px;
        animation: jump 1s .5s ease-out infinite;
    }
    @keyframes jump {
        0% {
            bottom: 0px;
        }
        50% {
            bottom: 10px;
        }
        100% {
            bottom: 0px;
        }
    }
</style>