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
            // Set default height range
            default_config[c.CONFIG_HEIGHT_RANGE_KEY] = {};
            // Set default animation range
            default_config[c.CONFIG_DELAY_KEY] = c.CONFIG_APPENDING_DELAY;
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
                let config = {};
                config[c.CONFIG_WIDTH_RANGE_KEY] = this.getRangeFor(this.config, c.CONFIG_WIDTH_RANGE_KEY);
                config[c.CONFIG_HEIGHT_RANGE_KEY] = this.getRangeFor(this.config, c.CONFIG_HEIGHT_RANGE_KEY);
                config[c.CONFIG_DELAY_KEY] = this.getDelay();
                return config;
            },

            /**
             * @returns Number
             */
            getDelay() {
                if (validator.hasDelay(this.config)) {
                    return this.config[c.CONFIG_DELAY_KEY];
                }
                return this.default[c.CONFIG_DELAY_KEY];
            },

            /**
             * @param config
             * @param key Range option key
             * @returns Boolean
             */
            getRangeFor(config, key) {
                let hasRange = validator.hasRangesFor(config, key);
                let defaultRange = this.default[key];
                return hasRange ? config[key] : defaultRange;
            },

        }
    }
</script>

<template>
    <div class="cascade-gallery">
        <div class="cascade-gallery-wrapper">
            <cgl-template :images.sync="images" :options="getConfig()"></cgl-template>
        </div>
    </div>
</template>

<style>
</style>