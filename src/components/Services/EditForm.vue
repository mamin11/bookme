<template>
  <v-row justify="center">
    <v-dialog
        v-model="showEdit"
        persistent
        max-width="600px"
    >
      <v-card color="">
        <v-card-title>
          <span class="headline">Edit Service</span>
        </v-card-title>
        <v-card-text>
          <v-container fluid>
            <!-- <v-row> -->
            <!-- Modal content -->
            <div class="">
              <div class="space-y-3">
                <div>
                  <label class="block text-sm font-medium mb-1" for="name">Title <span class="text-gray-500">*</span></label>
                  <input v-model="service.title" id="name" class="shadow border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" required />
                </div>
                <div>
                  <label class="block text-sm font-medium mb-1" for="email">Minimum duration <span class="text-gray-500">*</span></label>
                  <input v-model="service.duration" id="duration" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" required />
                </div>
                <div>
                  <label class="block text-sm font-medium mb-1" for="email">Price (p/h) <span class="text-gray-500">*</span></label>
                  <input v-model="service.price" id="price" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" required />
                </div>
              </div>
            </div>
            <!-- Modal footer -->
            <div class="flex px-5 py-4 border-t border-slate-200">
              <small>*indicates required field</small>
              <div class="flex flex-wrap justify-end space-x-2">
                <button class="btn-sm border-slate-200 hover:border-slate-300 text-slate-600" @click="cancel">Cancel</button>
                <button class="btn-sm bg-orange-600 hover:bg-orange-500 text-white"  @click="editService(service)">Save</button>
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
  name: "EditForm",

  props: ['service', 'showEdit'],

  data: () => ({
    message: '',
  }),

  mounted() {
  },

  methods: {
    cancel() {
      this.$emit('updateShowEdit')
    },

    async editService(payload) {
      try {
        const response = await axios.put(process.env.VUE_APP_API_URL + '/services/edit/'+payload.id, payload, {
          headers: {
            // "Content-Type": "multipart/form-data",
            "Content-Type": "application/json",
            // "Authorization": `Bearer ${token}`,
          }
        })

        this.$emit('updateShowEdit')
        this.$emit('showSnackBar', response.data.message, Messages.SUCCESS)
      } catch (error) {
        this.$emit('showSnackBar', error.response.data.error, Messages.ERROR)
      }
    }
  },

  watch: {
  }

}
</script>

<style>

</style>