<script>
    import CascadeGalleryLoader from '../spinner/Spinner.vue';
    import CascadeGalleryModal from './Modal.vue';
    import c from '../../constants';

    export default {
        name: c.IMAGE_COMPONENT_NAME,
        components: (function(){
            let components = {};
            components[c.SPINNER_COMPONENT_NAME] = CascadeGalleryLoader;
            components[c.MODAL_COMPONENT_NAME] = CascadeGalleryModal;
            return components;
        })(),
        props: {
            imagesData: {type: Object},
            config: {type: Object},
            index: {type: Number}
        },
        data() {
            return {
                showModal: false,
                showSpinner: true,
                defaultIndex: this.imagesData[c.DEFAULT_INDEX_KEY] ? this.imagesData[c.DEFAULT_INDEX_KEY] : 0,
                image: {
                    element: null,
                    styles: {
                        width: 'auto',
                        height: 'auto',
                        top: 0,
                        left: 0
                    },
                    classes: [c.ANIMATION_CSS_CLASS_HIDE]
                }
            };
        },
        mounted() {
            let self = this;
            this.$on('closeModal', function () {
                self.setShowModal(false)
            });
        },
        methods: {

            /**
             * On image load prepare image config
             * @param event
             */
            loadConfig(event) {
                this.image.element = event.target;
                this.setImageStyles();
                this.waitPreviousImage();
            },

            /**
             * Wait until previous image is loaded and
             * just after that display the current one
             */
            waitPreviousImage() {
                let self = this;
                let waitForPrevious = setInterval(function () {
                    if (self.previousImageLoaded()) {
                        self.showSpinner = false;
                        self.showImage();
                        clearInterval(waitForPrevious);
                    }
                }, 10);
            },

            /**
             * Display the image after a given delay time.
             */
            showImage() {
                let self = this;
                self.animate();
                let waitForPrevious = setTimeout(function () {
                    self.setLoaded();
                }, self.config[c.CONFIG_DELAY_KEY]);
            },

            /**
             * Loaded property is synced with Gallery that
             * can be read in the next image which is
             * waiting current one loading time
             */
            setLoaded() {
                this.config.images[this.index].loaded = true;
            },

            /**
             * Displays image in the best way, if the image is
             * taller then image block it will proportionally
             * set it by width otherwise will set it by height
             * also align it by center the same way.
             * @see this.getImagePropHeight()
             * @see this.getImagePropWidth()
             * @returns {boolean}
             */
            setImageStyles() {
                let gap = this.config.gap ? this.config.gap : 0;
                if (this.getImagePropHeight() < this.getWrapperWidth()) {
                    this.image.styles.width = '100%';
                    this.image.styles.top = '-' + (this.getImagePropWidth() - (this.getWrapperHeight() + gap)) / 2 + 'px';
                    return true;
                } else {
                    this.image.styles.height = '100%';
                    this.image.styles.left = '-' + (this.getImagePropHeight() - (this.getWrapperWidth() + gap)) / 2 + 'px';
                    return true;
                }
            },

            /**
             * Gets image height from element
             * @returns Number
             */
            getImageHeight() {
                return this.image.element.offsetHeight;
            },

            /**
             * Gets image width from element
             * @returns Number
             */
            getImageWidth() {
                return this.image.element.offsetWidth;
            },

            /**
             * Gets image block (parent) height from element
             * @returns Number
             */
            getWrapperHeight() {
                return this.config.images[this.index].height;
            },

            /**
             * Gets image block (parent) width from element
             * @returns Number
             */
            getWrapperWidth() {
                return this.config.images[this.index].width;
            },

            /**
             * Finds in advance the image height if it is
             * proportionally resize to the (parent) image
             * block height
             * @returns Number
             */
            getImagePropHeight() {
                let diffHeightInPercentage = (100 * this.getImageWidth()) / this.getImageHeight();
                return this.getWrapperHeight() * diffHeightInPercentage / 100;
            },

            /**
             * Finds in advance the image width if it was
             * proportionally resized to the (parent) image
             * block width
             * @returns Number
             */
            getImagePropWidth() {
                let diffWidthInPercentage = (100 * this.getImageHeight()) / this.getImageWidth();
                return this.getWrapperWidth() * diffWidthInPercentage / 100;
            },

            /**
             * Check if the image is the first in list
             * @returns Boolean
             */
            isFirstImage() {
                return parseInt(this.index) === 0;
            },

            /**
             * Check if previous image was loaded
             * @see this.waitPreviousImage()
             * @returns Boolean
             */
            previousImageLoaded() {
                if (this.isFirstImage()) {
                    return true;
                }
                return this.config.images[this.index - 1].loaded;
            },

            /**
             * Add animation classes to the image
             * TODO: css animations
             * @returns Boolean
             */
            animate() {
                this.image.classes.push(c.ANIMATION_CSS_CLASS_APPEND);
            },

            /**
             * Display image modal
             * @param value
             */
            setShowModal(value) {
                this.showModal = value;
            }
        }
    }
</script>

<template>
    <div class="cgl-image">
        <div class="cgl-image-wrapper">
            <div class="cgl-image-back">
                <img :src="imagesData.src[defaultIndex]"
                     :class="image.classes"
                     :style="image.styles"
                     @load="loadConfig($event)"
                     @error="loadConfig($event)"
                     @click="setShowModal(true)"/>
            </div>
            <div class="cgl-loader-box"
                v-show="showSpinner">
                <cgl-spinner></cgl-spinner>
            </div>
            <div class="cgl-info-card-block"
                 v-show="!showSpinner">
                <slot v-bind:index="index"></slot>
            </div>
        </div>
        <cgl-modal :images.sync="imagesData"
                   :config.sync="config"
                   :index="index"
                   :defaultIndex="defaultIndex"
                   v-if="showModal">
        </cgl-modal>
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
    }

    .cgl-image .cgl-image-wrapper img {
        position: absolute;
    }

    .cgl-image .cgl-image-wrapper .cgl-image-back {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.08);
        background: -moz-linear-gradient(45deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.04) 46%, rgba(0,0,0,0.04) 46%, rgba(255,255,255,0.1) 100%);
        background: -webkit-gradient(left bottom, right top, color-stop(0%, rgba(0,0,0,0.08)), color-stop(46%, rgba(0,0,0,0.04)), color-stop(46%, rgba(0,0,0,0.04)), color-stop(100%, rgba(255,255,255,0.1)));
        background: -webkit-linear-gradient(45deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.04) 46%, rgba(0,0,0,0.04) 46%, rgba(255,255,255,0.1) 100%);
        background: -o-linear-gradient(45deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.04) 46%, rgba(0,0,0,0.04) 46%, rgba(255,255,255,0.1) 100%);
        background: -ms-linear-gradient(45deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.04) 46%, rgba(0,0,0,0.04) 46%, rgba(255,255,255,0.1) 100%);
        background: linear-gradient(45deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.04) 46%, rgba(0,0,0,0.04) 46%, rgba(255,255,255,0.1) 100%);
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#000000', endColorstr='#ffffff', GradientType=1 );
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
    .cgl-info-card-block{
        width: 0;
        top: 0;
        position: static;
    }
</style>