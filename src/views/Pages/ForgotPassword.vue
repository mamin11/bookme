<template>
    <v-container fluid class="fill-height">
        <v-row class="shadow-lg">

            <v-col cols="12" md="8" class="mx-auto">
                <v-card-title class="my-5">
                    <v-row class="mx-auto" justify="center">
                        <v-col cols="12">
                            <v-row>
                                <v-col cols="12">
                                    <v-card-title>Forgot your password? Enter your email below.</v-card-title>
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
                    v-model="email"
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
    name: 'ForgotPassword',
    data() {
        return {
            loading: false,
            showResponse: false,
            email: '',
        }
    },
    computed: {
        ...mapGetters({
            errors: 'getForgotPasswordErrors',
            response: 'getForgotPasswordResponse'
        }),
    },

    methods: {
        async submitForm() {
            this.loading = true

            const formData = new FormData();
            formData.append("email", this.email)
            formData.append('_method', 'POST')

            //reset response message incase any from previous
            this.clearResponse()
            this.clearErrors()

            await this.$store.dispatch('forgotPassword', formData)
            
            this.loading = false

            if(this.$store.state.forgotPasswordResponse !== null){
                this.email = ''
                this.showResponse = true
                //reset store errors
                this.clearErrors()
            }
        },

        clearResponse() {
            this.$store.dispatch('clearPasswordForgotResponse')
        },

        clearErrors() {
            this.$store.dispatch('clearPasswordForgotErrors')
        }
    }

}
</script>

<style>

</style>