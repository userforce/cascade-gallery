<script>
    import c from '../../constants';
    import arrow from '../../resources/arrow';

    export default {
        name: c.GALLERY_COMPONENT_NAME,
        props: {
            images: { type: Object },
            config: { type: Object },
            index: { type: Number },
            defaultIndex: { type: Number }
        },
        data() {
            return {
                draggingStartPosX: null,
                showImageLoader: true,
                currentIndex: this.defaultIndex,
                styles: {
                    wrapper: { left: '0', width: '0', height: '0' },
                    image: { width: '0', height: '0' }
                },
                arrow: arrow,
                transitionClass: 'cgl-anim',
                loadAttempts: 0,
                failedImages: []
            };
        },
        mounted() {
            window.addEventListener('resize', this.updateStyles);
            this.updateStyles();
            this.prepareDragging();
        },
        methods: {

            /**
             * Prepare dragging and touch moving
             */
            prepareDragging() {
                let wrapper = this.$refs.wrapper;
                this.addEventListeners(wrapper, ["mousedown", "touchstart"], this.startDragging);
            },

            /**
             * On start dragging image prepare default position and
             * on end dragging events listeners
             */
            startDragging(event) {
                this.addEventListeners(event.target, ["mouseup", "touchend", "mouseout"], this.stopDragging);
                let wrapper = this.$refs.wrapper;
                this.transitionClass = '';
                let mouseLeft = null;
                if (event.type === "touchstart") {
                    mouseLeft = event.touches[0].pageX;
                } else {
                    mouseLeft = event.pageX;
                }
                this.draggingStartPosX = mouseLeft - wrapper.offsetLeft;
                this.addEventListeners(event.target, ["mousemove", "touchmove"], this.dragElement);
            },

            /**
             * Set the position on dragging image and prevent history
             * auto navigation on dragging to the right
             */
            dragElement(event) {
                event.preventDefault();
                let wrapperLeft = event.pageX - this.draggingStartPosX;
                if (event.type === "touchmove") {
                    wrapperLeft = event.touches[0].pageX - this.draggingStartPosX;
                }
                this.setWrapperPositionLeft(wrapperLeft);
            },

            /**
             * Set wrapper css left position
             */
            setWrapperPositionLeft(position) {
                this.styles.wrapper.left = position.toString()+'px';
            },

            /**
             * Handle all events after dragging action finished [mouseup, touchend, mouseout]
             */
            stopDragging(event) {
                this.removeListeners(event);
                let wrapper = this.$refs.wrapper;
                this.transitionClass = 'cgl-anim';
                if (this.isShiftedLeft(wrapper)) {
                    this.showNext();
                } else if (this.isShiftedRight()) {
                    this.showPrev();
                }
                else {
                    this.styles.wrapper.left = this.getPosX(this.currentIndex) + 'px';
                }
            },

            /**
             * Remove all runtime dragging listeners listeners
             */
            removeListeners(event) {
                event.target.removeEventListener("mousemove", this.dragElement);
                event.target.removeEventListener("touchmove", this.dragElement);
                event.target.removeEventListener("mouseup", this.stopDragging);
                event.target.removeEventListener("touchend", this.stopDragging);
                event.target.removeEventListener("mouseout", this.stopDragging);
            },

            /**
             * Check if image was dragged out of the given pixels to the left
             */
            isShiftedLeft() {
                return this.getPosX(this.currentIndex) - 58 > this.$refs.wrapper.offsetLeft;
            },

            /**
             * Check if image was dragged out of the given pixels to the right
             */
            isShiftedRight() {
                return this.getPosX(this.currentIndex) + 58 < this.$refs.wrapper.offsetLeft;
            },

            /**
             * Adds multiple event listeners at once
             */
            addEventListeners(target, events = [], listener) {
                for (let index in events) {
                    let event = events[index];
                    target.addEventListener(events[index], listener, false);
                }
            },

            updateStyles() {
                this.styles.wrapper.left = this.getPosX(this.currentIndex) + 'px';
                this.styles.wrapper.width = window.innerWidth * this.images.src.length + 'px';
                this.styles.wrapper.height = window.innerHeight + 'px';
                this.styles.image.width = window.innerWidth + 'px';
                this.styles.image.height = window.innerHeight + 'px';
            },

            /**
             * Get position "left" of the wrapper relative to the image position
             * @return Number
             */
            getPosX(index = 0) {
                return -(((index+ 1) * window.innerWidth) - window.innerWidth);
            },

            /**
             * 'closeModal' event is listened in the mounted method of the
             * image component and it is closing the modal
             */
            closeModal() {
                this.$parent.$emit('closeModal');
            },

            showNext() {
                if (this.hasNext()) {
                    ++ this.currentIndex;
                    this.showImageLoader = true;
                }
                this.styles.wrapper.left = this.getPosX(this.currentIndex) + 'px';
            },

            showPrev() {
                if (this.hasPrev()) {
                    -- this.currentIndex;
                    this.showImageLoader = true;
                }
                this.styles.wrapper.left = this.getPosX(this.currentIndex) + 'px';
            },

            imageLoaded(event) {
                if (event.type === 'error') {
                    if(this.loadAttempts > 4) {
                        this.loadAttempts = 0;
                        this.addToFailedImages(this.currentIndex);
                    }
                    if (this.isFailedImage(this.currentIndex)) {
                        this.hideLoader();
                        return;
                    }
                    this.loadAttempts++;
                    setTimeout(function() {
                        // Add random hash to the image to force image reloading
                        let src = event.target.src;
                        event.target.src = src.replace(/\?rh=.+/i, '?rh=' + Math.random());
                    }, 5000);
                } else {
                    this.failedImages = [];
                    this.loadAttempts = 0;
                    this.hideLoader();
                }
            },

            addToFailedImages(imageIndex) {
                this.failedImages.push(imageIndex);
            },

            isFailedImage(imageIndex) {
                return this.failedImages.indexOf(imageIndex) > -1;
            },

            hideLoader() {
                this.showImageLoader = false;
            },

            hasNext() {
                return this.images.src.length - 1 > this.currentIndex;
            },

            hasPrev() {
                return 0 < this.currentIndex;
            }
        },
        destroyed() {
            window.removeEventListener('resize', this.updateStyles);
        }
    }
