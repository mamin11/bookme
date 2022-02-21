<template>
    <v-container class="fill-height" fluid>
        <v-row class="my-auto" align="center" justify="center">
            <v-col cols="9" md="9" justify-center class="mx-auto my-10">
                <v-card class="elevation-12">
                    <v-row :hidden="step === 2">
                        <v-col cols="6"><v-card-title>Current Users</v-card-title></v-col>
                        <v-col cols="6">
                            <v-select
                            :items="roles"
                            label="Filter by user type"
                            class="px-4"
                            color="blue accent-3"
                            v-model="filterUsers"
                            ></v-select>
                        </v-col>
                    </v-row>
                    <v-window v-model="step">
                        <v-window-item :value="1">
                            <users-list-group :users="usersList" @showEditForm="showEditForm"></users-list-group>
                        </v-window-item>

                        <v-window-item :value="2">
                            <user-form @showList="showList"></user-form>
                        </v-window-item>
                    </v-window>

                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import UserForm from '@/components/Users/UserForm.vue'
import UsersListGroup from '@/components/Users/UsersListGroup.vue' 
import { mapGetters } from 'vuex'

export default {
    components: { UsersListGroup, UserForm },

    data() {
        return {
            step: 1,
            filterUsers: 'all',
            usersList: [],
            roles: ['all','admin', 'student', 'tutor'],
        }
    },

    mounted() {
        this.getUsers()
    },

    watch: {
        filterUsers() {
            switch (this.filterUsers) {
                case 'all':
                    this.usersList = this.users
                    break;
                case 'admin':
                    this.usersList = this.admins
                    break;
                case 'student':
                    this.usersList = this.students
                    break;
                case 'tutor':
                    this.usersList = this.tutors
                    break;
            
                default:
                    this.usersList = this.users;
            }
        }
    },

    computed: {
        ...mapGetters({
            users: 'getUsers',
        }),
        token() {
            return this.$session.get('token')
        },
        admins() {
            let admins = []
            if(this.users.length > 0) {
                this.users.map((user) => {
                    if(user.role === 'admin') {
                        admins.push(user)
                    }
                })
            }
            return admins
        },
        students() {
            let students = []
            if(this.users.length > 0) {
                this.users.map((user) => {
                    if(user.role === 'student') {
                        students.push(user)
                    }
                })
            }
            return students
        },
        tutors() {
            let tutors = []
            if(this.users.length > 0) {
                this.users.map((user) => {
                    if(user.role === 'tutor') {
                        tutors.push(user)
                    }
                })
            }
            return tutors
        },
    },

    methods: {
        showEditForm() {
            this.step = 2
        },
        showList() {
            this.step = 1
        },
        async getUsers() {
            await this.$store.dispatch('getUsers', this.token)
            this.usersList = this.users
        }
    }

}
</script>

<style>

</style>