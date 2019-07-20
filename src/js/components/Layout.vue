<script>
    import CascadeGalleryTemplate from './templates/Template.vue';
    export default {
        components: {
            'cascade-gallery-template': CascadeGalleryTemplate
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
            <cascade-gallery-template :images.sync="images"></cascade-gallery-template>
        </div>
    </div>
</template>

<style scoped>
    .cascade-gallery-wrapper {
    }
</style>