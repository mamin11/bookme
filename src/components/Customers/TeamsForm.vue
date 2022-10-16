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
            <span class="text-white xs:block ml-2 text-capitalize">Add Customer</span>
          </v-btn>
        </div>
    </template>

    <v-card color="">
        <v-card-title>
        <span class="headline">Customer Form</span>
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
                    v-model="formData.image"
                    show-size
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
        hasFile: false,
        formData: {
            firstname: '',
            lastname: '',
            email: '',
            phone: '',
            password: '',
            user_type: 2,
            image: null
        },
        rules: [
          value => !value || value.size < 2000000 || 'Image size should be less than 2 MB!',
        ],
    }),

    mounted() {},

    methods: {
      addAsync: async function () {
        try {
            const form = new FormData();
              if (this.formData.image != null) {
                form.append("image", this.formData.image)
              }
              form.append("firstname", this.formData.firstname)
              form.append("lastname", this.formData.lastname)
              form.append("email", this.formData.email)
              form.append("phone", this.formData.phone)
              form.append("password", this.formData.password)
              form.append("userType", this.formData.user_type)
              form.append(
                  "headers", {
                      "Content-Type": "multipart/form-data"
                  }
            )

          const response = await axios.post(process.env.VUE_APP_API_URL + '/users/customers/add', form)

          this.$emit('showSnackBar', response.data.message, Messages.SUCCESS)
        } catch (error) {
          this.$emit('showSnackBar', error.response.data.error, Messages.ERROR)
        }
      },

      loadUsersAsync: async function () {
        await this.$store.dispatch('getCustomers', 0)
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
            user_type: 2,
        }

        //close modal
        this.dialog = false
        }
    },


}
</script>

<style>

</style>