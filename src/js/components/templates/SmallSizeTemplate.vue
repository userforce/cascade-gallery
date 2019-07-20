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
                galleryHeight: 0,
                lineIndex: 0,
                columnsAmount: 0,
                previousLineStartIndex: 0,
                lastLineStartIndex: 0,
                currentImageIndex: 0,
                isEndOfTheLine: false,
                hasNewImages: false,
                newImagesStartIndex: 0,
                firstLineIsNotComplete: true,
                config: {
                    maxWidth: 300,
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
        watch: {
            images() {
                this.addNewImages();
                this.setGalleryHeight()
            }
        },
        methods: {
            prepareImagesConfig() {
                for(let index in this.images) {
                    this.setNextImageConfig(index);
                }
                let firstLineIsNotComplete = this.getLineWidth() < this.window.width && this.lineIndex < 1;
                if(firstLineIsNotComplete) {
                    let index = this.currentImageIndex;
                    let limit = 5;
                    let start = 0;
                    while (this.firstLineIsNotComplete) {
                        index++;
                        this.setNextImageConfig(index);
                        start++;
                        if (start > limit) {
                            break;
                        }
                    }
                    this.columnsAmount = this.config.images.length;
                }
                this.setGalleryHeight();
            },
            setNextImageConfig(index) {
                this.currentImageIndex = index;
                this.config.images[index] = {
                    width: this.getWidth(),
                    loaded: false
                };
                this.currentImageIndex = index;

                this.prepareCurrentLine();
            },
            prepareCurrentLine() {
                let startIndex = this.lastLineStartIndex;
                if(this.isEndOfTheLine) {
                    for(let index = startIndex; index < this.config.images.length; index++) {
                        if (this.hasNewImages) {
                            index = this.newImagesStartIndex;
                            this.hasNewImages = false;
                        }
                        this.currentImageIndex = index;
                        this.config.images[index].height = this.getHeight();
                        this.config.images[index].left = this.getPositionX();
                        this.config.images[index].top = this.getPositionY();
                    }
                    this.previousLineStartIndex = this.lastLineStartIndex;
                    this.lastLineStartIndex = this.currentImageIndex + 1;
                    this.lineIndex++;
                    this.isEndOfTheLine = false;
                }
            },
            addNewImages() {
                this.hasNewImages = true;
                this.newImagesStartIndex = this.currentImageIndex+1;
                this.prepareForNewImages();
                for ( let index = this.newImagesStartIndex; index < this.images.length; index++ ) {
                    this.setNextImageConfig(index);
                }
                this.setGalleryHeight();
            },
            prepareForNewImages() {
                if (this.newImagesStartIndex%this.columnsAmount > 0) {
                    this.lastLineStartIndex = this.previousLineStartIndex;
                    this.previousLineStartIndex = this.lastLineStartIndex - this.columnsAmount;
                    this.lineIndex--;
                    this.isEndOfTheLine = false;
                }
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
                    if (!this.columnsAmount) {
                        this.columnsAmount = this.lastLineStartIndex - this.previousLineStartIndex;
                    }
                    let previousLineSibling = this.config.images[this.getPreviousLineSibling()];
                    width = previousLineSibling.width;
                    let length = this.lastLineStartIndex - this.previousLineStartIndex;
                    this.isEndOfTheLine = this.currentImageIndex == (length - 1) + this.lastLineStartIndex
                        || this.currentImageIndex == this.images.length - 1;
                    return width;
                } else if(this.notEnoughSpaceInLine(width)) {
                    this.isEndOfTheLine = true;
                    this.firstLineIsNotComplete = false;
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
                            return this.getLastPartWidth();
                        }
                        if (this.isAligned(width)) {
                            return width;
                        }
                    }
                    iterator++;
                }
            },
            getLastPartWidth() {
                return this.window.width - this.getLineWidth()
            },
            isAligned(width) {
                return width + this.getLineWidth() === this.window.width;
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
            setGalleryHeight() {
                let columnsHeights = [];
                let currentColumn = 0;
                for (let imageIndex in this.config.images) {
                    let image = this.config.images[imageIndex];
                    if (currentColumn >= this.columnsAmount) {
                        currentColumn = 0;
                    }
                    if (!columnsHeights[currentColumn]) {
                        columnsHeights[currentColumn] = 0;
                    }
                    columnsHeights[currentColumn] += image.height;
                    currentColumn++;
                }
                for (let index in columnsHeights) {
                    if (columnsHeights[index] > this.galleryHeight) {
                        this.galleryHeight = columnsHeights[index];
                    }
                }
            },
        }
    }
</script>

<template>
    <div class="cascade-gallery-columns-block"
         :style="{ height: galleryHeight+'px' }">
        <div class="cascade-gallery-image-block"
             v-if="config.images[index]"
             :style="styles(index)"
             v-for="(image, index) in images" >
            <cascade-gallery-image :images.sync="image['src']"
                                   :config.sync="config"
                                   :index="index"
                                   :defaultIndex="image['default_index']">
            </cascade-gallery-image>
        </div>
    </div>
</template>

<style scoped>
    .cascade-gallery-columns-block{
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        width: 100%;
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
    }
</style>