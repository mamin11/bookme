<template>
    <div class="bg-white shadow-lg rounded-sm border border-gray-200 relative">
    <header class="px-5 py-4">
        <h2 class="font-semibold text-gray-800">All Services <span class="text-gray-400 font-medium">{{services.length}}</span></h2>
    </header>
    <div>

        <!-- Table -->
        <div class="overflow-x-auto">
        <table class="table-auto w-full divide-y divide-gray-200">
            <!-- Table header -->
            <thead class="text-xs font-semibold uppercase text-gray-500 bg-gray-50 border-t border-gray-200">
            <tr>
                <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
                </th>
                <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div class="font-semibold text-left">ID</div>
                </th>
                <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div class="font-semibold text-left">Title</div>
                </th>
                <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div class="font-semibold text-left">Minimum duration</div>
                </th>
                <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div class="font-semibold text-left">Price p/h</div>
                </th>
                <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div class="font-semibold text-left"></div>
                </th>
                <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div class="font-semibold text-left"></div>
                </th>
            </tr>
            </thead>
            <!-- Table body -->
            <ServicesTableItem
            v-for="service in services"
            :key="service.id"
            :service="service"
            v-model="selected"
            :value="service.id"
            @deleteItem="deleteItem(service)"
            @showSnackBar="shownSnackBar"
            />
        </table>

        </div>
    </div>
    </div>
</template>

<script>

import ServicesTableItem from './ServicesTableItem.vue'
import axios from "axios";
import {Messages} from "@/Util/contants";

export default {
    name: 'ServicesTable',
    components: {ServicesTableItem },

    data: () => ({
        selectAll: false,
        selected: [],
        message: '',
        messageType: null,
        shownToast: false,
    }),

  mounted() {
      this.getServices()
  },

  computed: {
    services() {
      return this.$store.state.services
    }
  },

  methods: {
      async deleteItem(service) {
        await this.deleteAsync(service)
        await this.getServices()
        // this.services = this.$store.state.services
        // this.services.splice(this.services.indexOf(service), 1)

        // send delete request to backend
        // remove item from array
        // if error, add back and show snackbar
      },

    async deleteAsync(payload) {
      try {
        const response = await axios.delete(process.env.VUE_APP_API_URL + '/services/delete/'+payload.id, {
          headers: {
            "Content-Type": "application/json",
            // "Authorization": `Bearer ${token}`,
          }
        })

        this.shownSnackBar(response.data, Messages.SUCCESS)
      } catch (error) {
        this.shownSnackBar(error.response.data.error, Messages.ERROR)
      }
    },

      async getServices() {
        await this.$store.dispatch('getServices')
      },

    shownSnackBar(message, messageType) {
      this.$emit('showSnackBar', message, messageType)
    }

    }
}
</script>