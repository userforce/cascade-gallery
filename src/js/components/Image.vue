<script>
    export default {
        name: "cascade-gallery-image",
        props: {
            images: { type: Array },
            default_index: { type: Number },
            config: { type: Number }
        },
        data() {
            return {

            };
        },
        computed: {
            defaultIndex() {
                let index = parseInt(this.default_index);
                return !!index ? index : 0;
            }
        },
        mounted() {
            console.log(this.config);
        }
    }
</script>

<template>
    <div class="cascade-gallery-image">
        <img :src="images[defaultIndex]" v-bind:style="{width: config.width + 'px'}"/>
    </div>
</template>

<style scoped>
    .cascade-gallery-image {
        float: left;
    }
</style>