<script>
    import Template from './templates/Template.vue';
    import constants from '../constants';

    export default {
        name: constants.LAYOUT_COMPONENT_NAME,
        components: (function(){
            let components = {};
            components[constants.TEMPLATE_COMPONENT_NAME] = Template;
            return components;
        })(),
        props: {
            images: { type: Array },
            size: { type: String }
        }
    }
</script>

<template>
    <div class="cascade-gallery">
        <div class="cascade-gallery-wrapper" v-if="size == 'small'">
            <cgl-template :images.sync="images"></cgl-template>
        </div>
    </div>
</template>

<style>
</style>