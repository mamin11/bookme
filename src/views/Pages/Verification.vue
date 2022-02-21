<template>
    <v-container fluid class="fill-height">
        <v-row class="shadow-lg mx-auto" justify="center">

            <v-col cols="12" md="8" class="mx-auto">
                <v-row justify="center" class="flex flex-col">
                    <v-col cols="12">
                        <svg class="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11"></path></svg>
                    </v-col>
                    <v-col cols="12">
                        <h1 class="my-5 uppercase text-lg text-center">You must verify your email</h1>
                    </v-col>
                    <v-col cols="12">
                        <h4 class="my-5 text-sm text-center">
                            Before you continue using the application, you will need to verify your email address. Click the button below to send verification email.
                        </h4>
                    </v-col>
                </v-row>

                <v-row justify="center" class="p-5 flex flex-col">
                    <v-col cols="3" class="mx-auto">
                        <v-btn class="mx-auto mb-4" :loading="loading" block rounded dark color="red" @click="submit">Verify</v-btn>
                    </v-col>
                </v-row>
            </v-col>

        <v-col cols="11" class="mx-auto my-5" >
            <v-card-subtitle v-if="response !== null" class="text-center text-green-700">{{response}}</v-card-subtitle>
        </v-col>

        <v-col cols="11" class="mx-auto my-5" >
            <v-card-subtitle v-if="error !== null" class="text-center text-red-700">{{error}}</v-card-subtitle>
        </v-col>

        </v-row>
    </v-container>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Verification',
    data() {
        return {
            loading: false,
            response: null,
            showResponse: false,
            error: null
        }
    },

    computed: {
        token() {
            return this.$session.get('token')
        }
    },

    methods: {
        async submit() {
            try {
                this.loading = true
                const formData = new FormData();
                formData.append('_method', 'POST')

                const res = await axios.post(process.env.VUE_APP_API_URL + '/email/verification', formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": `Bearer ${this.token}`,
                    }
                })

                this.showResponse = true
                this.response = res.data.message
                this.loading = false
                
            } catch (error) {
                this.loading = false
                this.error = error.response.data.message
            }
        }
    }
}
</script>

<style>

</style>