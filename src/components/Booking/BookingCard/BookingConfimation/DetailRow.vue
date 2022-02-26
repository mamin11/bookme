<template>
        <v-row class="flex mx-auto text-sm">
            <v-col class="text-center">{{title}}: </v-col><v-col class="text-center">{{value}}</v-col>
        </v-row>
</template>

<script>
export default {
    props: {
        title: String,
        value: String
    }
}
</script>

<style>

</style>