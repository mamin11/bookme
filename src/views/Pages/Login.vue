<template>
    <v-container class="fill-height" fluid>
        <v-row class="my-auto" align="center" justify="center">
            <v-col cols="9" md="9" justify-center class="mx-auto my-10">
                <v-card class="elevation-12">
                    <v-window v-model="step">
                        <v-window-item :value="1">
                            <login-form @incrementStep="incrementStep"></login-form>
                        </v-window-item>

                        <v-window-item :value="2">
                            <register-form @decrementStep="decrementStep"></register-form>
                        </v-window-item>
                    </v-window>

                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
// import { mapGetters } from 'vuex'
import LoginForm from '../../components/Login/LoginForm.vue'
import RegisterForm from '../../components/Login/RegisterForm.vue'

export default {
    components: { LoginForm ,RegisterForm},
    name: 'Login',
    
    // mounted() {
    //     this.$store.dispatch('setHideNav', this.hideNav)
    // },
    data() {
        return {
            hideNav: true,
            step: 1,
        }
    },

    // computed: {
    //     ...mapGetters({
    //         session: 'getUserToken'
    //     }),
    // },

    // watch: {
    //     session() {
    //         if(this.$session.has('token')) {
    //             console.log('redirect called');
    //             this.redirect
    //         }
    //     }
    // },

    methods: {
        incrementStep() {
            this.step++
        },
        decrementStep() {
            this.step--
        },
        // redirect() {
        //     this.$router.push('/')
        // }
    }

}
</script>

<style>

</style>