<template>
    <div class="w-full p-5">
        <detail-row :title="'Service'" :value="details.service" />
        <detail-row :title="'Price'" :value="details.price" />
        <detail-row :title="'Staff'" :value="details.staff" />
        <detail-row :title="'Customer'" :value="details.customer" />
        <detail-row :title="'Date'" :value="details.date" />
        <detail-row :title="'Time'" :value="details.time" />
    </div>
</template>

<script>
import DetailRow from '../../../components/Booking/BookingCard/BookingConfimation/DetailRow.vue'
export default {
  components: { DetailRow },
    data() {
        return {
            details: {
                service : "Wedding",
                price: "£200",
                staff: "John Doe",
                customer: "Risa Levy",
                date: "2022-02-26",
                time: "10:30 AM"
            }
        }
    }
}
</script>

<style>

</style>