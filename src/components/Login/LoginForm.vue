<template>
    <v-row class="h-full">
        <v-col cols="12" md="4">
            <v-img
                src="@/assets/push.svg"
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
                                <v-btn text color="primary">Login</v-btn>
                            </v-col>
                            <v-col cols="6"><v-btn text @click="incrementStep">Register</v-btn></v-col>
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
                :error-messages="errors.password"
                v-model="form.password"
                />
            </v-form>

            <v-row justify="center" class="p-5 flex flex-col">
                <v-col cols="3" class="mx-auto">
                    <v-btn class="mx-auto mb-4" :loading="loading" block rounded dark color="red" @click="submitForm">Login</v-btn>
                </v-col>
            </v-row>
            <v-card-actions>
                <v-row justify="center" class="p-3">
                    <a href="/forgot-password" class="text-center text-sm ">Forgot your password ?</a>
                </v-row>
            </v-card-actions>
        </v-col>
    </v-row>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'LoginForm',
    data() {
        return {
            loading: false,
            form: {
                'email': '',
                'password': '',
            }
        }
    },

    computed: {
        ...mapGetters({
            errors: 'getLoginFormErrors',
        }),
    },

    methods: {
        incrementStep() {
            this.$emit('incrementStep')
        },

        async submitForm() {
            this.loading = true

            const formData = new FormData();
            formData.append("email", this.form.email)
            formData.append("password", this.form.password)
            formData.append('_method', 'POST')

            try {
                //if there is no session, attempt login
                if(!this.$session.has('token')){
                    await this.$store.dispatch('login', formData)
                }
                
                this.loading = false

                if(this.$session.has('token')){
                    //first clear error messaegs from state
                    await this.$store.dispatch('resetLoginErrors')
                    //then redirect user
                    await this.$router.go({ name: 'Home' })
                    // await this.$router.push({ name: 'Home' })
                }

            } catch (error) {
                console.log('An error occured', error);
            }
        }
    }
}
</script>

<style>

</style>