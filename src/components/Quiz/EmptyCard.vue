<template>
    <div class="hidden col-md-4 xl:flex h-screen items-center my-auto filter blur-sm animate__animated">
        <v-skeleton-loader
        v-if="loading"
        class="w-full max-w-xl p-5 relative mx-auto  rounded-xl shadow-lg  bg-white "
        v-bind="attrs"
        type=" table-heading, divider, list-item-two-line,list-item-three-line, list-item-three-line, list-item-three-line"
        ></v-skeleton-loader>
        <div v-else class="w-full max-w-xl p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white opacity-50" style="height: 400px"></div>
    </div>
</template>

<script>
export default {
    name:'EmptyCard',
    props: [
        'loading'
    ],
    data(){
        return {
            attrs: {
            class: 'mb-6',
            boilerplate: true,
            elevation: 2,
            height: 470
            },
        }
    },
}
</script>

<style>

</style>