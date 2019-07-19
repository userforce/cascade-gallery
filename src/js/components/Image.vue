<script>
    export default {
        name: "cascade-gallery-image",
        props: {
            images: { type: Array },
            defaultIndex: { type: Number },
            config: { type: Object },
            index: { type: Number }
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
                    },
                    classes: ['cascade-gallery-image-anim-hide']
                }
            };
        },
        methods: {
            loadConfig(event) {
                this.image.element = event.target;
                this.setImageStyles();
                this.waitPreviousImage();
            },
            waitPreviousImage() {
                let self = this;
                let waitForPrevious = setInterval(function() {
                    if (self.previousImageLoaded()) {
                        self.showImage();
                        clearInterval(waitForPrevious);
                    }
                }, 10);
            },
            showImage() {
                let self = this;
                self.animate();
                let waitForPrevious = setTimeout(function() {
                    self.setLoaded();
                }, 170);
            },
            setLoaded() {
                this.config.images[this.index].loaded = true;
            },
            setImageStyles() {
                if(this.getImagePropHeight() < this.getWrapperWidth()) {
                    this.image.styles.width = '100%';
                    this.image.styles.top = '-'+(this.getImagePropWidth()-this.getWrapperHeight())/2+'px';
                    return true;
                } else {
                    this.image.styles.height = '100%';
                    this.image.styles.left = '-'+(this.getImagePropHeight()-this.getWrapperWidth())/2+'px';
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
                let diffHeightInPercentage = (100*this.getImageWidth())/this.getImageHeight();
                return this.getWrapperHeight()*diffHeightInPercentage/100;
            },
            getImagePropWidth() {
                let diffWidthInPercentage = (100*this.getImageHeight())/this.getImageWidth();
                return this.getWrapperWidth()*diffWidthInPercentage/100;
            },
            previousImageLoaded() {
                if (this.index == 0) {
                    return true;
                }
                return this.config.images[this.index - 1].loaded;
            },
            animate() {
                this.image.classes.push('cascade-gallery-image-anim-fall');
            }
        }
    }
</script>

<template>
    <div class="cascade-gallery-image">
        <div class="cascade-gallery-image-wrapper">
            <img :src="images[defaultIndex]?images[defaultIndex]:images[0]"
                 :class="this.image.classes"
                 :style="image.styles"
                 @load="loadConfig($event)"/>
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
        border: 5px solid transparent;
    }
    .cascade-gallery-image .cascade-gallery-image-wrapper img {
        position: absolute;
        height: 100%;
    }
    .cascade-gallery-image .cascade-gallery-image-wrapper img.cascade-gallery-image-anim-hide {
        opacity: 0;
    }
    .cascade-gallery-image .cascade-gallery-image-wrapper img.cascade-gallery-image-anim-fall {
        -webkit-transition: all .35s ease-in;
        -moz-transition: all .35s ease-in;
        -o-transition: all .35s ease-in;
        transition: all .35s ease-in;
        opacity: 1;
    }
</style>