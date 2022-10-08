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
            <span class="text-white xs:block ml-2 text-capitalize">Add User</span>
          </v-btn>
        </div>
    </template>

    <v-card color="">
        <v-card-title>
        <span class="headline">User Form</span>
        </v-card-title>
        <v-card-text>
        <v-container fluid>
            <!-- <v-row> -->
                <!-- Modal content -->
                <div class="my-4">
                <div class="space-y-3">
                  <div>
                    <label class="block text-sm font-medium mb-1">Profile Picture <span class="text-gray-500"></span></label>
                    <v-file-input
                    accept="image/png, image/jpeg, image/bmp"
                    placeholder="Select Image"
                    label="Select Image"
                  ></v-file-input>
                  </div>
                    <div class="mb-2">
                        <label class="block text-sm font-medium mb-1" for="firstname">Firstname <span class="text-gray-500">*</span></label>
                        <input v-model="formData.firstname" id="firstname" class="shadow border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" required />
                    </div>
                    <div class="mb-2">
                        <label class="block text-sm font-medium mb-1" for="lastname">Lastname <span class="text-gray-500">*</span></label>
                        <input v-model="formData.lastname" id="lastname" class="shadow border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" required />
                    </div>
                    <div class="mb-2">
                        <label class="block text-sm font-medium mb-1" for="email">Email <span class="text-gray-500">*</span></label>
                        <input v-model="formData.email" id="email" class="shadow border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="email" required />
                    </div>
                    <div class="mb-2">
                        <label class="block text-sm font-medium mb-1" for="email">Phone Number <span class="text-gray-500">*</span></label>
                        <input v-model="formData.phone" id="phone" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" required />
                    </div>
                    <div class="mb-2">
                        <label class="block text-sm font-medium mb-1" for="email">Password <span class="text-gray-500">*</span></label>
                        <input v-model="formData.password" id="password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="password" required />
                    </div>
                    <div class="mb-2">
                      <label class="block text-sm font-medium mb-1" for="firstname">Services <span class="text-gray-500">*</span></label>
                        <v-select
                        :items="services"
                        item-value="id"
                        item-text="title"
                        item-color="red"
                        color="orange lighten-1"
                        chips
                        sm
                        hint="Which services will this staff provide?"
                        persistent-hint
                        v-model="formData.services"
                        multiple
                        >
                        <template #selection="{ item }">
                          <v-chip color="red" dark>{{item.title}}</v-chip>
                        </template>
                        </v-select>
                    </div>

                    <div class="mb-2">
                      <label class="block text-sm font-medium mb-1" for="firstname">Working Days <span class="text-gray-500">*</span></label>
                        <v-select
                        :items="workingDays"
                        item-text="value"
                        item-value="key"
                        item-color="red"
                        color="orange lighten-1"
                        chips
                        sm
                        hint="Which days will this staff work?"
                        persistent-hint
                        v-model="formData.working_days"
                        multiple
                        >
                        <template #selection="{ item }">
                          <v-chip color="red" dark>{{item.value}}</v-chip>
                        </template>
                        </v-select>
                    </div>
                </div>
                </div>
                <!-- Modal footer -->
                <div class="flex px-5 py-4 border-t border-slate-200">
                <small>*indicates required field</small>
                <div class="flex flex-wrap justify-end space-x-2">
                    <button class="btn-sm border-slate-200 hover:border-slate-300 text-slate-600" @click="dialog = false">Cancel</button>
                    <button class="btn-sm bg-orange-600 hover:bg-orange-500 text-white"  @click="addUser">Save</button>
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
    name: "TeamsForm",

    data: () => ({
        dialog: false,
        services: [],
        workingDays: [
          {key: 1, value: 'Monday'}, 
          {key: 2, value: 'Tuesday'}, 
          {key: 3, value: 'Wednesday'}, 
          {key: 4, value: 'Thursday'}, 
          {key: 5, value: 'Friday'}, 
          {key: 6, value: 'Saturday'}, 
          {key: 7, value: 'Sunday'}
        ],
        formData: {
            firstname: '',
            lastname: '',
            email: '',
            phone: '',
            password: '',
            services: [],
            user_type: 3,
            working_days: []
        },
        rules: [
          value => !value || value.size < 2000000 || 'Image size should be less than 2 MB!',
        ],
    }),

    mounted() {
      this.getServices()
    },

    methods: {
      addAsync: async function () {
        try {
          const response = await axios.post(process.env.VUE_APP_API_URL + '/users/staff/add', this.formData, {
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

      loadUsersAsync: async function () {
        await this.$store.dispatch('getStaff')
      },

      async addUser() {
        //todo: validate form

        //dispatch actions
        await this.addAsync();

        await this.loadUsersAsync();

        //reset form
        this.formData = {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            phone: '',
            services: [],
            user_type: 3,
            working_days: []
        }

        //close modal
        this.dialog = false
        },

        async getServices() {
            const response = await axios.get(process.env.VUE_APP_API_URL + '/services/all', {
                  headers: {
                      "Content-Type": "multipart/form-data",
                      // "Authorization": `Bearer ${token}`,
                  }
              })
            this.services = response.data
        },
    },


}
</script>

<style>

</style>