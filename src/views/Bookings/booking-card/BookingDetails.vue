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
            class="border-b-2 border-gray-300"
        >
        <v-dialog
            ref="dialog"
            v-model="time_modal"
            width="290px"
            color="red lighten-1"
            >
            <template v-slot:activator="{ on, attrs2 }">
                <v-text-field
                v-model="booking_time"
                label="Select Time"
                append-icon="mdi-clock"
                readonly
                v-bind="attrs2"
                v-on="on"
                color="red lighten-1"
                ></v-text-field>
            </template>
            <v-time-picker
            ampm-in-title
            format="ampm"
            no-title
            v-model="booking_time"
            color="red lighten-1"
            >
            </v-time-picker>
            </v-dialog>
        <!-- <label class="text-gray-500 text-sm">Select time</label><br>
        <input v-model="booking_time" class="w-full outline-none" type="time" /> -->
        </v-col>

        <v-col
            class="d-flex"
            cols="12"
            v-if="booking_service.length !== 0"
        >
                <v-text-field
                label="Select duration (hours)"
                color="orange lighten-1"
                type="number"
                v-model="booking_duration"
                min="1"
                ></v-text-field>
        </v-col>
        <v-col
            class="d-flex"
            cols="12"
            v-else
        >
        </v-col>

<!-- plan to use if multiple services can be selected, each service will have its own duration selector -->
        <!-- <v-expansion-panels >
            <v-expansion-panel
            v-for="(item,i) of booking_service"
            :key="i"
            v-model="booking_service"
            return-object
            >
            <v-expansion-panel-header>{{booking_service[i].title}}</v-expansion-panel-header>
            <v-expansion-panel-content>
            </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels> -->

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
        }
    },

    mounted() {
        // console.log(this.availableDates);
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
        // allowedDates: {
        //     get(value) {
        //         if (moment(value).day() !== 0)
        //         availableDates.push(value)
        //     }
        // }
    },

    methods: {
        allowedDates(a) {
            return this.availableDates.includes(a);
        },
    
        pickerUpdate: function(val) {
        let totalDay = moment(val, "YYYY-MM").daysInMonth()
        // console.log(totalDay)
        
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
        }
    }
}
</script>

<style>

</style>