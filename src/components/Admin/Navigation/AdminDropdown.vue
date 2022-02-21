<template>
    <v-list-group
        :value="false"
        no-action
        sub-group
    >
        <template v-slot:activator>
        <v-list-item-content>
            <v-list-item-title class="pl-3">Admin</v-list-item-title>
        </v-list-item-content>
        </template>

        <v-list-item
        v-for="([title, icon, to], i) in admins"
        :key="i"
        :to="to"
        >
        <v-list-item-icon><v-icon v-text="icon"></v-icon></v-list-item-icon>
        <v-list-item-title v-text="title"></v-list-item-title>
        </v-list-item>
    </v-list-group>
</template>

<script>
export default {
    data: () => ({
        admins: [
        ['Users', 'mdi-account-multiple-outline', '/manage-users'],
        ['Papers', 'mdi-note-search', 'manage-papers'],
        ],
    }),

}
</script>

<style>

</style>