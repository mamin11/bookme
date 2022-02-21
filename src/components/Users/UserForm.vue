<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-card-title class="my-5">
                    <v-row class="mx-auto" justify="center">
                    </v-row>
                </v-card-title>

                <v-form class="p-5">
                    <v-text-field
                    label="Firstname"
                    name="Firstname"
                    prepend-icon="mdi-account"
                    type="text"
                    color="blue accent-3"
                    class="px-4"
                    :error-messages="errors.firstname"
                    v-model="form.firstname"
                    />

                    <v-text-field
                    label="Lastname"
                    name="Lastname"
                    prepend-icon="mdi-account"
                    type="text"
                    color="blue accent-3"
                    class="px-4"
                    :error-messages="errors.lastname"
                    v-model="form.lastname"
                    />

                    <v-text-field
                    label="Email"
                    name="Email"
                    readonly
                    prepend-icon="mdi-email"
                    type="email"
                    color="blue accent-3"
                    class="px-4"
                    v-model="form.email"
                    />

                    <v-select
                    :items="roles"
                    label="User type"
                    class="px-4"
                    color="blue accent-3"
                    :error-messages="errors.role"
                    prepend-icon="mdi-account-question"
                    v-model="form.role"
                    ></v-select>

                </v-form>

                <v-row justify="center" class="p-5 flex flex-row">
                    <v-col cols="3" class="mx-auto">
                        <v-btn class="mx-auto mb-4" :loading="loading" block rounded dark color="red" @click="goBack">Back</v-btn>
                    </v-col>
                    <v-col cols="3" class="mx-auto">
                        <v-btn class="mx-auto mb-4" :loading="loading" block rounded dark color="blue" @click="submitForm">Save</v-btn>
                    </v-col>
                </v-row>

            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'
export default {
    data() {
        return {
            errors: {},
            loading: false,
            form: {
                firstname: '',
                lastname: '',
                email: '',
                image: null,
                role: ''
            },
            roles: ['admin', 'student', 'tutor'],
        }
    },

    computed: {
        ...mapGetters({
            editingUser: 'getEditingUser'
        }),
    },

    mounted() {
        this.form.firstname = this.editingUser.firstname
        this.form.lastname = this.editingUser.lastname
        this.form.email = this.editingUser.email
        this.form.role = this.editingUser.role
    },

    watch: {
        editingUser() {
            this.updateForm()
        }
    },

    methods: {
        goBack() {
            // await this.$store.dispatch('resetEditingUser')
            this.$emit('showList')
            // this.resetForm()
        },
        async submitForm() {
            try {
                this.loading = true
                const formData = new FormData();
                formData.append('firstname', this.form.firstname)
                formData.append('lastname', this.form.lastname)
                formData.append('role', this.form.role)
                formData.append('_method', 'POST')

                await axios.post(process.env.VUE_APP_API_URL +'/users/' + this.editingUser.id, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": `Bearer ${this.$session.get('token')}`,
                    }
                })

                this.loading = false
                this.$router.go(0)
                
            } catch (error) {
                this.loading = false
                this.showSnackBar('error', error.response.data.message)
            }
        },
        updateForm() {
            this.form.firstname = this.editingUser.firstname
            this.form.lastname = this.editingUser.lastname
            this.form.email = this.editingUser.email
            this.form.role = this.editingUser.role
        },
        resetForm() {
            this.form.firstname = ''
            this.form.lastname = ''
            this.form.email = ''
            this.form.role = ''
        },

        showSnackBar(type, message){
            switch (type) {
                case 'success':
                    this.snackbar = true
                    this.text = message
                    this.timeout = 5000
                    this.snackBarColor = 'success'
                    break;
                case 'error':
                    this.snackbar = true
                    this.text = message
                    this.timeout = 20000
                    this.snackBarColor = 'error'
                    break;
            
                default:
                    break;
            }
        }
    }

}
</script>

<style>

</style>