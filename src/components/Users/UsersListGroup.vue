<template>
    <v-container>
        <v-row no-gutters>
            <v-col cols="12">
                <v-list shaped max-height="60vh" class="overflow-y-scroll">
                    <v-list-item-group color="red">
                        <user-card v-for="(user, i) in users" :key="i" :user="user" @editUser="editUser()"></user-card>
                    </v-list-item-group>
                </v-list>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import UserCard from './UserCard.vue'
export default {
    props: ['users'],

    components: { UserCard },

    methods: {
        editUser() {
            this.$emit('showEditForm')
        }
    }

}
</script>

<style>

</style>