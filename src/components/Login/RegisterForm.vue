<template>
    <v-row class="h-full">
        <v-col cols="12" md="4">
                <v-img
                    src="@/assets/confirm.svg"
                    height="100%"
                    width="100%"
                    contain
                    :aspect-ratio="16/9"
                ></v-img>
        </v-col>

        <v-col cols="12" md="8">
            <v-card-title class="my-5">
                    <v-row class="mx-auto" justify="center">
                        <v-col cols="6">
                            <v-row>
                                <v-col cols="6">
                                    <v-btn text @click="decrementStep">Login</v-btn>
                                </v-col>
                                <v-col cols="6"><v-btn text color="primary" >Register</v-btn></v-col>
                            </v-row>
                        </v-col>
                    </v-row>
            </v-card-title>
            
        <v-card-text class="mt-12">
            <v-form>
            <v-text-field
                label="Firstname"
                name="Firstname"
                prepend-icon="mdi-account"
                type="text"
                color="blue accent-3"
                class="px-4"
                required
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
                required
                :error-messages="errors.lastname"
                v-model="form.lastname"
            />
            <v-text-field
                label="Email"
                name="Email"
                prepend-icon="mdi-email"
                type="text"
                color="blue accent-3"
                class="px-4"
                required
                :error-messages="errors.email"
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
                :error-messages="errors.password"
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
        </v-card-text>
        <div class="text-center mt-n5">
            <v-col cols="3" class="mx-auto">
                <v-btn class="mx-auto mb-4 uppercase" :loading="loading" block rounded dark color="red" @click="submitForm">Sign up</v-btn>
            </v-col>
        </div>
        </v-col>

        <v-col cols="11" class="mx-auto my-5" >
            <v-alert v-model="alert" type="success" dismissible>Success. Please verify your email and then log in</v-alert>
        </v-col>

    </v-row>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'RegisterForm',
    data() {
        return {
            loading: false,
            alert: false,
            form: {
                'firstname': '',
                'lastname': '',
                'email': '',
                'password': '',
                'password_confirm': '',
            },
            password_confirm_error: ''
        }
    },
    
    computed: {
        ...mapGetters({
            errors: 'getRegisterFormErrors',
            resp: 'getRgisterFormResponse'
        }),
    },

    methods: {
        decrementStep() {
            this.$emit('decrementStep')
        },

        async submitForm() {
            this.loading = true
            //validate
            if(!this.checkIfPasswordsMatch()) {
                this.password_confirm_error = 'Passwords do not match'
            } else {
                this.password_confirm_error = ''
            }

            const formData = new FormData();
            formData.append("firstname", this.form.firstname)
            formData.append("lastname", this.form.lastname)
            formData.append("email", this.form.email)
            formData.append("password", this.form.password)
            formData.append('role', 'student')
            formData.append('_method', 'POST')

            try {
                 //if there is no session, attempt login
                if(!this.$session.has('token')){
                    await this.$store.dispatch('register', formData)
                }

                this.loading = false

                //log in the user
                // if(this.$session.has('token')){
                if(this.$store.getters.getUser !== null){
                    //first clear error messaegs from state
                    await this.$store.dispatch('resetRegisterErrors')
                    //then redirect user
                    // await this.$router.push({ name: 'Home' })

                    //reset form inputs
                    this.resetFormFields()
                    this.alert = true
                }
            } catch (error) {
                console.log('An error occured', error);
            }
        },

        checkIfPasswordsMatch() {
            if(this.form.password === this.form.password_confirm) {
                return true
            }
            return false
        },

        resetFormFields() {
            this.form.firstname = ''
            this.form.lastname = ''
            this.form.email = ''
            this.form.password = ''
            this.form.password_confirm = ''
            this.form.password_confirm_error = ''
        }
    }
}
</script>

<style>

</style>