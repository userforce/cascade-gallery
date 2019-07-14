<script>
    export default {
        props: {
            greetings: {
                type: String,
                default: "Greetings!",
            }
        },
        data() {
            return {
                display_greetings: true,
            };
        }
    }
</script>

<template>
    <div>
        <p v-if="display_greetings">
            {{ greetings }}
        </p>
        <p v-else="display_greetings">
            Something went wrong!
        </p>
    </div>
</template>