<script>
    import SmallSizeTemplate from './templates/SmallSizeTemplate.vue';
    export default {
        components: {
            'small-template': SmallSizeTemplate
        },
        props: {
            images: { type: Array },
            size: { type: String }
        },
        data() {
            return {};
        },
        mounted() {
            console.log(this.size);
        }
    }
</script>

<template>
    <div class="cascade-gallery">
        <div class="cascade-gallery-wrapper" v-if="size == 'small'">
            <small-template :images="images"></small-template>
        </div>
        <div class="cascade-gallery-wrapper" v-else-if="size == 'large'">
            large
        </div>
        <div class="cascade-gallery-wrapper" v-else>
            medium
        </div>
    </div>
</template>

<style scoped>
    .cascade-gallery {
        width: 1200px;
        margin: 0 auto;
    }
</style>