<template>
  <v-row justify="center">
    <v-dialog
        v-model="showEdit"
        persistent
        max-width="600px"
    >
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
                            <input v-model="userData.firstname" id="firstname" class="shadow border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" required />
                        </div>
                        <div class="mb-2">
                            <label class="block text-sm font-medium mb-1" for="lastname">Lastname <span class="text-gray-500">*</span></label>
                            <input v-model="userData.lastname" id="lastname" class="shadow border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" required />
                        </div>
                        <div class="mb-2">
                            <label class="block text-sm font-medium mb-1" for="email">Email <span class="text-gray-500">*</span></label>
                            <input v-model="userData.email" readonly id="email" class="shadow border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="email" required />
                        </div>
                        <div class="mb-2">
                            <label class="block text-sm font-medium mb-1" for="email">Phone Number <span class="text-gray-500">*</span></label>
                            <input v-model="userData.phone" id="phone" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" required />
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
                            v-model="userData.services"
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
                            v-model="userData.working_days"
                            multiple
                            return-object
                            >
                            <template #selection="{ item }">
                              <v-chip color="red" dark>{{item.value}}</v-chip>
                            </template>
                            </v-select>
                        </div>

                        <div class="mb-2">
                      <label class="block text-sm font-medium mb-1" for="firstname">Working Hours <span class="text-gray-500">*</span></label>
                      <v-select
                        :items="['Default', 'Custom']"
                        item-color="red"
                        color="orange lighten-1"
                        dense
                        v-model="userData.working_hours_choice"
                        >
                        </v-select>
                    </div>

                    <div v-if="userData.working_hours_choice === 'Custom'">
                      <div class="mb-2" v-for="(day, index) in userData.working_days" :key="index">
                          <v-combobox
                              v-model="working_hours[day.key]"
                              :items="businessHours"
                              chips
                              color="orange"
                              clearable
                              :label="day.value + ': Select start and end time'"
                              multiple
                              append-icon="mdi-clock"
                          >
                          <template v-slot:selection="{ item, index }">
                              <v-chip
                                  v-if="index === 0"
                                  color="red"
                                  text-color="white"
                              >
                                  <strong class="text-white font-thin text-sm">{{ item + ' - ' + getEndTime(day) }}</strong>&nbsp;
                              </v-chip>
                              </template>
                              <template v-slot:no-data>
                                  <p class="ml-3 mt-3">No data available! Be sure to select working days if not done</p>
                              </template>
                          </v-combobox>
                      </div>
                    </div>
                    <div v-else><v-alert >Default working hours will applied</v-alert></div>

                    </div>
                    </div>
                    <!-- Modal footer -->
                    <div class="flex px-5 py-4 border-t border-slate-200">
                    <small>*indicates required field</small>
                    <div class="flex flex-wrap justify-end space-x-2">
                        <button class="btn-sm border-slate-200 hover:border-slate-300 text-slate-600" @click="cancel">Cancel</button>
                        <button class="btn-sm bg-orange-600 hover:bg-orange-500 text-white"  @click="editUser(userData)">Save</button>
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

  props: ['user', 'pageNumber', 'pageSize', 'showEdit'],

  components: {Avatar},

  data: () => ({
    message: '',
    services: [],
    availableHours: ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'], // this should come from backend
    working_hours: [null, null, null, null, null, null, null],
    workingDays: [
          {key: 1, value: 'Monday'}, 
          {key: 2, value: 'Tuesday'}, 
          {key: 3, value: 'Wednesday'}, 
          {key: 4, value: 'Thursday'}, 
          {key: 5, value: 'Friday'}, 
          {key: 6, value: 'Saturday'}, 
          {key: 7, value: 'Sunday'}
    ],
    image: null,
    userData: {
      firstname: null,
      lastname: null,
      fullName: null,
      email: null,
      phone: null,
      user_type: 3,
      image: null,
      services: null,
      working_days: null,
      working_hours_choice: null
    }
  }),

  mounted() {
      this.getServices()
      this.mapWorkingHours(this.user.workingHours)
      this.mapUserDataLocally()
  },

  watch: {
    image(newVal) {
      if (newVal !== null) {
        this.userData.image = null
      }
    },

    working_hours() {
        // working_hours are initialised as null for the seven days
        // then each day is updated as selected
        // here we loop each day's hours and auto select hours in between start and end for given day
        this.autoFillWorkingHours()
    }
  },

  computed: {
    userMapped() {
      return {
            firstname: this.user.firstname,
            lastname: this.user.lastname,
            fullName: this.user.firstname + ' ' + this.user.lastname,
            email: this.user.email,
            phone: this.user.phone,
            user_type: 3,
            image: this.user.image,
            services: this.mapUserServices(this.user.services),
            working_days: this.mapUserWorkDays(this.user.working_days)
          }
    }, 

    businessHours() {
        // this is the business hours for the tenant
        // business hours for tenants will be stored in DB
        return this.availableHours
    },
  },

  methods: {
    cancel() {
      this.$emit('updateShowEdit')
    },

    mapUserServices(items) {
      return this.services.filter(item => items.includes(item.id))
    },

    mapUserWorkDays(items) {
      return this.workingDays.filter(item => items.includes(item.key))
    },

    mapWorkingHours(items) {
      let workHours = this.working_hours
      // items is array of objects [{workDay: 1, workHours: ["10:00", "12:00"]}] - workHours has start and end time
      for (let n = 0; n < items.length; n++) {
        const dbWorkHours = items[n];
        workHours[dbWorkHours.workDay] = dbWorkHours.workHours
      }
      this.working_hours = workHours
      this.autoFillWorkingHours()
    },

    mapWorkHoursChoice(stringVal) {
      return stringVal === 'Custom' ? 1 : 0
    },

    reverseMapWorkHoursChoice(intVal) {
      return intVal === 1 ? 'Custom' : 'Default'
    },

    autoFillWorkingHours() {
      for (let i = 0; i < this.working_hours.length; i++) { 
          const element = this.working_hours[i];
          if (element !== null) {
              let indexes = element.map(item => {
                  return this.availableHours.indexOf(item)
              }).sort();

              this.working_hours[i] = this.availableHours.slice(indexes[0], indexes[indexes.length-1]+1)
          }

      }
    },

    getEndTime(day) {
      let selectedDay = this.working_hours[day.key];
      if (selectedDay !== null) {
        return selectedDay[this.working_hours[day.key].length-1]
      } else {
        return ''
      }
    },

    mapUserDataLocally() {
      // map the prop to component's local object
      this.userData.firstname = this.user.firstname
      this.userData.lastname = this.user.lastname
      this.userData.fullName = this.user.firstname + ' ' + this.user.lastname
      this.userData.email = this.user.email
      this.userData.phone = this.user.phone
      this.userData.user_type = 3
      this.userData.image = this.user.image
      this.userData.services = this.mapUserServices(this.user.services)
      this.userData.working_days = this.mapUserWorkDays(this.user.working_days)
      this.userData.working_hours_choice = this.user.workingHoursChoice !== null ? this.reverseMapWorkHoursChoice(this.user.workingHoursChoice)  : 'Default'
    },

    async editUser(payload) {
      // services[] initially has objects, they become array of int if dropdown selection changes
      // extract only ids
      if(payload.services.length > 0) {
        if (Object.keys(...payload.services).includes('title')) {
          payload.services = payload.services.map(item => item.id)
        }
      } else {
        payload.services = this.user.services
      }
      
      if (payload.working_days.length > 0) {
        // same for work days
        if (Object.keys(...payload.working_days).includes('value')) {
          payload.working_days = payload.working_days.map(item => item.key)
        }
        // console.log('payload: '+JSON.stringify(payload));
      } else {
        payload.working_days = this.user.working_days
      }

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
        form.append("services", payload.services)
        form.append("userType", payload.user_type)
        form.append("workingDays", payload.working_days)
        form.append("workHoursChoice", this.mapWorkHoursChoice(this.userData.working_hours_choice))
        let staffWorkHours = this.getWorkDayHoursArray(this.working_hours)
        for (let i = 0; i < staffWorkHours.length; i++) {
          const element = staffWorkHours[i];
          form.append("workingHours["+i+"].workDay", element.workDay)
          form.append("workingHours["+i+"].workHours", element.workHours)
        }
        form.append("headers", {"Content-Type": "multipart/form-data"})

        const response = await axios.put(process.env.VUE_APP_API_URL + '/users/staff/edit/'+this.user.id, form)

        this.$emit('updateShowEdit')
        await this.$store.dispatch('getStaff', {pageNumber: this.pageNumber, pageSize: this.pageSize})
        this.$emit('showSnackBar', response.data.message, Messages.SUCCESS)
      } catch (error) {
        this.$emit('showSnackBar', error.response.data.error, Messages.ERROR)
      }
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

    getWorkDayHoursArray(items) {
      let array = []
      for (let i = 0; i < items.length; i++) {
        const values = items[i];
        
        if (values !== null) {
          let obj = {workDay: i, workHours: values}
          array.push(obj)
        }
      }

      return array
    },

  },

}
</script>

<style>

</style>