<script>
    export default {
        name: "cascade-gallery-spinner"
    }
</script>

<template>
    <div class="spinner">
        <div class="spinner-1"></div>
        <div class="spinner-2"></div>
    </div>
</template>

<style>
    .spinner-1, .spinner-2{
        border: 3px solid transparent;
        border-top: 3px solid #999;
        border-radius: 50%;
        width: 30px;
        height: 30px;
        position: absolute;
        left: 0;
        top: 0;
        animation: rotate .55s ease-out infinite;
    }
    .spinner-2 {
        animation: rotate 1.1s linear infinite;
    }

    @keyframes rotate {
        0% {
            transform: rotate(0deg);
            opacity: .3;
        }
        20% {
            transform: rotate(150deg);
            opacity: .7;
        }
        40% {
            transform: rotate(250deg);
            opacity: 1;
        }
        70% {
            transform: rotate(300deg);
            opacity: .7;
        }
        100% {
            transform: rotate(360deg);
            opacity: .3;
        }
    }
</style>