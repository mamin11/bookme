<template>
    <div class="bg-white shadow-lg rounded-sm border border-gray-200 relative">
    <header class="px-5 py-4">
        <h2 class="font-semibold text-gray-800">All Staff <span class="text-gray-400 font-medium">{{staff.length}}</span></h2>
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
                <!-- <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div class="font-semibold text-left">ID</div>
                </th> -->
                <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div class="font-semibold text-left">Name</div>
                </th>
                <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div class="font-semibold text-left">Email</div>
                </th>
                <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div class="font-semibold text-left">Phone</div>
                </th>
                <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div class="font-semibold text-left">Bookings Today</div>
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
            <TeamsTableItem
            v-for="user in staff"
            :key="user.id"
            :user="user"
            v-model="selected"
            :value="user.id"
            @deleteItem="deleteItem(user)"
            @showSnackBar="shownSnackBar"
            />
        </table>

        </div>
    </div>
    </div>
</template>

<script>

import TeamsTableItem from './TeamsTableItem.vue'
import axios from "axios";
import {Messages} from "@/Util/contants";

export default {
    name: 'TeamsTable',
    components: {TeamsTableItem },

    data: () => ({
        selectAll: false,
        selected: [],
        message: '',
        messageType: null,
        shownToast: false,
        staff: []
    }),

  mounted() {
      this.getStaff()
  },

  computed: {
  },

  methods: {
      async deleteItem(user) {
        await this.deleteAsync(user)
        await this.getStaff()
      },

    async deleteAsync(payload) {
      try {
        const response = await axios.delete(process.env.VUE_APP_API_URL + '/users/staff/delete/'+payload.id, {
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

    async getStaff() {
          const response = await axios.get(process.env.VUE_APP_API_URL + '/users/staff', {
              headers: {
                  "Content-Type": "multipart/form-data",
                  // "Authorization": `Bearer ${token}`,
              }
          })

          this.staff = response.data
      },

    shownSnackBar(message, messageType) {
      this.$emit('showSnackBar', message, messageType)
    }

    }
}
</script>