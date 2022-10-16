<template>
  <div class="flex h-screen overflow-hidden">
  <sidebar :sidebarOpen="sidebarOpen" @toggle-sidebar="sidebarOpen = !sidebarOpen"></sidebar>
    <div class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
      <Header :sidebarOpen="sidebarOpen" @toggle-sidebar="sidebarOpen = !sidebarOpen" />

      <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
        <!-- Page header -->
        <div class="flex justify-between items-center px-4 mb-8">
            <!-- Left: Title -->
            <div class="mb-4 sm:mb-0">
                <h1 class="text-2xl md:text-3xl text-slate-800 font-bold">Your Team</h1>
            </div>

            <!-- Right: Actions  -->
            <div class="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-8">
              <div v-if="maxPageSize > 1" class="flex flex-row justify-center align-middle">
                <label class="my-auto mx-4">Page {{ pageNumber }} of {{ maxPageSize - 1 }}</label>
                <v-select
                  class="my-auto w-20"
                  color="red"
                  :items="pageNumArray"
                  :menu-props="{ bottom: true, offsetY: true }"
                  hide-details
                  label="Select Page"
                  solo
                  dense
                  item-color="red"
                  v-model="pageNumber"

                ></v-select>
              </div>

              <div class="flex flex-row justify-center align-middle">
                <v-text-field
                  prepend-inner-icon="mdi-magnify"
                  class="my-auto"
                  label="Search user by name"
                  placeholder="at least 2 letters"
                  solo
                  dense
                  background-color="white"
                  color="red"
                  hide-details
                  v-model="search"
                ></v-text-field>
              </div>

              <TeamsForm @showSnackBar="shownSnackBar" class="my-auto align-middle" />
            </div>
        </div>

        <TeamsTable @showSnackBar="shownSnackBar" :pageNumber="pageNumber" />
      </div>

      <snack-bar
          :snackbar="shownToast"
          :text="message"
          :message-type="messageType"
          @updateSnackbar="updateSnackbar"
      />

    </div> 
  </div>
</template>

<script>
  import TeamsTable from '../../components/Teams/TeamsTable.vue';
import TeamsForm from '../../components/Teams/TeamsForm.vue';
import SnackBar from "@/components/Booking/BookingCard/BookingConfimation/SnackBar";
import Sidebar from '../../components/App/Sidebar.vue';
import Header from '../../components/App/Header.vue';
import axios from "axios";

export default {
    components: { SnackBar, TeamsTable, TeamsForm, Sidebar, Header },

    data: () => ({
      editingUser: {},
      message: '',
      messageType: null,
      shownToast: false,
      sidebarOpen: false,
      pageNumber: 0,
      search: null,
      maxPageSize: null
    }),

    mounted() {
      this.getMaxPageSize()
    },

    computed: {
      pageNumArray() {
        return [...Array(this.maxPageSize).keys()]
      }
    },

    watch: {
      search(newVal) {
        if (newVal !== null && newVal.length >= 2) {
          this.pageNumber = null
          this.$store.dispatch('searchStaff', newVal)
        }
      },
      pageNumber() {
        this.search = null
      }
    },

    methods: {
      shownSnackBar(message, messageType) {
        this.shownToast = true
        this.message = message
        this.messageType = messageType
      },

      updateSnackbar(status) {
        this.shownToast = status
      },
      async getMaxPageSize() {
        const response = await axios.get(process.env.VUE_APP_API_URL + '/users/staff/page-size', {headers: {"Content-Type": "multipart/form-data"}})
        this.maxPageSize = response.data
      },

    }
}
</script>

<style>
</style>