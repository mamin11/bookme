<template>
    <div class="w-full p-5">
        <detail-row :title="'Service'" :value="service" />
        <detail-row :title="'Price'" :value="price" />
        <detail-row :title="'Staff'" :value="staff" />
        <detail-row :title="'Customer'" :value="customer" />
        <detail-row :title="'Date'" :value="date" />
        <detail-row :title="'Start time'" :value="start_time" />
        <detail-row :title="'End time'" :value="end_time" />
    </div>
</template>

<script>
import DetailRow from '../../../components/Booking/BookingCard/BookingConfimation/DetailRow.vue'
import moment from 'moment'
export default {
  components: { DetailRow },
    data() {
        return {
        }
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
                return total.toString()
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
                return moment(this.date+' '+this.end_time).format('HH') - moment(this.date+' '+this.start_time).format('HH')
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
                return time.reduce(function(a, b) { return a <= b? a : b;});
            }
        },
        end_time: {
            // max in array
            get() {
                let time = this.$store.state.bookingCreateData.bookingDetails.time
                if (time === undefined || time.length == 0) {
                    return ''
                }
                return time.reduce(function(a, b) { return a <= b? b : a;});
            }
        }
    }
}
</script>

<style>

</style>