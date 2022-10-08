<template>
  <tbody class="text-sm">


  <EditForm v-if="showEdit"
            :show-edit="showEdit"
            :user="user"
            @updateShowEdit="updateShowEdit"
            @showSnackBar="shownSnackBar"
  />

  <!-- Row -->
  <tr>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <div class="flex items-center text-gray-800">
        <div class="w-10 h-10 shrink-0 flex items-center justify-center bg-gray-100 rounded-full mr-2 sm:mr-3">
          <img v-if="user.image !== null" class="ml-1 rounded-full" :src="user.image" width="100" height="100" :alt="user.fullName" />
          <avatar v-else color="red" :fullname="user.fullName" :size=36></avatar>
        </div>
      </div>
    </td>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <div>{{ user.fullName }}</div>
    </td>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <div>{{ user.email }}</div>
    </td>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <div>{{ user.phone }}</div>
    </td>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <div class="text-left font-medium">{{ user.allTimeBookings }}</div>
    </td>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <div class="inline-flex font-medium rounded-full text-center px-2.5 py-0.5">
        <button class="btn border-slate-200 hover:border-slate-300" @click="editItem(user)">
          <svg class="w-4 h-4 fill-current text-slate-500 shrink-0" viewBox="0 0 16 16">
            <path
                d="M11.7.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM4.6 14H2v-2.6l6-6L10.6 8l-6 6zM12 6.6L9.4 4 11 2.4 13.6 5 12 6.6z"/>
          </svg>
        </button>
      </div>
    </td>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <div class="inline-flex font-medium rounded-full text-center px-2.5 py-0.5">
        <button class="btn border-slate-200 hover:border-slate-300" @click="deleteItem(user)">
          <svg class="w-4 h-4 fill-current text-red-500 shrink-0" viewBox="0 0 16 16">
            <path
                d="M5 7h2v6H5V7zm4 0h2v6H9V7zm3-6v2h4v2h-1v10c0 .6-.4 1-1 1H2c-.6 0-1-.4-1-1V5H0V3h4V1c0-.6.4-1 1-1h6c.6 0 1 .4 1 1zM6 2v1h4V2H6zm7 3H3v9h10V5z"/>
          </svg>
        </button>
      </div>
    </td>
  </tr>

  </tbody>
</template>

<script>

import EditForm from "@/components/Teams/EditForm";
import Avatar from 'vue-avatar-component'
export default {
  name: 'TeamssTableItem',
  components: {EditForm, Avatar},
  props: ['user', 'value', 'selected'],

  data: () => ({
    showEdit: false,
    message: '',
    messageType: null,
    shownToast: false,
  }),

  computed: {
    checked() {
      return false
      // return this.selected.includes(this.value)
    },
  },

  methods: {
    check() {
      let updatedSelected = [...this.selected]
      if (this.checked) {
        updatedSelected.splice(updatedSelected.indexOf(this.value), 1)
      } else {
        updatedSelected.push(this.value)
      }
      this.$emit('update:selected', updatedSelected)
    },

    deleteItem(user) {
      this.$emit('deleteItem', user)
    },
    editItem() {
      this.showEdit = true
    },
    updateShowEdit() {
      this.showEdit = !this.showEdit
    },
    shownSnackBar(message, messageType) {
      this.$emit('showSnackBar', message, messageType)
    }
  },

}
</script>