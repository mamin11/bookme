<template>
    <div>
        <v-responsive class="overflow-y-auto" max-height="400">
            <v-toolbar dense elevation="0" class="mb-3">
                <v-text-field v-model="search" hide-details color="black" append-icon="mdi-magnify" single-line label="Search customer"></v-text-field>
            </v-toolbar>

            <v-list shaped>
                <v-list-item-group
                >
                
                <template v-for="(customer, i) in searchQuery">
                    <v-list-item
                    v-if="searchQuery != null"
                    :key="`divider-${i}`"
                    :value="searchQuery.full_name"
                    active-class="orange--text text--accent-4"
                    @click="setSelected(customer)" 
                    >
                        <v-list-item-content>
                        <v-list-item-title 
                        v-text="customer.full_name"></v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-action>
                            <v-list-item-action-text>{{customer.email}}</v-list-item-action-text>
                        </v-list-item-action>
                    </v-list-item>

                    <v-list-item
                    v-else
                    :key="customer.id"
                    :value="customer.full_name"
                    active-class="orange--text text--accent-4"
                    @click="setSelected(customer)" 
                    >
                        <v-list-item-content>
                        <v-list-item-title 
                        v-text="customer.full_name"></v-list-item-title>
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
export default {
    data: () => ({
    customers: [
        {
            id: 1,
            full_name: "Allan Smith",
            email: "allansm@email.test"
        },
        {
            id: 2,
            full_name: "Lee Dixon",
            email: "mrlee@email.test"
        },
        {
            id: 3,
            full_name: "Diego Enrique",
            email: "denriqu1@email.test"
        },
        {
            id: 4,
            full_name: "Amin Abdi",
            email: "amadbi@email.test"
        }
    ],
    model: ['Customers'],
    selected: null,
    search: ''
    }),
    computed: {
        searchQuery() {
            return this.customers.filter((item) => {
                return item.full_name.toLowerCase().startsWith(this.search.toLowerCase())
            })
        }
    },
    methods: {
        setSelected(customer) {
            this.selected = customer
        }
    }
}
</script>

<style>

</style>