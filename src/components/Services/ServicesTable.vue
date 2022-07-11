<template>
    <div class="bg-white shadow-lg rounded-sm border border-gray-200 relative">
    <header class="px-5 py-4">
        <h2 class="font-semibold text-gray-800">All Services <span class="text-gray-400 font-medium">{{services.length}}</span></h2>
    </header>
    <div>

        <!-- Table -->
        <div class="overflow-x-auto">
        <table class="table-auto w-full divide-y divide-gray-200">
            <!-- Table header -->
            <thead class="text-xs font-semibold uppercase text-gray-500 bg-gray-50 border-t border-gray-200">
            <tr>
                <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
                <div class="flex items-center">
                    <label class="inline-flex">
                    <span class="sr-only">Select all</span>
                    <input class="form-checkbox" type="checkbox" v-model="selectAll" @click="checkAll" />
                    </label>
                </div>
                </th>
                <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div class="font-semibold text-left">ID</div>
                </th>
                <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div class="font-semibold text-left">Title</div>
                </th>
                <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div class="font-semibold text-left">Minimum duration</div>
                </th>
                <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div class="font-semibold text-left">Price p/h</div>
                </th>
                <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div class="font-semibold text-left"></div>
                </th>
                <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div class="font-semibold text-left"></div>
                </th>
            </tr>
            </thead>
            <!-- Table body -->
            <ServicesTableItem
            v-for="service in services"
            :key="service.id"
            :service="service"
            v-model="selected"
            :value="service.id"
            />
        </table>

        </div>
    </div>
    </div>
</template>

<script>
// import { ref, watch } from 'vue'
import ServicesTableItem from './ServicesTableItem.vue'

export default {
    name: 'OrdersTable',
    components: { ServicesTableItem },  

    props: ['selectedItems'],

    data: () => ({
        selectAll: false,
        selected: [],
        services: [
            {
            id: '0',
            title: 'New born shoot',
            duration: '1',
            price: '$129.00',
            status: 1
        },
        {
            id: '1',
            title: 'Product photography',
            duration: '3',
            price: '$89.00',
            status: 1
        },
        {
            id: '2',
            title: 'Portraits',
            duration: '1',
            price: '$89.00',
            status: 1
        },
        {
            id: '3',
            title: 'Wedding photoshoot',
            duration: '4',
            price: '$59.00',
            status: 0
        },
        {
            id: '4',
            title: 'Event photography',
            duration: '3',
            price: '$39.00',
            status: 0
        },
        {
            id: '5',
            title: 'Real estate photography',
            duration: '4',
            price: '$59.00',
            status: 1
        }
        ]
    }),

    methods: {
        checkAll() {
            this.selected = []
            if (!this.selectAll) {
                this.selected = this.services.map(service => service.id)
            }
        }
    },

    watch: {
        selected() {
            this.selectAll = this.services.length === this.selected.length ? true : false
            this.$emit('change-selection', this.selected)
        }
    },
}
</script>