<template>
    <v-snackbar v-model="showSnackbar" :color="colour">
        {{ text }}

        <template v-slot:action="{ attrs }">
            <v-btn
            text
            v-bind="attrs"
            @click="showSnackbar = false"
            >
            Close
            </v-btn>
        </template>
    </v-snackbar>
</template>

<script>
export default {
    props: {
        snackbar: Boolean,
        text: String,
        colour: String
    },
    data() {
        return {
        }
    },
    computed: {
        showSnackbar: {
            get() {
                return this.snackbar
            },
            set() {
            }
        }
    }

}
</script>

<style>

</style>