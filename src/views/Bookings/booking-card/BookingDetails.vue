<template>
    <div>
        <v-col
            class="d-flex flex-col"
            cols="12"
        >
        <!-- TODO: [BV-19] create reusable component for service dropdown -->
          <label class="text-sm">Select Service</label>
            <v-select
            :items="services"
            item-value="id"
            item-color="red"
            color="orange lighten-1"
            dense
            v-model="booking_service"
            return-object
            >
            <template v-slot:selection="{ item }" class="">
                <span class="text-black" :key="item.id" >{{ item.title }}</span>
            </template>
            <template v-slot:item="{ item }" class="">
                <span class="text-black text-sm" :key="item.id">{{ item.title }}</span>
                <v-spacer></v-spacer>
                <span class="text-black text-sm">£{{ item.price }}/hr</span>
            </template>
            </v-select>
        </v-col>

<!-- TODO: [BV-18] adopt common neat font -->
        <v-col
            class="d-flex flex-col"
            cols="12"
        >
          <label class="text-sm">Select Photographer</label>
            <v-select
            :items="staff"
            item-value="id"
            item-color="red"
            color="orange lighten-1"
            dense
            v-model="booking_staff"
            return-object
            >
            <template v-slot:selection="{ item }" class="">
                <span class="text-black" :key="item.id" >{{ item.fullName }}</span>
            </template>
            <template v-slot:item="{ item }" class="">
                <span class="text-black text-sm" :key="item.id">{{ item.fullName }}</span>
                <v-spacer></v-spacer>
                <!-- TODO: [BV-47] use initials if not image set -->
                <v-avatar size="36"><img :src="item.image" :alt="item.fullName"></v-avatar>
            </template>
            </v-select>
        </v-col>

        <v-col
            cols="12"
        >
            <v-dialog
            ref="dialog"
            v-model="date_modal"
            width="290px"
            color="red lighten-1"
            >
            <template v-slot:activator="{ on, attrs }">
                <v-text-field
                v-model="booking_date"
                label="Select date"
                append-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
                color="red lighten-1"
                ></v-text-field>
            </template>
            <v-date-picker
                v-model="booking_date"
                scrollable
                :min="currentDate"
                :allowed-dates="allowedDates"
                color="red lighten-1"
                no-title
                @update:picker-date="pickerUpdate($event)"
            >
            </v-date-picker>
            </v-dialog>
        </v-col>

<!-- time picker starts here -->
        <v-col
            cols="12"
            class="border-b-2 border-gray-300 mb-6"
        >
            <v-combobox
                v-model="booking_time"
                :items="available_hours"
                chips
                color="orange"
                clearable
                label="Select start and end time. (You can select multiple)"
                multiple
                append-icon="mdi-clock"
            >
                <template v-slot:selection="{ attrs, item, select, selected }">
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
                </template>
            </v-combobox>
        </v-col>
    </div>
</template>

<script>
import moment from 'moment'
import axios from 'axios'

export default {
    data() {
        return {
            date_modal: false,
            time_modal: false,
            date: moment().format("YYYY-MM-DD"),
            currentDate: moment().format("YYYY-MM-DD"),
            availableDates: [],
            blockDays: [1,4, 6],
            staff: [],
            hourFormat: undefined, 
            locale: undefined, 
            workingHours: ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00']
        }
    },

    mounted() {
        this.getServices()
        this.getStaff()
    },

    computed: {
        booking_service: {
            get() {
                return this.$store.state.bookingCreateData.bookingDetails.service
            },
            set(value) {
                this.$store.commit('SET_SERVICE_IN_BOOKING_DETAILS', value)
            }
        },
        booking_staff: {
            get() {
                return this.$store.state.bookingCreateData.bookingDetails.staff
            },
            set(value) {
                this.$store.commit('SET_STAFF_IN_BOOKING_DETAILS', value)
            }
        },
        booking_date: {
            get() {
                return this.$store.state.bookingCreateData.bookingDetails.date
            },
            set(value) {
                this.$store.commit('SET_DATE_IN_BOOKING_DETAILS', value)
            }
        },
        booking_time: {
            get() {
                let time_in_store = this.$store.state.bookingCreateData.bookingDetails.time

                // map to get list of indexes for the 
                // selected slots in arr of available times
                let indexes = time_in_store.map(item => {
                    return this.available_hours.indexOf(item)
                }).sort()

                // use list of indexes to get all selected items
                // ie the ones in between first and last selected slots
                // arr.length+1 at end here is because slice doesn't return 
                // last item inclusive
                let auto_select = this.available_hours.slice(indexes[0], indexes[indexes.length-1]+1)
                this.$store.commit('SET_TIME_IN_BOOKING_DETAILS', auto_select)

                return auto_select
            },
            set(value) {
                this.$store.commit('SET_TIME_IN_BOOKING_DETAILS', value)
            }
        },
        booking_duration: {
            get() {
                return this.$store.state.bookingCreateData.bookingDetails.service.duration
            },
            set(value) {
                this.$store.commit('SET_DURATION_IN_BOOKING_DETAILS', value)
            }
        },
        booked_hours: {
            get() {
                // list of start and end times for bookings of the day 
                let day_booked = [
                    {start: '13:00', end: '14:00'}, 
                    {start: '15:00', end: '16:00'}
                ]
                // ['13:00 - 14:00', '15:00 - 16:00']
                let day_booked_concat = day_booked.map(item => {
                    return item.start+' - '+item.end
                })

                return day_booked_concat
            }
        },
        available_hours: {
            get() {
                // create available_hours from working hours ['12:00 - 13:00', '13:00 - 14:00', '15:00 - 16:00', '16:00 - 17:00']
                let working_hours_concat = this.getConcatedWorkingHours(this.workingHours);
                // get booked_hours = this.booked_hours (['13:00 - 14:00', '15:00 - 16:00'])
                // get difference
                return working_hours_concat.filter(arr => !this.booked_hours.includes(arr))
            }
        },
        services() {
          return  this.$store.state.services
        }
    },

    methods: {
        allowedDates(a) {
            return this.availableDates.includes(a);
        },
    
        pickerUpdate: function(val) {
        let totalDay = moment(val, "YYYY-MM").daysInMonth()
        
        let availableDates = []
            
        let monthNow = moment().format('M')
        let monthSelected = moment(val).format('M')
        let day

        if(monthNow == monthSelected)
            day = moment().format('D')
        else
            day = 1
        
        for (let i = day; i <= totalDay ; i++) {
            let date = moment().month(val.split('-')[1]-1).date(i).format("YYYY-MM-DD")
            if (!this.blockDays.includes(moment(date).day()))
            if (moment(date).day() !== 0 && moment(date).day() !== 6)
                availableDates.push(date)
        }
        this.availableDates = availableDates;
        this.allowedDates();
        },

        disabledH() {
            let intArray = [12, 13, 15]
            return intArray
        },
        disabledM() {
            return [45, 30]
        },
        remove (item) {
            this.chips.splice(this.chips.indexOf(item), 1)
            this.chips = [...this.chips]
        },
        getConcatedWorkingHours(working_hours) {
            let arr = []
            for (let i = 0; i < working_hours.length - 1; i++) {
                const concat = working_hours[i] + ' - '+ working_hours[i+1];
                arr.push(concat)
            }
            return arr
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

        async getServices() {
          await this.$store.dispatch('getServices')
        },
    }
}
</script>

<style>

</style>