<script>
    import CascadeGalleryImage from '../Image.vue';
    export default {
        name: "cascade-gallery-small-template",
        components: {
            'cascade-gallery-image': CascadeGalleryImage
        },
        props: {
            images: { type: Array }
        },
        data() {
            return {
                ready: false,
                lineIndex: 0,
                previousLineStartIndex: 0,
                lastLineStartIndex: 0,
                currentImageIndex: 0,
                isEndOfTheLine: false,
                config: {
                    maxWidth: 400,
                    minWidth: 200,
                    images: [],
                },
                window: {
                    width: 0,
                    height: 0
                }
            };
        },
        mounted() {
            this.window.width = this.$el.parentNode.offsetWidth;
            this.window.height = this.$el.parentNode.offsetHeight;
            this.prepareImagesConfig();
        },
        methods: {
            prepareImagesConfig() {
                for(let index in this.images) {
                    this.setNextLineConfig(index);
                }
                this.ready = true;
            },
            setNextLineConfig(index) {
                this.currentImageIndex = index;
                this.config.images[index] = {
                    width: this.getWidth()
                };
                this.currentImageIndex = index;
                if(this.isEndOfTheLine) {
                    let startIndex = this.lastLineStartIndex;
                    for(let index = startIndex; index < this.config.images.length; index++) {
                        this.currentImageIndex = index;
                        this.config.images[index].height = this.getHeight();
                        this.config.images[index].left = this.getPositionX();
                        this.config.images[index].top = this.getPositionY();
                    }
                    this.previousLineStartIndex = this.lastLineStartIndex;
                    this.lastLineStartIndex = this.currentImageIndex + 1;
                    this.prepareNextLine();
                    this.isEndOfTheLine = false;
                }
                console.log(this.config.images);
            },
            getPositionX() {
                let posX = 0;
                if (this.currentImageIndex - this.lastLineStartIndex != 0) {
                    let previousImage = this.config.images[this.currentImageIndex - 1];
                    posX = previousImage.width + previousImage.left;
                }
                return posX;
            },
            getPositionY() {
                let posY = 0;
                if (!this.isFirstLine()) {
                    let previousLineSibling = this.config.images[this.getPreviousLineSibling()];
                    posY = previousLineSibling.height + previousLineSibling.top;
                }
                return posY;
            },
            getHeight() {
                return this.getRandomHeight();
            },
            getWidth() {
                let width = this.getRandomWidth();
                this.isEndOfTheLine = false;
                if (!this.isFirstLine()) {
                    let previousLineSibling = this.config.images[this.getPreviousLineSibling()];
                    width = previousLineSibling.width;
                    let length = this.lastLineStartIndex - this.previousLineStartIndex;
                    this.isEndOfTheLine = this.currentImageIndex == (length - 1) + this.lastLineStartIndex
                        || this.currentImageIndex == this.images.length - 1;
                    return width;
                } else if(this.notEnoughSpaceInLine(width)) {
                    this.isEndOfTheLine = true;
                    return this.adjustSiblingsWidth(width);
                }
                return width;
            },
            getCurrentImageWidth() {
                let previousLineSibling = this.getPreviousLineSibling();
                return this.config.images[previousLineSibling].width;
            },
            getPreviousLineSibling() {
                return this.previousLineStartIndex + ( this.currentImageIndex - this.lastLineStartIndex );
            },
            prepareNextLine() {
                this.lineIndex++;
            },
            getRandomWidth() {
                return this.getRandomNumber(this.config.minWidth, this.config.maxWidth);
            },
            getRandomHeight() {
                let approximateLineLength = Math.round((this.window.width/this.config.minWidth) * 10) / 10;
                let quarter = Math.round((this.window.width/approximateLineLength) * 10) / 10;
                return quarter + this.getBacklash(quarter)*2;
            },
            getLineWidth() {
                let lineWidth = 0;
                for(let index = this.lastLineStartIndex; index < this.currentImageIndex; index++) {
                    lineWidth += parseInt(this.config.images[index].width);
                }
                return lineWidth;
            },
            notEnoughSpaceInLine(width) {
                return this.getLineWidth() + width + this.getBacklash(this.config.minWidth) > this.window.width;
            },
            getBacklash(size) {
                return this.getRandomNumber(0, Math.round((size/5)));
            },
            adjustSiblingsWidth(width) {
                let limit = parseInt(this.config.maxWidth);
                let iterator = 0;
                while (!this.isAligned(width) && iterator < limit) {
                    for(let index = this.lastLineStartIndex; index < this.currentImageIndex; index++) {
                        let mustDecay = this.config.images[index].width > this.config.minWidth;
                        if(mustDecay) {
                            this.config.images[index].width = parseInt(this.config.images[index].width) - 1;
                        }
                        let limitReached = iterator === limit - 1;
                        if (limitReached) {
                            let diff = this.getLineLengthDiff(width);
                            // this.config.images[index].width -= diff;
                            return this.config.images[index].width - diff;
                        }
                        if (this.isAligned(width)) {
                            return width;
                        }
                    }
                    iterator++;
                }
            },
            isAligned(width) {
                return width + this.getLineWidth() === parseInt(this.window.width);
            },
            getLineLengthDiff(width) {
                return (this.getLineWidth() + width) - this.window.width;
            },
            getRandomNumber(min, max) {
                min = Math.ceil(min);
                max = Math.floor(max);
                return Math.floor(Math.random() * (max - min + 1)) + min;
            },
            isFirstLine() {
                return !parseInt(this.lineIndex);
            },
            styles(index) {
                return {
                    width: this.config.images[index].width + 'px',
                    height: this.config.images[index].height + 'px',
                    left: this.config.images[index].left + 'px',
                    top: this.config.images[index].top + 'px'
                }
            },
        }
    }
</script>

<template>
    <div class="cascade-gallery-columns-block">
        <div class="cascade-gallery-image-block"
             :style="styles(index)"
             v-if="ready"
             v-for="(image, index) in images" >
            <div class="cascade-gallery-image">
                <cascade-gallery-image :images="image['src']"
                                       :config="config.images[index]"
                                       :default_index="image['default_index']">
                </cascade-gallery-image>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .cascade-gallery-columns-block{
        width: 1200px;
        position: relative;
    }
    .cascade-gallery-image-block {
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        position: absolute;
        overflow: hidden;
        border: 5px solid white;
    }
    .cascade-gallery-image-block .cascade-gallery-image {
        width: 100%;
        margin: 0;
        padding: 0;
        overflow: hidden;
    }
    .cascade-gallery-image-block .cascade-gallery-image img {
        width: 100%;
    }
</style>