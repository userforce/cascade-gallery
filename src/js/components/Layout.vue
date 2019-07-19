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
        }
    }
</script>

<template>
    <div class="cascade-gallery">
        <div class="cascade-gallery-wrapper" v-if="size == 'small'">
            <small-template :images.sync="images"></small-template>
        </div>
    </div>
</template>

<style scoped>
    .cascade-gallery-wrapper {
    }
</style>