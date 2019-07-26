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
                imageBlock: {},
                currentImageIndex: this.defaultIndex,
                currentImageElement: null,
                animation: {
                    inProgress: false
                },
                navigationClicked: false,
                diff: 0,
                window: {
                    width: window.innerWidth,
                    height: window.innerHeight
                },
                styles: {
                    left: 0
                },
                classes: {
                    transitionClass: 'cascade-gallery-modal-image-transition'
                },
                arrow: arrow
            };
        },
        mounted() {
            this.window.width = window.innerWidth;
            this.window.height = window.innerHeight;
        },
        methods: {
            /**
             * 'closeModal' event is listened in the mounted method of the
             * image component and it is closing the modal
             */
            closeModal() {
                this.$parent.$emit('closeModal');
            },

            /**
             * On image load prepare dragging and touch moving
             * @param event
             */
            prepareDragging(event) {
                this.addEventListeners(event.target, ["mousedown", "touchstart"], this.startDragging);
                this.addEventListeners(event.target, ["mouseup", "touchend", "mouseout"], this.stopDragging);
            },

            /**
             * Handle all events after dragging action finished [mouseup, touchend, mouseout]
             * @param event
             */
            stopDragging(event) {
                this.setClasses(event.target, this.classes.transitionClass);
                event.target.removeEventListener("mousemove", this.dragElement);
                event.target.removeEventListener("touchmove", this.dragElement);

                if (this.navigationClicked) return;

                if (this.isShiftedLeft(event) && !this.isTheLastImage(this.currentImageIndex)) {
                    if (!this.animation.inProgress && event.type === "mouseout") {
                        this.showNextImage();
                    } else {
                        this.animation.inProgress = false;
                    }
                    if ( event.type === "mouseup" || event.type === "touchend" ) {
                        this.animation.inProgress = true;
                        this.showNextImage();
                    }
                } else if (this.isShiftedRight(event) && !this.isTheFirstImage(this.currentImageIndex)) {
                    if (!this.animation.inProgress && event.type === "mouseout") {
                        this.showPreviousImage();
                    } else {
                        this.animation.inProgress = false;
                    }
                    if ( event.type === "mouseup" || event.type === "touchend" ) {
                        this.animation.inProgress = true;
                        this.showPreviousImage();
                    }
                } else {
                    this.alignImage(event);
                    this.animation.inProgress = true;
                }
            },

            /**
             * Check if image was dragged out of the given pixels to the left
             * @param event
             * @returns Boolean
             */
            isShiftedLeft(event) {
                return this.getAlignX(event) - 58 > event.target.offsetLeft;
            },

            /**
             * Check if image was dragged out of the given pixels to the right
             * @param event
             * @returns Boolean
             */
            isShiftedRight(event) {
                return this.getAlignX(event) + 58 < event.target.offsetLeft;
            },

            /**
             * On start dragging image prepare default position and
             * on end dragging events listeners
             * @param event
             */
            startDragging(event) {
                let imageLeft = event.target.offsetLeft;
                let mouseLeft = null;
                if (event.type === "touchstart") {
                    mouseLeft = event.touches[0].pageX;
                } else {
                    mouseLeft = event.pageX;
                }
                this.diff = mouseLeft - imageLeft;
                this.setClasses(event.target, '');
                this.addEventListeners(event.target, ["mousemove", "touchmove"], this.dragElement);
            },


            /**
             * Set the position on dragging image and prevent history
             * auto navigation on dragging to the right
             * @param event
             */
            dragElement(event) {
                event.preventDefault();
                let imageLeft = event.pageX - this.diff;
                if (event.type === "touchmove") {
                    imageLeft = event.touches[0].pageX - this.diff;
                }
                this.setImagePositionX(imageLeft);
            },

            /**
             * Display (animate) next image if the previous animation finished
             */
            showNextImage() {
                if (this.waitAnimation()) return;
                if (!this.isTheLastImage(this.currentImageIndex)) {
                    let self = this;
                    this.setImagePositionX(-this.currentImageElement.offsetWidth);
                    let index = self.currentImageIndex + 1;
                    let lastIndex = self.images.src.length - 1;
                    let nextIndex = index > lastIndex ? lastIndex : index;
                    setTimeout(function () {
                        self.displayImage(nextIndex, self.currentImageElement.parentNode.offsetWidth);
                    }, 340);
                }
            },

            /**
             * Display (animate) previous image if the previous animation finished
             */
            showPreviousImage() {
                if (this.waitAnimation()) return;
                if (!this.isTheFirstImage(this.currentImageIndex)) {
                    let self = this;
                    this.setImagePositionX(this.currentImageElement.parentNode.offsetWidth);
                    let index = self.currentImageIndex - 1;
                    let previousIndex = index < 0 ? 0 : index;
                    setTimeout(function () {
                        self.displayImage(previousIndex, -self.currentImageElement.offsetWidth);
                    }, 340);
                }
            },

            /**
             * Display given image with given position
             */
            displayImage(imageIndex, position) {
                this.currentImageIndex = imageIndex;
                this.setClasses(this.currentImageElement, this.classes.transitionClass);
                this.setImagePositionX(position);
            },

            /**
             * Define waiting animation delay
             * @returns {boolean}
             */
            waitAnimation() {
                let self = this;
                if (this.navigationClicked) return true;
                this.navigationClicked = true;
                setTimeout(function(){self.navigationClicked = false}, 340);
                return false;
            },

            /**
             * Adds multiple event listeners at once
             * @param target
             * @param events
             * @param listener
             */
            addEventListeners(target, events = [], listener) {
                for (let index in events) {
                    let event = events[index];
                    target.addEventListener(events[index], listener, false);
                }
            },

            /**
             * Set css for the left position
             * @param position
             */
            setImagePositionX(position) {
                this.styles.left = position.toString()+'px';
            },

            /**
             * Set the default css for the image position
             * @param event
             */
            alignImage(event) {
                this.styles.left = this.getAlignX(event)+'px';
                this.styles.top = this.getAlignY(event)+'px';
            },

            /**
             * Define default image left position
             * @param event
             * @returns Number
             */
            getAlignX(event) {
                return event.target.parentNode.offsetWidth/2 - event.target.offsetWidth/2;
            },

            /**
             * Define default image top position
             * @param event
             * @returns {number}
             */
            getAlignY(event) {
                return event.target.parentNode.offsetHeight/2 - event.target.offsetHeight/2;
            },

            /**
             * Set element classes to the images
             * @param element
             * @param classes
             */
            setClasses(element, classes = '') {
                element.className = classes;
            },

            prepareImage(event) {
                this.currentImageElement = event.target;
                this.alignImage(event);
                this.prepareDragging(event);
                // Stop history navigation on touch and move
                event.target.parentNode.addEventListener('touchmove', function(e){
                    e.preventDefault();
                });
            },

            /**
             * Check if current image is the last in the list
             * @param index
             * @returns Boolean
             */
            isTheLastImage(index) {
                return index === this.images.src.length - 1;
            },

            /**
             * Check if current image is the first in the list
             * @param index
             * @returns Boolean
             */
            isTheFirstImage(index) {
                return index === 0;
            }
        },
        beforeDestroy() {
            this.addEventListeners(event.target, ["mousemove", "touchmove"], this.dragElement);
        }
    }
