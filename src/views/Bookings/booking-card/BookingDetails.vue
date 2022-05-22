<template>
    <div>
        <v-col
            class="d-flex"
            cols="12"
        >
            <v-select
            :items="services"
            item-value="item"
            item-text="title"
            item-color="red"
            label="Select service"
            color="orange lighten-1"
            dense
            v-model="booking_service"
            return-object
            ></v-select>
        </v-col>

<!-- TODO: adopt common neat font -->
<!-- TODO: disable taken hours -->
        <v-col
            class="d-flex"
            cols="12"
        >
            <v-select
            :items="staff"
            item-value="id"
            item-color="red"
            label="Select staff"
            color="orange lighten-1"
            dense
            v-model="booking_staff"
            return-object
            >
            <template v-slot:selection="{ item }" class="">
                <span class="text-black" :key="item.id" >{{ item.name }}</span>
            </template>
            <template v-slot:item="{ item }" class="">
                <span class="text-black text-sm" :key="item.id">{{ item.name }}</span>
                <v-spacer></v-spacer>
                <v-avatar size="36"><img :src="item.image" :alt="item.name"></v-avatar>
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
export default {
    data() {
        return {
            date_modal: false,
            time_modal: false,
            date: moment().format("YYYY-MM-DD"),
            currentDate: moment().format("YYYY-MM-DD"),
            availableDates: [],
            blockDays: [1,4, 6],
            services: [
                {
                    id: 1,
                    title: "Wedding",
                    price: 100,
                    duration: 2
                },
                {
                    id: 2,
                    title: "Birthday",
                    price: 150,
                    duration: 1
                },
                {
                    id: 3,
                    title: "Portrait",
                    price: 50,
                    duration: 1
                },
                {
                    id: 4,
                    title: "Engagement",
                    price: 200,
                    duration: 3
                },
                {
                    id: 5,
                    title: "Product",
                    price: 80,
                    duration: 1
                }
            ],
            staff: [
                {
                    id: 1,
                    name: "John Doe",
                    image: "https://cdn.vuetifyjs.com/images/john.jpg"
                },
                {
                    id: 2,
                    name: "Lisa Revy",
                    image: "https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                },
                {
                    id: 3,
                    name: "Allan Smith",
                    image: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                },
                {
                    id: 4,
                    name: "Amin Hussein",
                    image: "https://www.gravatar.com/avatar/b17065ea1655f1e3283aac8d8fc16019?s=48&d=identicon&r=PG"
                }
            ],
            hourFormat: undefined, 
            locale: undefined, 
            workingHours: ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00']
        }
    },

    mounted() {
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
                return this.$store.state.bookingCreateData.bookingDetails.time
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
        }
    }
}
</script>

<style>

</style>