<template>
    <v-snackbar v-model="snackbar" :color="colour">
        {{ text }}

        <template v-slot:action="{ attrs }">
            <v-btn
            text
            v-bind="attrs"
            @click="snackbar = false"
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
    }

}
</script>

<style>

</style>