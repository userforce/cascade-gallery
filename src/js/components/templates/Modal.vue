<script>
    import c from '../../constants';

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
                transitionClass: 'cascade-gallery-modal-image-transition'
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

            dragImage(event) {
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
                    event.target.className = '';
                    self.addEventListeners(event.target, ["mousemove", "touchmove"], self.dragElement);
                });
                self.addEventListeners(event.target, ["mouseup", "touchend"], function(event) {
                    event.target.className = self.transitionClass;
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

            prepareImage(event) {
                this.setPosition(event);
                this.dragImage(event);
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
                <img class="cascade-gallery-modal-image-transition"
                     :src="url"
                     :style="styles"
                     @load="prepareImage"/>
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
        background: rgba(0,0,0,.8);
        z-index: 5000;
    }
    .cascade-gallery-modal-image {
        width: 100%;
        height: 90%;
        position: fixed;
        top: 5%;
        left: 0;
    }
    .cascade-gallery-modal-image img {
        touch-action: none;
        max-height: 100%;
        max-width: 100%;
        position: absolute;
    }
    .cascade-gallery-modal-image-transition {
        -webkit-transition: left .34s ease-out;
        -moz-transition: left .34s ease-out;
        -o-transition: left .34s ease-out;
        transition: left .34s ease-out;
    }
</style>