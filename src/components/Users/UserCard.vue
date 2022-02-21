<template>
    <v-list-item class="p-2 my-1 ml-4" @click="editUser">
        <v-list-item-avatar class="px-4">
            <v-avatar v-if="user.image !== null">
                <img :src="user.image_url" alt="user image">
            </v-avatar>
            <v-avatar v-else color="red">
                <span class="white--text text-xs">{{user.firstname}}</span>
            </v-avatar>
        </v-list-item-avatar>
        <v-list-item-content>
            <v-list-item-title>{{user.full_name}}</v-list-item-title>
        </v-list-item-content>
    </v-list-item>
</template>

<script>
export default {
    props: ['user'],
    methods: {
        async editUser() {
            await this.$store.dispatch('setEditingUser', this.user)
            this.$emit('editUser')
        }
    }
}
</script>

<style>

</style>