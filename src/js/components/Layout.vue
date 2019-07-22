<script>
    import CascadeGallery from './templates/Gallery.vue';
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
            components[c.GALLERY_COMPONENT_NAME] = CascadeGallery;
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
            // Set default animation delay
            default_config[c.CONFIG_DELAY_KEY] = c.CONFIG_APPENDING_DELAY;
            // Set default animation range
            default_config[c.CONFIG_GAP_KEY] = c.CONFIG_GAP;
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
                config[c.CONFIG_GAP_KEY] = this.getGap();
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
             * @returns Number
             */
            getGap() {
                if (validator.hasGap(this.config)) {
                    return this.config[c.CONFIG_GAP_KEY];
                }
                return this.default[c.CONFIG_GAP_KEY];
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
            <cgl-gallery :images.sync="images" :options="getConfig()"></cgl-gallery>
        </div>
    </div>
</template>