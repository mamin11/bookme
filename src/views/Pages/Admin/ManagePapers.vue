<template>
    <v-container fluid class="mt-5">
        <v-row justify="center">
            <v-col cols="10">
                <v-app-bar-title class="text-2xl">Free Exam Papers</v-app-bar-title>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="2">
                    <v-btn
                    class="mx-2"
                    color="red"
                    dark
                    fab
                    small
                    @click="toggle"
                    >
                    <v-icon dark>mdi-plus</v-icon>
                    </v-btn>
            </v-col>
        </v-row>

        <v-row justify="center">
            <v-dialog
            v-model="dialog"
            persistent
            max-width="600px"
            class="m-0"
            >
            <v-card>
                <v-card-title>
                <span class="text-h5">Add a paper</span>
                </v-card-title>
                <v-card-text>
                <v-container>
                    <v-row>
                    <v-col
                        cols="12"
                    >
                        <v-text-field
                        label="Name *"
                        readonly
                        :value="paperName"
                        :error-messages="error.name"
                        ></v-text-field>
                    </v-col>

                    <v-col
                        cols="12"
                    >
                        <v-autocomplete
                        :items="subjects"
                        label="Subject *"
                        v-model="form.subject"
                        :error-messages="error.subject"
                        ></v-autocomplete>
                    </v-col>

                    <v-col
                        cols="12"
                    >
                        <v-autocomplete
                        :items="years"
                        label="Year *"
                        v-model="form.year"
                        :error-messages="error.year"
                        ></v-autocomplete>
                    </v-col>

                    <v-col
                        cols="12"
                    >
                        <v-file-input
                            show-size
                            label="Select file"
                            v-model="form.file"
                            :error-messages="error.file"
                        ></v-file-input>
                    </v-col>

                    </v-row>
                </v-container>
                <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="blue darken-1"
                    text
                    @click="dialog = false"
                >
                    Close
                </v-btn>
                <v-btn
                    color="blue darken-1"
                    text
                    @click="submitForm"
                >
                    Save
                </v-btn>
                </v-card-actions>
            </v-card>
            </v-dialog>
        </v-row>

        <v-row>
            <v-col cols="12">


                <v-dialog
                    v-model="deleteWarnDialog"
                    persistent
                    max-width="290"
                >
                    <v-card>
                    <v-card-title class="text-h5">
                        <span class="mx-auto uppercase">Are You Sure?</span>
                    </v-card-title>
                    <v-card-actions>
                        <v-btn
                        color="green darken-1"
                        text
                        @click="deleteWarnDialog = false"
                        >
                        Cancel
                        <v-icon class="mx-3">mdi-close-circle</v-icon>
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn
                        color="red darken-1"
                        text
                        @click="deleteItem"
                        >
                        Continue
                        <v-icon class="mx-3">mdi-delete</v-icon>
                        </v-btn>
                    </v-card-actions>
                    </v-card>
                </v-dialog>

                <v-card>
                    <v-card-title>
                    <v-text-field
                        v-model="search"
                        append-icon="mdi-magnify"
                        label="Search"
                        single-line
                        hide-details
                    ></v-text-field>
                    </v-card-title>
                    <v-data-table
                    :headers="headers"
                    :items="papers"
                    :search="search"
                    sort-by="year"
                    :sort-desc="true"
                    >
                    <template v-slot:[`item.actions`]="{ item }">
                        <a :href="item.full_url" target="_blank">
                            <v-icon
                            small
                            class="mx-3"
                            >
                            mdi-eye
                            </v-icon>
                        </a>
                        <v-icon
                        small 
                        @click="confirmDelete(item)"
                        class="mx-3"
                        >
                        mdi-delete
                        </v-icon>
                    </template>
                    </v-data-table>
                </v-card>
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
    name: 'Papers',
    data() {
        return {
            papers: [],
            dialog: false,
            deleteWarnDialog: false,
            deletingItem: null,
            search: '',
            headers: [
                { text: 'Subject', align: 'start', value: 'subject',},
                { text: 'Year', value: 'year' },
                { text: 'Actions', value: 'actions', sortable: false },
            ],
            form: {
                subject: '',
                year: '',
                file: null
            },
            subjects: ['Mathematics', 'English', 'Kiswahili', 'Science', 'Social Studies', 'IRE', 'CRE', 'HRE', 'Composition', 'Insha'],
            error: {},
            snackbar: false,
            text: '',
            snackBarColor: 'error',
            timeout: 5000,
        }
    },

    mounted() {
        this.getPapers()
    },

    computed: {
        years() {
            return Array.from(Array(new Date().getFullYear() - 1999), (_, i) => (i + 2000).toString())
        },
        paperName() {
            return this.form.subject + '-' + this.form.year
        },
    },

    methods: {
        toggle() {
            this.dialog = !this.dialog
        },

        confirmDelete(item) {
            this.deleteWarnDialog = true
            this.deletingItem = item
        },
        
        async deleteItem(){
            try {
                const formData = new FormData();
                formData.append('_method', 'POST')

                const response = await axios.post(process.env.VUE_APP_API_URL +'/papers/delete/'+this.deletingItem.id, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Accept": "application/json",
                        "Authorization": `Bearer ${this.$session.get('token')}`,
                    }
                })

                // this.deleteResponse = response.data.message
                this.showSnackBar('deleteResponse', response.data.message)
                this.getPapers()
            } catch (error) {
                this.showSnackBar('deleteError', error.response.data.error)
                // this.deleteError = error.response.data.error
            }
            
            this.deleteWarnDialog = false
        },

        async submitForm(){
            this.error = []
            this.successResponse = null
            this.errorMessage = null

            const formData = new FormData();
            formData.append("subject", this.form.subject)
            formData.append("year", this.form.year)
            formData.append("name", this.form.subject + '-' + this.form.year)
            formData.append('file', this.form.file)
            formData.append('_method', 'POST')

            try {
                const response = await axios.post(process.env.VUE_APP_API_URL +'/papers/add', formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Accept": "application/json",
                        "Authorization": `Bearer ${this.$session.get('token')}`,
                    }
                })

                // this.successResponse = response.data.message
                this.showSnackBar('successResponse', response.data.message)
                this.clearForm()
                this.dialog = false
                this.getPapers()
            } catch (error) {
                this.error = error.response.data.error
                this.showSnackBar('errorMessage', error.response.data.message)
                // this.errorMessage = error.response.data.message
            }
            
        },

        async getPapers() {
            const res = await axios.get(process.env.VUE_APP_API_URL +'/papers/show')
            this.papers =  res.data.papers
        },

        clearForm() {
            this.form.subject = ''
            this.form.year = ''
            this.form.file = null
        },

        showSnackBar(type, message){
            switch (type) {
                case 'successResponse':
                    this.snackbar = true
                    this.text = message
                    this.timeout = 5000
                    this.snackBarColor = 'success'
                    break;
                case 'errorMessage':
                    this.snackbar = true
                    this.text = message
                    this.timeout = 20000
                    this.snackBarColor = 'error'
                    break;
                case 'deleteResponse':
                    this.snackbar = true
                    this.text = message
                    this.timeout = 5000
                    this.snackBarColor = 'success'
                    break;
                case 'deleteError':
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