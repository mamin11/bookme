<template>
        <v-row class="flex mx-auto text-sm w-2/3">
            <v-col class="text-start">{{title}}: </v-col><v-col class="text-end">{{value}}</v-col>
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