</script>

<template>
    <div class="cgl-modal">
        <div class="cgl-modal-image-wrapper"
             :class="transitionClass"
             :style="styles.wrapper"
             ref="wrapper">
            <div class="cgl-modal-image"
                 :style="styles.image"
                 v-for="(url, index) in images.src">
                <img :src="url"
                     v-if="currentIndex == index"
                     v-show="!showImageLoader"
                     @load="imageLoaded"
                     @error="imageLoaded"
                     draggable="false"/>
                <span class="color-red" v-if="isFailedImage(currentIndex) && currentIndex == index"> Image error!</span>
                <div class="cgl-image-loader"
                     v-if="currentIndex == index && showImageLoader">
                    <div class="cgl-image-loader-animation"><div></div><div></div></div>
                    <span>Loading...</span>
                </div>
            </div>
            <div class="cgl-arrow-wrapper cgl-arrow-left"
                 @click="showPrev"
                 v-show="0 < currentIndex">
                <svg class="cgl-arrow"
                     :width="arrow.svg.width+'px'"
                     :height="arrow.svg.height+'px'"
                     :viewBox="arrow.svg.viewBox">
                    <path :d="arrow.svg.path"/>
                </svg>
            </div>
            <div class="cgl-arrow-wrapper cgl-arrow-right"
                 @click="showNext"
                 v-show="this.images.src.length - 1 > this.currentIndex">
                <svg class="cgl-arrow"
                     :width="arrow.svg.width+'px'"
                     :height="arrow.svg.height+'px'"
                     :viewBox="arrow.svg.viewBox">
                    <path :d="arrow.svg.path"/>
                </svg>
            </div>
            <div class="cgl-modal-close" @click="closeModal()"></div>
        </div>
    </div>
