<script>
    import Template from './templates/Template.vue';
    import validator from '../validator';
    /**
     * For the purpose of keeping lines shorter use [c] letter
     * to reference to the constants. I this particular case
     * it is readable and clean anyway.
     */
    import c from '../constants';

    export default {
        name: c.LAYOUT_COMPONENT_NAME,
        components: (function(){
            let components = {};
            components[c.TEMPLATE_COMPONENT_NAME] = Template;
            return components;
        })(),
        props: {
            images: {
                type: Array
            },
            config: {
                type: Object,
                validator: validator.validate
            }
        },
        data() {
            let default_config = {};

            // Set default width range
            default_config[c.CONFIG_WIDTH_RANGE_KEY] = {};
            default_config[c.CONFIG_WIDTH_RANGE_KEY][c.CONFIG_RANGE_KEY_FROM] = c.CONFIG_WIDTH_FROM;
            default_config[c.CONFIG_WIDTH_RANGE_KEY][c.CONFIG_RANGE_KEY_TO] = c.CONFIG_WIDTH_TO;

            return {
                default: default_config
            }
        },
        methods: {

            /**
             * Retrieve config from props or get defaults.
             * @returns Object
             */
            getConfig() {
                let widthRanges = this.getWidthRanges(this.config);
                return {};
            },

            /**
             * @param config
             * @returns Boolean
             */
            getWidthRanges(config) {
                let hasWidthRange = validator.hasWidthRanges(config);
                let defaultWidthRange = this.default[c.CONFIG_WIDTH_RANGE_KEY];
                return hasWidthRange ? config[c.CONFIG_WIDTH_RANGE_KEY] : defaultWidthRange;
            },

        }
    }
</script>

<template>
    <div class="cascade-gallery">
        <div class="cascade-gallery-wrapper">
            <cgl-template :images.sync="images"></cgl-template>
        </div>
    </div>
</template>

<style>
</style>