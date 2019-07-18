<script>
    export default {
        name: "cascade-gallery-image",
        props: {
            images: { type: Array },
            default_index: { type: Number },
            config: { type: Object }
        },
        data() {
            return {
                image: {
                    element: null,
                    styles: {
                        width: 'auto',
                        height: 'auto',
                        top: 0,
                        left: 0
                    }
                }
            };
        },
        methods: {
            showImage(event) {
                this.image.element = event.target;
                this.setImageStyles();

                this.config.loaded = true;
            },
            setImageStyles() {
                if(this.getImagePropHeight() < this.getWrapperWidth()) {
                    this.image.styles.width = '100%';
                    this.image.styles.top = '-'+(this.getImagePropWidth()-this.getWrapperHeight())/2+'px';
                } else {
                    this.image.styles.height = '100%';
                    this.image.styles.left = '-'+(this.getImagePropHeight()-this.getWrapperWidth())/2+'px';
                }
            },
            getImageHeight() {
                return this.image.element.offsetHeight;
            },
            getImageWidth() {
                return this.image.element.offsetWidth;
            },
            getWrapperHeight() {
                return this.config.height;
            },
            getWrapperWidth() {
                return this.config.width;
            },
            getImagePropHeight() {
                let diffHeightInPercentage = (100*this.getImageWidth())/this.getImageHeight();
                return this.getWrapperHeight()*diffHeightInPercentage/100;
            },
            getImagePropWidth() {
                let diffWidthInPercentage = (100*this.getImageHeight())/this.getImageWidth();
                return this.getWrapperWidth()*diffWidthInPercentage/100;
            }
        }
    }
</script>

<template>
    <div class="cascade-gallery-image">
        <div class="cascade-gallery-image-wrapper">
            <img :src="images[default_index]?images[default_index]:images[0]"
                 :style="image.styles"
                 @load="showImage($event)"/>
        </div>
    </div>
</template>

<style scoped>
    .cascade-gallery-image {
        width: 100%;
        height: 100%;
    }
    .cascade-gallery-image * {
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }
    .cascade-gallery-image .cascade-gallery-image-wrapper {
        overflow: hidden;
        position: relative;
        width: 100%;
        height: 100%;
    }
    .cascade-gallery-image .cascade-gallery-image-wrapper img {
        position: absolute;
        height: 100%;
    }
</style>