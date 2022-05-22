<template>
    <div class="w-full p-5">
        <detail-row :title="'Service'" :value="service" />
        <detail-row :title="'Price'" :value="price" />
        <detail-row :title="'Staff'" :value="staff" />
        <detail-row :title="'Customer'" :value="customer" />
        <detail-row :title="'Date'" :value="date" />
        <detail-row :title="'Start time'" :value="start_time" />
        <detail-row :title="'End time'" :value="end_time" />
        <v-row justify="center" class="p-5 flex flex-col">
            <v-col cols="3" class="mx-auto">
                <v-btn class="mx-auto mb-4" :loading="loading" block rounded dark color="red" @click="submitForm">Submit</v-btn>
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
        }
    },
    computed: {
        // ...mapGetters({
        //     errors: 'getLoginFormErrors',
        // }),
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
                let name = this.$store.state.bookingCreateData.bookingDetails.staff.name
                if (name === undefined) {
                    return 'Not available'
                }
                return name
            }
        },
        customer: {
            get() {
                let customer = this.$store.state.bookingCreateData.customer.full_name
                if(customer === undefined) {
                    return 'Not available'
                }
                return customer
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
        }
    },

    methods: {
        async submitForm() {
            this.loading = true
            // get form data
            // dispatch action
            // clear booking form
            // disable loading
            let bookingFormData = {
                customer_id: this.$store.state.bookingCreateData.customer.id,
                staff_id: this.$store.state.bookingCreateData.bookingDetails.staff.id,
                service_id: this.$store.state.bookingCreateData.bookingDetails.service.id,
                date: this.$store.state.bookingCreateData.bookingDetails.date,
                start_time: this.start_time,
                end_time: this.end_time,
                duration: this.duration
            }

            await this.$store.dispatch('saveBooking', bookingFormData)

            await this.$store.dispatch('restartBooking')

            this.loading = false
            this.$emit('resetFormStep')
        }
    }
}
</script>

<style>

</style>