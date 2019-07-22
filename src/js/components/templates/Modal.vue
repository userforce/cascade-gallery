<script>
    import c from '../../constants';

    export default {
        name: c.GALLERY_COMPONENT_NAME,
        props: {
            images: { type: Array },
            config: { type: Object }
        },
        data() {
            return {
                window: {
                    width
                }
            };
        },
        mounted() {
            this.window.width = window.innerWidth;
            this.window.height = window.innerHeight;
            window.onresize(this.resizeModal);
            this.prepareModal();
        },
        methods: {
            resizeModal(event) {
                console.log(this.window.width);
            },
            prepareModal() {
                console.log(this.window.width);
            }
        }
    }
</script>

<template>
    <div class="cascade-gallery-modal">

    </div>
</template>

<style>
    .cascade-gallery-modal{

    }
</style>