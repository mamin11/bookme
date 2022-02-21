<template>
    <v-container class="fill-height" fluid>
        <v-row justify-center>
            <!-- <h1 class="text-center text-md text-black">{{params}}</h1> -->
            <v-col cols="12">
                <scaling-squares-spinner
                v-if="loading"
                class="mx-auto"
                :animation-duration="1250"
                :size="65"
                color="#ff1d5e"
                />
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
import { ScalingSquaresSpinner  } from 'epic-spinners'
import axios from 'axios'

export default {
    name: 'UserVerification',

    components: {ScalingSquaresSpinner},

    data(){
        return {
            loading: false,
            response: null,
            showResponse: false,
            error: null
        }
    },

    computed: {
        params() {
            return `${this.$route.params.email_verify_url}?expires=${this.$route.query.expires}&signature=${this.$route.query.signature}`
        },
        // expires() {
        //     return this.$route.query.expires
        // },
        // signature() {
        //     return this.$route.query.signature
        // },
        token() {
            return this.$session.get('token')
        },
        user() {
            return this.$session.get('user')
        }
    },
    mounted() {
        // console.log(this.params);
        this.verifyUser()
    },

    methods: {
        async verifyUser() {
            try {
                this.loading = true
                const formData = new FormData();
                formData.append('email', this.user.email)
                formData.append('_method', 'POST')

                const res = await axios.post(process.env.VUE_APP_API_URL +'/' + this.params, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": `Bearer ${this.token}`,
                    }
                })

                //update user session ie add email_verified_at
                let user = res.data.user
                this.$session.remove('user')
                this.$session.set('user', user)
                // replace user details in session with new user details

                this.loading = false
                this.response = res.data.message
                this.showResponse = true
                
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