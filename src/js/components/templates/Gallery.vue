<script>
    import CascadeGalleryImage from './Image.vue';
    import c from '../../constants';
    import validator from '../../validator';

    export default {
        name: c.GALLERY_COMPONENT_NAME,
        components: (function(){
            let components = {};
            components[c.IMAGE_COMPONENT_NAME] = CascadeGalleryImage;
            return components;
        })(),
        props: {
            images: { type: Array },
            options: { type: Object },
            width: { type: Number }
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
                    maxWidth: c.CONFIG_WIDTH_TO,
                    minWidth: c.CONFIG_WIDTH_FROM,
                    images: [],
                },
                window: {
                    width: this.width,
                    height: 0
                }
            };
        },
        mounted() {
            this.window.height = this.$el.parentNode.offsetHeight;
            this.prepareConfigOptions();
            this.prepareConfigImages();
        },
        watch: {
            /**
             * Adds new incoming images
             */
            images() {
                this.addNewImages();
                this.setGalleryHeight();
            }
        },
        methods: {

            /**
             * Prepare configuration options
             * Not all configuration options is handled in this
             * method, just those that must be prepared in advance
             */
            prepareConfigOptions() {
                if (validator.hasRangesFor(this.options, c.CONFIG_WIDTH_RANGE_KEY, false)) {
                    this.config.maxWidth = this.options[c.CONFIG_WIDTH_RANGE_KEY][c.CONFIG_RANGE_KEY_TO];
                    this.config.minWidth = this.options[c.CONFIG_WIDTH_RANGE_KEY][c.CONFIG_RANGE_KEY_FROM];
                }
                if (validator.hasRangesFor(this.options, c.CONFIG_HEIGHT_RANGE_KEY, false)) {
                    this.config.maxHeight = this.options[c.CONFIG_HEIGHT_RANGE_KEY][c.CONFIG_RANGE_KEY_TO];
                    this.config.minHeight = this.options[c.CONFIG_HEIGHT_RANGE_KEY][c.CONFIG_RANGE_KEY_FROM];
                }
                if (validator.hasDelay(this.options)) {
                    this.config[c.CONFIG_DELAY_KEY] = this.options[c.CONFIG_DELAY_KEY];
                }
                if (validator.hasGap(this.options)) {
                    this.config[c.CONFIG_GAP_KEY] = this.options[c.CONFIG_GAP_KEY];
                }
            },

            /**
             * After configuration options are ready apply them to
             * the images block (parent)
             * That is invoked just on mounting
             * NOTE: By defining image configuration we meant image block so
             *       image it self can detect future sizes or displaying modes
             */
            prepareConfigImages() {
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
                }
                this.setGalleryHeight();
            },

            /**
             * Sets configuration for the current image in the list
             * @param index Given image index
             */
            setNextImageConfig(index) {
                this.currentImageIndex = index;
                /**
                 * Before a setting the height we have to define widths
                 * of the future columns (images in the first line)
                 */
                this.config.images[index] = {
                    width: this.getWidth(),
                    loaded: false
                };
                this.currentImageIndex = index;
                this.prepareGapStyles();
                this.prepareCurrentLine();
            },

            /**
             * Prepare gap configuration
             */
            prepareGapStyles() {
                let gap = this.config[c.CONFIG_GAP_KEY];
                if (gap > 0) {
                    this.config.images[this.currentImageIndex][c.CONFIG_GAP_KEY] = {};
                    this.config.images[this.currentImageIndex][c.CONFIG_GAP_KEY]['border-top-width'] = gap+'px';
                    this.config.images[this.currentImageIndex][c.CONFIG_GAP_KEY]['border-right-width'] = gap+'px';
                    if (this.lastLineStartIndex === 0) {
                        this.config.images[this.currentImageIndex][c.CONFIG_GAP_KEY]['border-top-width'] = '0px';
                    }
                    if (this.isLastInTheLine(this.currentImageIndex)) {
                        this.config.images[this.currentImageIndex][c.CONFIG_GAP_KEY]['border-right-width'] = '0px';
                    }
                }
            },

            /**
             * Check if the given image index is the last in the line
             */
            isLastInTheLine(index) {
                return this.config.images[index].width + this.getLineWidth() === this.window.width;
            },

            /**
             * After wee have all of the widths for given images we check
             * the line order number that we left, and continue to set
             * other image block properties
             */
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

            /**
             * After new images was added to the images list we prepare the
             * new state of gallery config and continue to build it
             */
            addNewImages() {
                this.hasNewImages = true;
                this.newImagesStartIndex = this.currentImageIndex+1;
                this.prepareForNewImages();
                for ( let index = this.newImagesStartIndex; index < this.images.length; index++ ) {
                    this.setNextImageConfig(index);
                }
                this.setGalleryHeight();
            },

            /**
             * Resets the state of the previous gallery configuration
             * @see this.addNewImages()
             */
            prepareForNewImages() {
                if (this.newImagesStartIndex%this.columnsAmount > 0) {
                    this.lastLineStartIndex = this.previousLineStartIndex;
                    this.previousLineStartIndex = this.lastLineStartIndex - this.columnsAmount;
                    this.lineIndex--;
                    this.isEndOfTheLine = false;
                }
            },

            /**
             * Detects left X axe position for the current image
             * @returns Number
             */
            getPositionX() {
                let posX = 0;
                if (this.currentImageIndex - this.lastLineStartIndex !== 0) {
                    let previousImage = this.config.images[this.currentImageIndex - 1];
                    posX = previousImage.width + previousImage.left;
                }
                return posX;
            },

            /**
             * Detects top Y axe position for the current image
             * @returns Number
             */
            getPositionY() {
                let posY = 0;
                if (!this.isFirstLine()) {
                    let previousLineSibling = this.config.images[this.getPreviousLineSibling()];
                    posY = previousLineSibling.height + previousLineSibling.top;
                }
                return posY;
            },

            /**
             * Generate random/given height for the current image
             * @returns Number
             */
            getHeight() {
                return this.getRandomHeight();
            },

            /**
             * Generates random width/given also if the generated width do
             * not fit in the last remained portion of the parent block
             * width all the images blocks will be adjusted
             * @returns Number
             */
            getWidth() {
                let width = this.getRandomWidth();
                this.isEndOfTheLine = false;
                if (!this.isFirstLine()) {
                    this.columnsAmount = this.lastLineStartIndex - this.previousLineStartIndex;
                    let previousLineSibling = this.config.images[this.getPreviousLineSibling()];
                    width = previousLineSibling.width;
                    let length = this.lastLineStartIndex - this.previousLineStartIndex;
                    this.isEndOfTheLine = this.currentImageIndex == (length - 1) + this.lastLineStartIndex
                        || this.currentImageIndex == this.images.length - 1;
                    return width;
                } else if(this.notEnoughSpaceInLine(width)) {
                    this.isEndOfTheLine = true;
                    this.firstLineIsNotComplete = false;
                    if (width > this.window.width && this.getLineWidth() === 0) {
                        return this.window.width;
                    }
                    return this.adjustSiblingsWidth(width);
                }
                return width;
            },

            /**
             * Get the width for the current image block from the image block
             * on the same order number of the previous line to keep the columns
             * width equal in the each line
             * TODO: display one image block in the tow lines
             * @see this.getPreviousLineSibling()
             * @returns Number
             */
            getCurrentImageWidth() {
                let previousLineSibling = this.getPreviousLineSibling();
                return this.config.images[previousLineSibling].width;
            },

            /**
             * Find index of the previous line block image that has the
             * same order number
             * @see this.getCurrentImageWidth()
             * @returns Number
             */
            getPreviousLineSibling() {
                return this.previousLineStartIndex + ( this.currentImageIndex - this.lastLineStartIndex );
            },

            /**
             * Generate random width in the given range
             * @returns Number
             */
            getRandomWidth() {
                return this.getRandomNumber(this.config.minWidth, this.config.maxWidth);
            },

            /**
             * Generate random height in the given range. By default and average
             * height will be picked base on images width range
             * @returns Number
             */
            getRandomHeight() {
                if (!this.config.minHeight || !this.config.maxHeight) {
                    let amountOfImages = Math.round((this.window.width/this.config.minWidth) * 10) / 10;
                    let approximateImageWidth = Math.round((this.window.width/amountOfImages) * 10) / 10;
                    return approximateImageWidth + this.getBacklash(approximateImageWidth);
                }
                return this.getRandomNumber(this.config.minHeight, this.config.maxHeight);
            },

            /**
             * Counts the current line width based on the current images
             * blocks in the line widths sum
             * @returns Number
             */
            getLineWidth() {
                let lineWidth = 0;
                for(let index = this.lastLineStartIndex; index < this.currentImageIndex; index++) {
                    lineWidth += parseInt(this.config.images[index].width);
                }
                return lineWidth;
            },

            /**
             * Checks if the sum of the width images blocks is to big to leave
             * space for one another image
             * @see this.getWidth()
             * @returns Boolean
             */
            notEnoughSpaceInLine(width) {
                return this.getLineWidth() + width + this.getBacklash(this.config.minWidth) > this.window.width;
            },

            /**
             * Is used to add little bet more space to the last image in order
             * to increase visual consistency on random width generating
             * @see this.notEnoughSpaceInLine()
             * @returns Number
             */
            getBacklash(width) {
                return this.getRandomNumber(0, Math.round((width/5)));
            },

            /**
             * NOTICE: if the last image do not fit the remaining area all images will
             * be minimized including last image itself.
             * @returns Number
             */
            adjustSiblingsWidth(width) {
                let limit = parseInt(this.config.maxWidth);
                let iterator = 0;
                let minWidth = this.config.minWidth;
                let expectedWidth = width;
                while (!this.isAligned(expectedWidth) && iterator < limit) {
                    let imagesAreAtMinimum = true;
                    for(let index = this.lastLineStartIndex; index < this.currentImageIndex; index++) {
                        let mustDecay = this.config.images[index].width > minWidth;
                        if(mustDecay) {
                            this.config.images[index].width = parseInt(this.config.images[index].width) - 1;
                        }
                        if (width + this.getLineWidth() < this.window.width) {
                            return this.getLineRestWidth();
                        }
                        if (this.config.images[index].width === minWidth) {
                            imagesAreAtMinimum = imagesAreAtMinimum && true;
                        } else {
                            imagesAreAtMinimum = imagesAreAtMinimum && false;
                        }
                        if (imagesAreAtMinimum) {
                            if (this.getLineRestWidth() > minWidth) {
                                return this.getLineRestWidth();
                            }
                            minWidth =  (minWidth / 5) * 4;
                            expectedWidth = minWidth;
                        }
                        let limitReached = iterator === limit - 1;
                        if (limitReached) {
                            return this.getLineRestWidth();
                        }

                        if (this.isAligned(expectedWidth)) {
                            return expectedWidth;
                        }
                    }
                    iterator++;
                }
            },

            /**
             * Get the remaining width in the line
             * @returns Number
             */
            getLineRestWidth() {
                return this.window.width - this.getLineWidth()
            },

            /**
             * Check if there is enough space for the last image block width
             * @returns Boolean
             */
            isAligned(width) {
                return width + this.getLineWidth() === this.window.width;
            },

            /**
             * Get the difference between window and the current image blocks width
             * @returns Number
             */
            getLineLengthDiff(width) {
                return (this.getLineWidth() + width) - this.window.width;
            },

            /**
             * Generates random number in the given range
             * @returns Number
             */
            getRandomNumber(min, max) {
                min = Math.ceil(min);
                max = Math.floor(max);
                return Math.floor(Math.random() * (max - min + 1)) + min;
            },

            /**
             * Checks if the current line is the first
             * @returns Boolean
             */
            isFirstLine() {
                return !parseInt(this.lineIndex);
            },

            /**
             * After all configuration was prepared apply them to the DOM
             */
            getStyles(index) {
                let styles = {
                    width: this.config.images[index].width + 'px',
                    height: this.config.images[index].height + 'px',
                    left: this.config.images[index].left + 'px',
                    top: this.config.images[index].top + 'px'
                };
                styles = this.getGapStyles(styles, index);
                return styles;
            },

            /**
             * Specific styles for the gap between columns
             * @return Object
             */
            getGapStyles(styles, index) {
                if (validator.hasGap(this.options)) {
                    for (let key in this.config.images[index][c.CONFIG_GAP_KEY]) {
                        styles[key] = this.config.images[index][c.CONFIG_GAP_KEY][key]
                    }
                }

                return styles;
            },

            /**
             * Finds the tallest column and sets the height of the gallery
             * That needs as an workaround to the css position absolute of
             * the gallery wrapper
             * @returns Number
             */
            setGalleryHeight() {
                let columnsHeights = [];
                let currentColumn = 0;
                if (this.columnsAmount < 1) {
                    this.columnsAmount = this.config.images.length;
                }
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
    <div class="cgl-columns-block"
         :style="{ height: galleryHeight+'px' }">
        <div class="cgl-image-block"
             v-if="config.images[index]"
             :style="getStyles(index)"
             v-for="(image, index) in images" >
            <cgl-image :imagesData="image"
                       :config.sync="config"
                       :index="index"
                       v-slot:default="images">
                <slot v-bind:index="images.index"></slot>
            </cgl-image>
        </div>
    </div>
</template>

<style>
    .cgl-columns-block{
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        width: 100%;
        position: relative;
    }
    .cgl-image-block {
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        position: absolute;
        left: 0;
        top: 0;
        border: 0px solid transparent;
    }
</style>