</script>

<template>
    <div class="cascade-gallery-modal">
        <div class="cascade-gallery-modal-image-wrapper">
            <div class="cascade-gallery-modal-image"
                 v-for="(url, index) in images.src"
                 v-if="currentImageIndex === index">
                <img :src="url"
                     :style="styles"
                     :class="classes.transitionClass"
                     draggable="false"
                     @load="prepareImage"/>
            </div>
            <div class="cgl-arrow-wrapper cgl-arrow-left" @click="showPreviousImage">
                <svg class="cgl-arrow"
                     :width="arrow.svg.width+'px'"
                     :height="arrow.svg.height+'px'"
                     :viewBox="arrow.svg.viewBox">
                    <path :d="arrow.svg.path"/>
                </svg>
            </div>
            <div class="cgl-arrow-wrapper cgl-arrow-right" @click="showNextImage">
                <svg class="cgl-arrow"
                     :width="arrow.svg.width+'px'"
                     :height="arrow.svg.height+'px'"
                     :viewBox="arrow.svg.viewBox">
                    <path :d="arrow.svg.path"/>
                </svg>
            </div>
        </div>
    </div>
</template>

<style>
    .cascade-gallery-modal{
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,.87);
        z-index: 5000;
    }
    .cascade-gallery-modal-image {
        width: 100%;
        height: 100%;
        position: fixed;
        left: 0;
        text-align: center;
    }
    .cascade-gallery-modal-image img {
        touch-action: none;
        max-height: 100%;
        max-width: 70%;
        position: absolute;
        -webkit-box-shadow: 0px 7px 24px 0px rgba(0,0,0,0.55);
        -moz-box-shadow: 0px 7px 24px 0px rgba(0,0,0,0.55);
        box-shadow: 0px 7px 24px 0px rgba(0,0,0,0.55);
    }

    @media only screen and (max-width: 900px) {
        .cascade-gallery-modal-image img {
            max-width: 100%;
        }
    }

    .cascade-gallery-modal-image-transition {
        -webkit-transition: left .34s ease-out;
        -moz-transition: left .34s ease-out;
        -o-transition: left .34s ease-out;
        transition: left .34s ease-out;
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
        position: absolute;
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
</style>