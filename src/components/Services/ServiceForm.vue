<template>
<v-row justify="center">
    <v-dialog
    v-model="dialog"
    persistent
    max-width="600px"
    >

    <template v-slot:activator="{ on, attrs }">
        <div>
        <!-- Add button -->
            <button class="btn bg-blue-500 hover:bg-blue-600 text-white" v-bind="attrs" v-on="on">
                <svg class="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                </svg>
                <span class="hidden xs:block ml-2">Add Service</span>
            </button>   
        </div>
    </template>

    <v-card color="">
        <v-card-title>
        <span class="headline">Service Form</span>
        </v-card-title>
        <v-card-text>
        <v-container fluid>
            <!-- <v-row> -->
                <!-- Modal content -->
                <div class="">
                <div class="space-y-3">
                    <div>
                        <label class="block text-sm font-medium mb-1" for="name">Title <span class="text-gray-500">*</span></label>
                        <input v-model="formData.title" id="name" class="shadow border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" required />
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-1" for="email">Minimum duration <span class="text-gray-500">*</span></label>
                        <input v-model="formData.duration" id="duration" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" required />
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-1" for="email">Price (p/h) <span class="text-gray-500">*</span></label>
                        <input v-model="formData.price" id="price" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" required />
                    </div>
                </div>
                </div>
                <!-- Modal footer -->
                <div class="flex px-5 py-4 border-t border-slate-200">
                <small>*indicates required field</small>
                <div class="flex flex-wrap justify-end space-x-2">
                    <button class="btn-sm border-slate-200 hover:border-slate-300 text-slate-600" @click="dialog = false">Cancel</button>
                    <button class="btn-sm bg-blue-500 hover:bg-blue-600 text-white"  @click="addService">Save</button>
                </div>
                </div>
            <!-- </v-row> -->
        </v-container>
        </v-card-text>
    </v-card>
    </v-dialog>
</v-row>
</template>

<script>
export default {
    name: "ServiceForm",

    data: () => ({
        dialog: false,
        formData: {
            title: '',
            duration: '',
            price: ''
        }
    }),

    methods: {
        addService() {
            //validate form

            //dispatch action
            this.$store.dispatch('addService', this.formData)

            //reset form
            this.formData = {
                title: '',
                duration: '',
                price: ''
            }

            //close modal
            this.dialog = false
        },
    },

}
</script>

<style>

</style>