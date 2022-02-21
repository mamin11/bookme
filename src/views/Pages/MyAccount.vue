<template>
    <v-container>
        <v-row class="mx-auto" justify="center">
            <v-col cols="6">
                <v-card-title class="my-5">
                    <v-row class="mx-auto flex flex-col" justify="center">
                        <v-avatar size="200" class="mx-auto my-4">
                            <img
                            v-if="user.image !== null"
                            :src="previewUrl !== null ? previewUrl : user.image_url"
                            alt="John"
                            >
                            <img
                            v-else
                            :src="previewUrl !== null ? previewUrl : defaultUrl"
                            alt="John"
                            >
                        </v-avatar>
                            <v-card-subtitle v-if="imageError" class="text-center text-red-500">{{imageErrorMessage}}</v-card-subtitle>
                        <v-btn
                            color="error"
                            class="text-none mx-auto"
                            rounded
                            depressed
                            @click="$refs.fileInput.click()"
                        >
                            <v-icon left>
                            mdi-cloud-upload
                            </v-icon>
                            upload
                        </v-btn>
                        <input type="file" ref="fileInput" class="hidden" @change="fileInputChange" />

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
                    :error-messages="errors.email"
                    v-model="form.email"
                    />

                </v-form>

                <v-row justify="center" class="p-5 flex flex-row">
                    <v-col cols="3" class="mx-auto">
                        <v-btn class="mx-auto mb-4" :loading="loading" block rounded dark color="red" @click="updateUser">Save</v-btn>
                    </v-col>
                </v-row>

            </v-col>

            <v-snackbar
                v-model="snackbar"
                :timeout="timeout"
                :color="snackBarColor"
            >
                {{ text }}

                <template v-slot:action="{ attrs }">
                <v-btn
                    color="white"
                    text
                    v-bind="attrs"
                    @click="snackbar = false"
                >
                    Close
                </v-btn>
                </template>
            </v-snackbar>

        </v-row>
    </v-container>
</template>

<script>
import axios from 'axios'
export default {

    data() {
        return {
            errors: {},
            imageError: false,
            imageErrorMessage: 'There was a problem with the image',
            previewUrl: null,
            defaultUrl: require('../../assets/default-user.jpg'),
            form: {
                firstname: '',
                lastname: '',
                email: '',
                image: null,
                role: ''
            },
            loading: false,

            snackbar: false,
            text: '',
            snackBarColor: 'error',
            timeout: 5000,
        }
    },

    computed: {
        user() {
            return this.$session.get('user')
        }
    },

    mounted() {
        this.setUser()
    },

    methods: {
        setUser() {
            this.form.firstname = this.user.firstname
            this.form.lastname = this.user.lastname
            this.form.email = this.user.email
            this.form.role = this.user.role
        },
        resetUser() {
            this.form.firstname = ''
            this.form.lastname = ''
            this.form.email = ''
            this.form.role = ''
            this.form.image = null
        },
        fileInputChange(e) {
            const file = e.target.files
            if (file.length !== 0) {
                this.previewUrl = URL.createObjectURL(file[0])
                if(file[0].size > 2000000) {
                    this.imageError = true
                    this.imageErrorMessage = 'File must be less than 2MB'
                    this.previewUrl = null
                } else {
                    this.imageError = false
                    this.form.image = file[0]
                    // console.log(file[0]);
                }
            } else {
                this.previewUrl = null
            }
        },

        async updateUser() {
            try {
                this.loading = true
                const formData = new FormData();
                formData.append('firstname', this.form.firstname)
                formData.append('lastname', this.form.lastname)
                if(this.form.image !== null) {
                    formData.append('image', this.form.image)
                }
                formData.append('_method', 'POST')

                const res = await axios.post(process.env.VUE_APP_API_URL +'/users/' + this.user.id, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": `Bearer ${this.$session.get('token')}`,
                    }
                })

                //update user session
                let user = res.data.user
                this.$session.remove('user')
                this.$session.set('user', user)
                // replace user details in session with new user details

                this.loading = false
                this.showSnackBar('success', 'Updated successfully')
                this.$router.go(0)
                
            } catch (error) {
                this.loading = false
                this.showSnackBar('error', error.response.data.message)
            }
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