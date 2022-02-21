<template>
    <v-container fluid class="fill-height">
        <v-row class="shadow-lg">

            <v-col cols="12" md="8" class="mx-auto">
                <v-card-title class="my-5">
                    <v-row class="mx-auto" justify="center">
                        <v-col cols="12">
                            <v-row>
                                <v-col cols="12">
                                    <v-card-title>Reset your password</v-card-title>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-card-title>

                <v-form class="p-5">
                    <v-text-field
                    label="Email"
                    name="Email"
                    prepend-icon="mdi-email"
                    type="email"
                    color="blue accent-3"
                    class="px-4"
                    :error-messages="errors"
                    v-model="form.email"
                    />

                <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                    color="blue accent-3"
                    class="px-4"
                    required
                    :error-messages="errors"
                    v-model="form.password"
                />

                <v-text-field
                    id="password-confirm"
                    label="Confirm password"
                    name="password_confirm"
                    prepend-icon="mdi-lock"
                    type="password"
                    color="blue accent-3"
                    class="px-4"
                    required
                    :error-messages="password_confirm_error"
                    v-model="form.password_confirm"
                />
                </v-form>

                <v-row justify="center" class="p-5 flex flex-col">
                    <v-col cols="3" class="mx-auto">
                        <v-btn class="mx-auto mb-4" :loading="loading" block rounded dark color="red" @click="submitForm">Submit</v-btn>
                    </v-col>
                </v-row>
            </v-col>

        <v-col cols="11" class="mx-auto my-5" >
            <v-card-subtitle v-if="showResponse" class="text-center text-green-700">{{response}}</v-card-subtitle>
        </v-col>

        </v-row>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    //accept email, password, token
    //send request to server
    //logout user out, as original tokens will be deleted from server
    //redirect to login page or log user automatically

    name: 'ResetPassword',
    
    data(){
        return {
            showResponse: false,
            loading: false,
            form: {
                'email': '',
                'password': '',
                'password_confirm': '',
            },
            password_confirm_error: ''
        }
    },

    mounted(){
        console.log(this.token);
    },

    beforeDestroy(){
        this.clearResponse()
        this.clearErrors()
    },

    computed: {
        ...mapGetters({
            errors: 'getResetPasswordErrors',
            response: 'getResetPasswordResponse'
        }),
        token() {
            return this.$route.query.token
        },
    },

    methods: {
        async submitForm() {
            //validate passwords
            if(!this.checkIfPasswordsMatch()) {
                this.password_confirm_error = 'Passwords do not match'
            } else {
                this.password_confirm_error = ''
                this.loading = true

                const formData = new FormData();
                formData.append("email", this.form.email)
                formData.append("password", this.form.password)
                formData.append("token", this.token)
                formData.append('_method', 'POST')

                //reset response message incase any from previous
                this.clearResponse()
                this.clearErrors()

                await this.$store.dispatch('resetPassword', formData)
                
                this.loading = false

                if(this.$store.state.resetPasswordResponse !== null){
                    this.showResponse = true
                    //reset store errors
                    this.clearErrors()
                    this.resetFormFields()
                    this.$session.destroy()
                    await this.$router.push({ name: 'Login' })
                }
            }
        },
        checkIfPasswordsMatch() {
            if(this.form.password === this.form.password_confirm) {
                return true
            }
            return false
        },

        resetFormFields() {
            this.form.email = ''
            this.form.password = ''
            this.form.password_confirm = ''
            this.form.password_confirm_error = ''
        },


        clearResponse() {
            this.$store.dispatch('clearPasswordResetResponse')
        },

        clearErrors() {
            this.$store.dispatch('clearPasswordResetErrors')
        }
    }

}
</script>

<style>

</style>