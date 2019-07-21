<script>
    import CascadeGalleryLoader from './spinner/Spinner.vue';
    import constants from '../constants';

    export default {
        name: constants.IMAGE_COMPONENT_NAME,
        components: (function(){
            let components = {};
            components[constants.SPINNER_COMPONENT_NAME] = CascadeGalleryLoader;
            return components;
        })(),
        props: {
            images: {type: Array},
            defaultIndex: {type: Number},
            config: {type: Object},
            index: {type: Number}
        },
        data() {
            return {
                showSpinner: false,
                image: {
                    element: null,
                    styles: {
                        width: 'auto',
                        height: 'auto',
                        top: 0,
                        left: 0
                    },
                    classes: [constants.ANIMATION_CSS_CLASS_HIDE]
                }
            };
        },
        mounted() {
            this.$on()
        },
        methods: {
            loadConfig(event) {
                this.image.element = event.target;
                this.setImageStyles();
                this.waitPreviousImage();
            },
            waitPreviousImage() {
                let self = this;
                let waitForPrevious = setInterval(function () {
                    if (self.previousImageLoaded()) {
                        self.showImage();
                        clearInterval(waitForPrevious);
                    }
                }, 10);
            },
            showImage() {
                let self = this;
                self.animate();
                let waitForPrevious = setTimeout(function () {
                    self.setLoaded();
                    self.$emit(constants.LOADED_EVENT_NAME);
                }, 170);
            },
            setLoaded() {
                this.config.images[this.index].loaded = true;
            },
            setImageStyles() {
                if (this.getImagePropHeight() < this.getWrapperWidth()) {
                    this.image.styles.width = '100%';
                    this.image.styles.top = '-' + (this.getImagePropWidth() - this.getWrapperHeight()) / 2 + 'px';
                    return true;
                } else {
                    this.image.styles.height = '100%';
                    this.image.styles.left = '-' + (this.getImagePropHeight() - this.getWrapperWidth()) / 2 + 'px';
                    return true;
                }
            },
            getImageHeight() {
                return this.image.element.offsetHeight;
            },
            getImageWidth() {
                return this.image.element.offsetWidth;
            },
            getWrapperHeight() {
                return this.config.images[this.index].height;
            },
            getWrapperWidth() {
                return this.config.images[this.index].width;
            },
            getImagePropHeight() {
                let diffHeightInPercentage = (100 * this.getImageWidth()) / this.getImageHeight();
                return this.getWrapperHeight() * diffHeightInPercentage / 100;
            },
            getImagePropWidth() {
                let diffWidthInPercentage = (100 * this.getImageHeight()) / this.getImageWidth();
                return this.getWrapperWidth() * diffWidthInPercentage / 100;
            },
            isFirstImage() {
                return this.index == 0;
            },
            previousImageLoaded() {
                if (this.isFirstImage()) {
                    return true;
                }
                return this.config.images[this.index - 1].loaded;
            },
            animate() {
                this.image.classes.push(constants.ANIMATION_CSS_CLASS_APPEND);
            },
        }
    }
</script>

<template>
    <div class="cgl-image">
        <div class="cgl-image-wrapper">
            <img :src="images[defaultIndex]?images[defaultIndex]:images[0]"
                 :class="image.classes"
                 :style="image.styles"
                 @load="loadConfig($event)"/>
            <div class="cgl-loader-box"
                v-if="showSpinner">
                <cgl-spinner></cgl-spinner>
            </div>
        </div>
    </div>
</template>

<style>
    .cgl-image {
        width: 100%;
        height: 100%;
    }

    .cgl-image * {
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }

    .cgl-image .cgl-image-wrapper {
        overflow: hidden;
        position: relative;
        width: 100%;
        height: 100%;
        border: 5px solid transparent;
    }

    .cgl-image .cgl-image-wrapper img {
        position: absolute;
        height: 100%;
    }

    .cgl-image .cgl-image-wrapper img.cgl-image-anim-hide {
        opacity: 0;
    }

    .cgl-image .cgl-image-wrapper img.cgl-image-anim-append {
        -webkit-transition: all .35s ease-in;
        -moz-transition: all .35s ease-in;
        -o-transition: all .35s ease-in;
        transition: all .35s ease-in;
        opacity: 1;
    }
    .cgl-image .cgl-image-wrapper .cgl-loader-box {
        position: relative;
        left: 50%;
        margin-left: -15px;
        top: 35%;
    }
</style>