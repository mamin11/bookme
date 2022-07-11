<template>
    <v-container justify-center>
        <!-- Page header -->
        <div class="sm:flex sm:justify-between sm:items-center mb-8">
            <!-- Left: Title -->
            <div class="mb-4 sm:mb-0">
                <h1 class="text-2xl md:text-3xl text-slate-800 font-bold">Services</h1>
            </div>

            <!-- Right: Actions  -->
            <div class="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                <ServiceForm />
            </div>
        </div>

        <ServicesTable @change-selection="updateSelectedItems($event)" />
    </v-container> 
</template>

<script>
import ServicesTable from '../../components/Services/ServicesTable.vue';
import ServiceForm from '../../components/Services/ServiceForm.vue';
export default {
    components: { ServicesTable, ServiceForm },

    data: () => ({
        selectedItems: [],
    }),

    methods: {
        updateSelectedItems(selected) {
            this.selectedItems = selected
        }
    },
}
</script>

<style>

</style>