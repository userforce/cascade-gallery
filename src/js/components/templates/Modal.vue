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
                diff: 0,
                window: {
                    width: window.innerWidth,
                    height: window.innerHeight
                },
                styles: {
                    left: 0,
                    top: '200%'
                },
                classes: {
                    animationClass: 'cgl-modal-animation',
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

            setImagePositionStyles() {

            },

            prepareDragging(event) {
                let self = this;
                let events = ["touchstart", "mousedown"];
                self.addEventListeners(event.target, ["mousedown", "touchstart"], function(event) {
                    let imageLeft = event.target.offsetLeft;
                    let mouseLeft = null;
                    if (event.type === "touchstart") {
                        mouseLeft = event.touches[0].pageX;
                    } else {
                        mouseLeft = event.pageX;
                    }
                    self.diff = mouseLeft - imageLeft;
                    self.setClasses(event, '');
                    self.addEventListeners(event.target, ["mousemove", "touchmove"], self.dragElement);
                });
                self.addEventListeners(event.target, ["mouseup", "touchend", "mouseout"], function(event) {
                    self.setClasses(event, self.classes.transitionClass);
                    event.target.removeEventListener("mousemove", self.dragElement);
                    event.target.removeEventListener("touchmove", self.dragElement);
                    self.setPosition(event);
                });
            },

            dragElement(event) {
                event.preventDefault();
                let imageLeft = event.pageX - this.diff;
                if (event.type === "touchmove") {
                    imageLeft = event.touches[0].pageX - this.diff;
                }
                this.setImagePositionX(imageLeft);
            },

            addEventListeners(target, events, listener) {
                for (let index in events) {
                    let event = events[index];
                    target.addEventListener(events[index], listener, false);
                }
            },

            setImagePositionX(position) {
                this.styles.left = position.toString()+'px';
            },

            setPosition(event) {
                this.styles.left = (event.target.parentNode.offsetWidth/2 - event.target.offsetWidth/2)+'px';
                this.styles.top = (event.target.parentNode.offsetHeight/2 - event.target.offsetHeight/2)+'px';
            },

            setClasses(event, classes = '') {
                event.target.className = classes;
            },

            prepareImage(event) {
                this.setPosition(event);
                this.setClasses(event, this.classes.animationClass);
                this.prepareDragging(event);
            }
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
                     draggable="false"
                     @load="prepareImage"/>
            </div>
            <div class="cgl-arrow-wrapper cgl-arrow-left">
                <svg class="cgl-arrow"
                     :width="arrow.svg.width+'px'"
                     :height="arrow.svg.height+'px'"
                     :viewBox="arrow.svg.viewBox">
                    <path :d="arrow.svg.path"/>
                </svg>
            </div>
            <div class="cgl-arrow-wrapper cgl-arrow-right">
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

    .cgl-modal-animation{
        animation: cgl-modal-append .47s 1;
    }

    @keyframes cgl-modal-append {
        0%{
            opacity: 0;
            margin-top: -20%;
        }
        100%{
            opacity: 1;
            margin-top: 0%;
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