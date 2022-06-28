<template>
    <div class="w-full p-5">
        <detail-row :title="'Service'" :value="service" />
        <detail-row :title="'Price'" :value="price" />
        <detail-row :title="'Staff'" :value="staff" />
        <detail-row :title="'Customer'" :value="customer" />
        <detail-row :title="'Date'" :value="date" />
        <detail-row :title="'Start time'" :value="start_time" />
        <detail-row :title="'End time'" :value="end_time" />
        <v-row justify="center" class="p-5 flex flex-row">
            <v-col cols="6" justify-center class="mx-auto justify-center text-center">
                <v-checkbox v-model="notifyCustomer" :value="notifyCustomer" light label="Notify customer" color="orange"></v-checkbox>
            </v-col>
            <v-col cols="6" class="mx-auto my-3">
                <v-btn class="mx-auto mb-4" :loading="loading" block :disabled="disabled" rounded large color="red" @click="submitForm">
                    <span :class="disabled ? 'text-gray-500' : 'text-white'">Submit</span>
                </v-btn>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import DetailRow from '../../../components/Booking/BookingCard/BookingConfimation/DetailRow.vue'
// import moment from 'moment'
// import { mapGetters } from 'vuex'
export default {
  components: { DetailRow },
    data() {
        return {
            loading: false,
            disabled: true
        }
    },

    updated() {
        this.disabled = this.$store.state.bookingCreateData.disabled
        // console.log('updated confirmation comp');
    },

    computed: {
        service: {
            get() {
                let title = this.$store.state.bookingCreateData.bookingDetails.service.title
                if(title === undefined) {
                    return 'Not available'
                }
                return title
            },
        },
        price: {
            get() {
                let total = this.$store.state.bookingCreateData.bookingDetails.service.price * this.duration
                if (isNaN(total)) {
                    return 'Not available'
                }
                return '£'+total.toString()
            }
        },
        staff: {
            get() {
                let name = this.$store.state.bookingCreateData.bookingDetails.staff.fullName
                if (name === undefined) {
                    return 'Not available'
                }
                return name
            }
        },
        customer: {
            get() {
                let customer = this.$store.state.bookingCreateData.customer
                if(customer !== undefined || customer !== null) {
                    let customerName = this.$store.state.bookingCreateData.customer.fullName
                    return customerName
                }
                return 'Not available'
            }
        },
        notifyCustomer: {
            get() {
                return this.$store.state.bookingCreateData.bookingDetails.notifyCustomer
            },
            set(value) {
                this.$store.commit('SET_NOTIFY_CUSTOMER_IN_BOOKING_DETAILS', value)
            }
        },
        duration: {
            // difference between min and max
            get() {
                if (this.end_time === '' || this.start_time.length === '') {
                    return  ''
                }
                // return moment(this.date+' '+this.end_time).format('HH') - moment(this.date+' '+this.start_time).format('HH')
                return this.$store.state.bookingCreateData.bookingDetails.time.length
            }
        },
        date: {
            get() {
                return this.$store.state.bookingCreateData.bookingDetails.date
            }
        },
        start_time: {
            // min in array
            get() { 
                let time = this.$store.state.bookingCreateData.bookingDetails.time
                if (time === undefined || time.length == 0) {
                    return ''
                }
                return time.reduce(function(a, b) { return a <= b? a : b;}).split(' - ')[0];
            }
        },
        end_time: {
            // max in array
            get() {
                let time = this.$store.state.bookingCreateData.bookingDetails.time
                if (time === undefined || time.length == 0) {
                    return ''
                }
                return time.reduce(function(a, b) { return a <= b? b : a;}).split(' - ')[1];
            }
        },
        bookingFormData: {
            get() {
                return {
                    customer_email: this.$store.state.bookingCreateData.customer.email,
                    staff_email:  this.$store.state.bookingCreateData.bookingDetails.staff.email,
                    service_id: this.$store.state.bookingCreateData.bookingDetails.service.id,
                    booking_date: this.$store.state.bookingCreateData.bookingDetails.date,
                    booking_slots: this.$store.state.bookingCreateData.bookingDetails.time,
                    // duration: this.duration,
                    notify_customer: this.notifyCustomer
                }
            }
        },
    },

    methods: {
        async submitForm() {
            this.loading = true
            // get form data
            // dispatch action
            // clear booking form
            // disable loading
            

            await this.$store.dispatch('saveBooking', this.bookingFormData)

            await this.$store.dispatch('restartBooking')

            this.loading = false
            this.$emit('resetFormStep')
        },
    }
}
</script>

<style>

</style>