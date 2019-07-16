<script>
    export default {
        name: "cascade-gallery-image",
        props: {
            images: { type: Array },
            default_index: { type: Number },
            config: { type: Object }
        },
        data() {
            return {

            };
        },
        mounted() {
            // console.log(this.default_index);
        }
    }
</script>

<template>
    <div>
        <img :src="images[default_index]?images[default_index]:images[0]"/>
    </div>
</template>