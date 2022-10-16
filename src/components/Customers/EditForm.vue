<template>
  <v-row justify="center">
    <v-dialog
        v-model="showEdit"
        persistent
        max-width="600px"
    >
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
                        <div class="flex flex-row align-middle">
                          <v-avatar v-if="user.image !== null" class="my-auto">
                            <img class="rounded-md" :src="user.image" :alt="user.fullName" />
                          </v-avatar>
                          <avatar v-else class="my-auto" color="red" :fullname="user.fullName" :size=36></avatar>
                          <v-btn v-if="user.image !== null" @click="user.image = null" depressed color="white" class=""><v-icon>mdi-delete</v-icon></v-btn>

                          <v-file-input
                          accept="image/png, image/jpeg, image/bmp"
                          placeholder="Select Image"
                          label="Select Image"
                          v-model="image"
                          show-size
                          class="ml-4"
                        ></v-file-input>
                        </div>
                      </div>
                        <div class="mb-2">
                            <label class="block text-sm font-medium mb-1" for="firstname">Firstname <span class="text-gray-500">*</span></label>
                            <input v-model="userMapped.firstname" id="firstname" class="shadow border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" required />
                        </div>
                        <div class="mb-2">
                            <label class="block text-sm font-medium mb-1" for="lastname">Lastname <span class="text-gray-500">*</span></label>
                            <input v-model="userMapped.lastname" id="lastname" class="shadow border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" required />
                        </div>
                        <div class="mb-2">
                            <label class="block text-sm font-medium mb-1" for="email">Email <span class="text-gray-500">*</span></label>
                            <input v-model="userMapped.email" readonly id="email" class="shadow border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="email" required />
                        </div>
                        <div class="mb-2">
                            <label class="block text-sm font-medium mb-1" for="email">Phone Number <span class="text-gray-500">*</span></label>
                            <input v-model="userMapped.phone" id="phone" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" required />
                        </div>
                    </div>
                    </div>
                    <!-- Modal footer -->
                    <div class="flex px-5 py-4 border-t border-slate-200">
                    <small>*indicates required field</small>
                    <div class="flex flex-wrap justify-end space-x-2">
                        <button class="btn-sm border-slate-200 hover:border-slate-300 text-slate-600" @click="cancel">Cancel</button>
                        <button class="btn-sm bg-orange-600 hover:bg-orange-500 text-white"  @click="editUser(userMapped)">Save</button>
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
import Avatar from 'vue-avatar-component'

export default {
  name: "EditForm",

  components: {Avatar},

  props: ['user', 'showEdit'],

  data: () => ({
    message: '',
    image: null,
  }),

  mounted() {},

  computed: {
    userMapped() {
      return {
            firstname: this.user.firstname,
            lastname: this.user.lastname,
            email: this.user.email,
            phone: this.user.phone,
            user_type: 2,
            image: this.user.image,
      }
    }
  },

  watch: {
    image(newVal) {
      if (newVal !== null) {
        this.user.image = null
      }
    }
  },

  methods: {
    cancel() {
      this.$emit('updateShowEdit')
    },

    async editUser(payload) {
      try {
        const form = new FormData();
        if (this.image != null) {
          form.append("image", this.image)
        }
        form.append("firstname", payload.firstname)
        form.append("lastname", payload.lastname)
        form.append("email", payload.email)
        form.append("phone", payload.phone)
        form.append("password", payload.password)
        form.append("userType", payload.user_type)
        form.append("headers", {"Content-Type": "multipart/form-data"})

        const response = await axios.put(process.env.VUE_APP_API_URL + '/users/customers/edit/'+this.user.id, form)

        this.$emit('updateShowEdit')
        await this.$store.dispatch('getCustomers', 0)
        this.$emit('showSnackBar', response.data.message, Messages.SUCCESS)
      } catch (error) {
        this.$emit('showSnackBar', error.response.data.error, Messages.ERROR)
      }
    }
  },

}
</script>

<style>

</style>