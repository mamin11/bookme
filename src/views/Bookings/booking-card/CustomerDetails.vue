<template>
    <div>
        <v-responsive class="overflow-y-auto" max-height="400">
            <v-toolbar dense elevation="0" class="mb-3">
                <v-text-field v-model="search" hide-details color="black" append-icon="mdi-magnify" single-line label="Search customer"></v-text-field>
            </v-toolbar>

            <v-list shaped>
                <v-list-item-group
                v-model="booking_customer"
                >
                
                <template v-for="(customer, i) in searchQuery">
                    <v-list-item
                    v-if="searchQuery != null"
                    :key="`divider-${i}`"
                    :value="searchQuery[i]"
                    active-class="orange--text text--accent-4"
                    >
                        <v-list-item-content>
                        <v-list-item-title 
                        v-text="customer.fullName"></v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-action>
                            <v-list-item-action-text>{{customer.email}}</v-list-item-action-text>
                        </v-list-item-action>
                    </v-list-item>

<!-- this else may not be needed -->
                    <v-list-item
                    v-else
                    :key="customer.id"
                    :value="customer"
                    active-class="orange--text text--accent-4"
                    >
                        <v-list-item-content>
                        <v-list-item-title 
                        v-text="customer.fullName"></v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-action>
                            <v-list-item-action-text>{{customer.email}}</v-list-item-action-text>
                        </v-list-item-action>
                    </v-list-item>
                </template>
                </v-list-item-group>
            </v-list>
        </v-responsive>
    </div>
</template>
<script>
import axios from 'axios'

export default {
    data: () => ({
    customers: [],
    model: ['Customers'],
    search: ''
    }),

    mounted() {
        this.getCustomers()
    },

    computed: {
        searchQuery() {
            return this.customers.filter((item) => {
                return item.fullName.toLowerCase().startsWith(this.search.toLowerCase())
            })
        },
        booking_customer: {
            get() {
                return this.$store.state.bookingCreateData.customer
            },
            set(value) {
                if(value == undefined) {
                    this.$store.commit('SET_CUSTOMER_IN_BOOKING_DETAILS', {})
                } else {
                    this.$store.commit('SET_CUSTOMER_IN_BOOKING_DETAILS', value)
                }
            }
        }
    },
    methods: {
        setSelected(customer) {
            this.booking_customer = customer
        },

        async getCustomers() {
            const response = await axios.get(process.env.VUE_APP_API_URL + '/users/customer', {
                headers: {
                    "Content-Type": "multipart/form-data",
                    // "Authorization": `Bearer ${token}`,
                }
            })

            console.log(response.data);
            this.customers = response.data
        }
    }
}
</script>

<style>

</style>