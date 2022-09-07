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
            <div class="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                <TeamsForm @showSnackBar="shownSnackBar" />
            </div>
        </div>

        <TeamsTable @showSnackBar="shownSnackBar" />
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

export default {
    components: { SnackBar, TeamsTable, TeamsForm, Sidebar, Header },

    data: () => ({
      editingUser: {},
      message: '',
      messageType: null,
      shownToast: false,
      sidebarOpen: false
    }),

    methods: {
      shownSnackBar(message, messageType) {
        this.shownToast = true
        this.message = message
        this.messageType = messageType
      },

      updateSnackbar(status) {
        this.shownToast = status
      }
    },
}
</script>

<style>

</style>