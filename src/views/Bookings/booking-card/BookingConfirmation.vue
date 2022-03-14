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
                // let total = this.$store.state.bookingCreateData.bookingDetails.service.reduce((n, {price}) => n+price, 0) 
                let total = this.$store.state.bookingCreateData.bookingDetails.service.price * this.$store.state.bookingCreateData.bookingDetails.service.duration
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
            get() {
                return this.$store.state.bookingCreateData.bookingDetails.service.duration
            }
        },
        date: {
            get() {
                return this.$store.state.bookingCreateData.bookingDetails.date
            }
        },
        start_time: {
            get() { 
                let start = this.$store.state.bookingCreateData.bookingDetails.time
                return moment(this.date+' '+start).format('HH:mm')
            }
        },
        end_time: {
            get() {
                return moment(this.date+' '+this.start_time).add(this.duration, 'hours').format('HH:mm')
            }
        }
    }
}
</script>

<style>

</style>