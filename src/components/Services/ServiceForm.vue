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
          <v-btn class="mx-auto btn" color="red" v-bind="attrs" v-on="on">
            <v-icon color="white">mdi-plus</v-icon>
            <span class="text-white xs:block ml-2 text-capitalize">Add Service</span>
          </v-btn>
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
                    <button class="btn-sm bg-orange-600 hover:bg-orange-500 text-white"  @click="addService">Save</button>
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
import axios from "axios";
import {Messages} from "@/Util/contants";

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
      addAsync: async function () {

        try {
          const response = await axios.post(process.env.VUE_APP_API_URL + '/services/add', this.formData, {
            headers: {
              "Content-Type": "application/json",
              // "Authorization": `Bearer ${token}`,
            }
          })

          this.$emit('showSnackBar', response.data.message, Messages.SUCCESS)
        } catch (error) {
          this.$emit('showSnackBar', error.response.data.error, Messages.ERROR)
        }
      },

      loadServicesAsync: async function () {
        await this.$store.dispatch('getServices')
      },

      async addService() {
        //todo: validate form

        //dispatch actions
        await this.addAsync();

        await this.loadServicesAsync();

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