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
                this.resizeImageSize();

                this.config.loaded = true;
            },
            resizeImageSize() {
                let wrapperWidth = this.config.width;
                let wrapperHeight = this.config.height;
                let imageWidth = this.image.element.offsetWidth;
                let imageHeight = this.image.element.offsetHeight;

                let diffHeightInPercentage = (100*imageWidth)/imageHeight;
                let imagePropHeight = wrapperHeight*diffHeightInPercentage/100;
                let diffWidthInPercentage = (100*imageHeight)/imageWidth;
                let imagePropWidth = wrapperWidth*diffWidthInPercentage/100;

                console.log(this.images[this.default_index]?this.images[this.default_index]:this.images[0]);
                // console.log('100*'+imageWidth+'/'+imageHeight);
                // console.log(wrapperHeight+'*'+imagePropHeight+'/100');
                // console.log(imagePropHeight);
                // console.log(imagePropWidth);
                // console.log(imagePropHeight < wrapperWidth);

                if(imagePropHeight < wrapperWidth) {
                    this.image.styles.width = '100%';
                    this.image.styles.top = '-'+(imagePropWidth-wrapperHeight)/2+'px';
                    console.log(this.image.styles.top);
                } else {
                    this.image.styles.height = '100%';
                    this.image.styles.left = '-'+(imagePropHeight-wrapperWidth)/2+'px';
                }

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