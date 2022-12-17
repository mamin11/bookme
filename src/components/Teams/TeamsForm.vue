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

                    <div class="mb-2">
                      <label class="block text-sm font-medium mb-1" for="firstname">Working Hours <span class="text-gray-500">*</span></label>
                      <v-select
                        :items="['Default', 'Custom']"
                        item-color="red"
                        color="orange lighten-1"
                        dense
                        v-model="formData.working_hours_choice"
                        >
                        </v-select>
                    </div>

                    <div v-if="formData.working_hours_choice === 'Custom'">
                      <div class="mb-2" v-for="(day, index) in formData.working_days" :key="index">
                          <v-combobox
                              v-model="working_hours[day]"
                              :items="businessHours"
                              chips
                              color="orange"
                              clearable
                              :label="getWorkDayName(day) + ': Select start and end time'"
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
                              <!-- <template v-slot:selection="{ attrs, item, select, selected }">
                              <v-chip
                                  v-bind="attrs"
                                  :input-value="selected"
                                  close
                                  color="red"
                                  text-color="white"
                                  @click="select"
                                  @click:close="remove(item)"
                              >
                                  <strong class="text-white font-thin text-sm">{{ item }}</strong>&nbsp;
                              </v-chip>
                              </template> -->
                              <template v-slot:no-data>
                                  <p class="ml-3 mt-3">No data available! Be sure to select working days if not done</p>
                              </template>
                          </v-combobox>
                      </div>
                    </div>

                </div>
                </div>
                <!-- Modal footer -->
                <div class="flex px-5 py-4 border-t border-slate-200">
                <small>*indicates required field</small>
                <div class="flex flex-wrap justify-end space-x-2">
                    <button class="btn-sm border-slate-200 hover:border-slate-300 text-slate-600" @click="dialog = false">Cancel</button>
                    <button class="btn-sm bg-orange-600 hover:bg-orange-500 text-white"  @click="addUser">
                      <custom-spinner v-if="loading" />
                      <span v-else >Save</span>
                    </button>
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
import CustomSpinner from '../Util/CustomSpinner.vue';
// import getConcatedWorkingHours from "@/Util/helpers"

export default {
  components: { CustomSpinner },
    name: "TeamsForm",

    props: ['pageNumber', 'pageSize'],

    data: () => ({
        dialog: false,
        services: [],
        loading: false,
        workingDays: [
          {key: 1, value: 'Monday'}, 
          {key: 2, value: 'Tuesday'}, 
          {key: 3, value: 'Wednesday'}, 
          {key: 4, value: 'Thursday'}, 
          {key: 5, value: 'Friday'}, 
          {key: 6, value: 'Saturday'}, 
          {key: 7, value: 'Sunday'}
        ],
        availableHours: ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'],
        hasFile: false,
        formData: {
            firstname: '',
            lastname: '',
            email: '',
            phone: '',
            password: '',
            services: [],
            user_type: 3,
            working_days: [], // send this as list objects [{1: ['09:00', '17:00']}] before API request
            working_hours_choice: 'Default',
            image: null
        },
        working_hours: [null, null, null, null, null, null, null],
        rules: [
          value => !value || value.size < 2000000 || 'Image size should be less than 2 MB!',
        ],
    }),

    computed: {
      businessHours() {
        // this is the business hours for the tenant
        // business hours for tenants will be stored in DB
        return this.availableHours
      },
    },

    watch: {
      working_hours() {
        // working_hours are initialised as null for the seven days
        // then each day is updated as selected
        // here we loop each day's hours and auto select hours in between start and end for given day
        for (let i = 0; i < this.working_hours.length; i++) { 
          const element = this.working_hours[i];
          if (element !== null) {
              let indexes = element.map(item => {
                  return this.availableHours.indexOf(item)
              }).sort();

              this.working_hours[i] = this.availableHours.slice(indexes[0], indexes[indexes.length-1]+1)
            }

        }
      }
    },

    mounted() {
      this.getServices()
    },

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
              form.append("services", this.formData.services)
              form.append("userType", this.formData.user_type)
              form.append("workingDays", this.formData.working_days)
              form.append("workHoursChoice", this.mapWorkHoursChoice(this.formData.working_hours_choice))
              let staffWorkHours = this.getWorkDayHoursArray(this.working_hours)
              console.log(staffWorkHours);
              for (let i = 0; i < staffWorkHours.length; i++) {
                const element = staffWorkHours[i];
                // form.append("workingHours["+i+"]", JSON.stringify(element))
                form.append("workingHours["+i+"].workDay", element.workDay)
                form.append("workingHours["+i+"].workHours", element.workHours)
              }
              form.append(
                  "headers", {
                      "Content-Type": "multipart/form-data"
                  }
            )

          const response = await axios.post(process.env.VUE_APP_API_URL + '/users/staff/add', form)
          this.loading = true

          this.$emit('showSnackBar', response.data.message, Messages.SUCCESS)
        } catch (error) {
          console.log(error);
          this.$emit('showSnackBar', error.response.data.error, Messages.ERROR)
        }
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

      mapWorkHoursChoice(stringVal) {
        return stringVal === 'Custom' ? 1 : 0
      },

      loadUsersAsync: async function () {
        await this.$store.dispatch('getStaff', {pageNumber: this.pageNumber, pageSize: this.pageSize})
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
        this.working_hours = [null, null, null, null, null, null, null]

        //close modal
        this.dialog = false

        // reset loading
        this.loading = false
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

        getWorkDayName(intValue) {
          return this.workingDays.find(x => x.key === intValue).value
        },

        getEndTime(day) {
          let selectedDay = this.working_hours[day];
          if (selectedDay !== null) {
            return selectedDay[this.working_hours[day].length-1]
          } else {
            return ''
          }
        }
    },


}
</script>

<style>

</style>