</template>

<style>
    .cgl-modal{
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,.87);
        z-index: 5000;
        overflow: hidden;
    }
    .cgl-modal-image-wrapper {
        position: absolute;
        top: 0;
        white-space: nowrap;
    }
    .cgl-anim {
        -webkit-transition: left .34s ease-out;
        -moz-transition: left .34s ease-out;
        -o-transition: left .34s ease-out;
        transition: left .34s ease-out;
    }
    .cgl-modal-image {
        position: relative;
        display: table-cell;
        vertical-align: middle;
        text-align: center;
        line-height: 0px;
    }
    .cgl-modal-image img {
        touch-action: none;
        max-height: 100%;
        max-width: 70%;
        -webkit-box-shadow: 0px 7px 24px 0px rgba(0,0,0,0.55);
        -moz-box-shadow: 0px 7px 24px 0px rgba(0,0,0,0.55);
        box-shadow: 0px 7px 24px 0px rgba(0,0,0,0.55);
    }

    @media only screen and (max-width: 900px) {
        .cgl-modal-image img {
            max-width: 100%;
        }
    }

    .cgl-arrow {
        position: absolute;
        top: 50%;
        fill: #ffffff;
        opacity: .1;
        -webkit-transition: all .34s ease-out;
        -moz-transition: all .34s ease-out;
        -o-transition: all .34s ease-out;
        transition: all .34s ease-out;
    }

    .cgl-arrow-wrapper {
        position: fixed;
        width: 150px;
        height: 100%;
        top: 0;
        z-index: 5;
        background: rgba(0,0,0,0);
        -webkit-transition: background .34s ease-out;
        -moz-transition: background .34s ease-out;
        -o-transition: background .34s ease-out;
        transition: background .34s ease-out;
    }

    .cgl-arrow-wrapper:hover {
        background: rgba(0,0,0,.4);
        cursor: pointer;
    }

    .cgl-arrow-wrapper:hover .cgl-arrow {
        opacity: .5;
    }

    .cgl-arrow-wrapper.cgl-arrow-left {
        left: 0;
    }

    .cgl-arrow-wrapper.cgl-arrow-left .cgl-arrow {
        transform: rotate(90deg);
        left: 40px;
    }

    .cgl-arrow-wrapper.cgl-arrow-right {
        right: 0;
    }

    .cgl-arrow-wrapper.cgl-arrow-right .cgl-arrow {
        transform: rotate(-90deg);
        right: 40px;
    }

    .cgl-modal-close {
        width: 35px;
        height: 35px;
        position: fixed;
        z-index: 15;
        top: 15px;
        right: 15px;
        opacity: .3;
    }

    .cgl-modal-close:after {
        content: "\d7";
        font-size: 55px;
        color: white;
        line-height: 35px;
        font-weight: bold;
    }

    .cgl-modal-close:hover {
        opacity: .7;
        cursor: pointer;
    }
    .lds-ripple {
        display: inline-block;
        position: relative;
        width: 64px;
        height: 64px;
    }

    .cgl-image-loader{
        width: 58px;
        height: 58px;
        display: inline-block;
        position: relative;
    }

    .cgl-image-loader > span {
        display: block;
        width: 100%;
        height: 20px;
        position: absolute;
        left: 0;
        bottom: -30px;
        color: #ffffff;
    }

    .cgl-image-loader-animation div {
        position: absolute;
        border: 4px solid #ffffff;
        opacity: .7;
        border-radius: 50%;
        animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
    }

    .cgl-image-loader-animation div:nth-child(2) {
        animation-delay: -0.5s;
    }

    @keyframes lds-ripple {
        0% {
            top: 28px;
            left: 28px;
            width: 0;
            height: 0;
            opacity: 1;
        }
        100% {
            top: -1px;
            left: -1px;
            width: 58px;
            height: 58px;
            opacity: 0;
        }
    }

    .cgl-modal .color-red {
        color: red;
    }
</style>