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
                lastLineStartIndex: 0,
                currentImageIndex: 0,
                config: {
                    maxWidth: 300,
                    minWidth: 200,
                    images: {}
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
                    this.currentImageIndex = index;
                    this.config.images[index] = {
                        width: this.getWidth()
                    };
                }
                this.ready = true;
            },
            getWidth() {
                let width = this.getRandomNumber(this.config.minWidth, this.config.maxWidth);
                if(this.notEnoughSpaceInLine(width)) {
                    this.adjustSiblingsWidth(width);
                    this.lastLineStartIndex = parseInt(this.currentImageIndex) + 1;
                }
                return width;
            },
            getLineWidth() {
                let lineWidth = 0;
                for(let index = this.lastLineStartIndex; index < this.currentImageIndex; index++) {
                    lineWidth += parseInt(this.config.images[index].width);
                }
                return lineWidth;
            },
            notEnoughSpaceInLine(width) {
                return this.getLineWidth() + width > this.window.width;
            },
            getLastImageBacklash() {
                return this.getRandomNumber(0, Math.round((this.config.minWidth/5)));
            },
            adjustSiblingsWidth(width) {
                let limit = 100;
                let iterator = 0;
                while (!this.aligned(width) && iterator < limit) {
                    for(let index = this.lastLineStartIndex; index < this.currentImageIndex; index++) {
                        let mustDecay = this.config.images[index].width > this.config.minWidth;
                        let itemsCount = parseInt(this.currentImageIndex) - parseInt(this.lastLineStartIndex) - 1;
                        let diff = this.getLineLengthDiff(width) / itemsCount;
                        let maxDiff = Math.round(diff * 10) / 10;
                        if(mustDecay) {
                            this.config.images[index].width = parseInt(this.config.images[index].width) - 1;
                        }
                        if (this.aligned(width)) {
                            break;
                        }
                    }
                    iterator++;
                }
            },
            aligned(width) {
                return width + this.getLineWidth() === parseInt(this.window.width);
            },
            getLineLengthDiff(width) {
                return (this.getLineWidth() + width) - this.window.width;
            },
            getRandomNumber(min, max) {
                min = Math.ceil(min);
                max = Math.floor(max);
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }
        }
    }
</script>

<template>
    <div>
        <div v-if="ready" v-for="(image, index) in images">
            <cascade-gallery-image :images="image['src']"
                                   :default_index="image['default_index']"
                                   :config="config.images[index]">
            </cascade-gallery-image>
        </div>
    </div>
</template>