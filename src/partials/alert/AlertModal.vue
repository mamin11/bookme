<template>
<v-row justify="center">
    <v-dialog
    v-model="dialog"
    persistent
    max-width="350"
    >
    <!-- <template v-slot:activator="{ on, attrs }">
        <v-btn
        color="primary"
        dark
        v-bind="attrs"
        v-on="on"
        >
        Open Dialog
        </v-btn>
    </template> -->
    <v-card>
        <v-card-title class="text-h5">
        Confirmation
        </v-card-title>
        <v-card-text>Deleting this will also delete any data linked to this user such as timeslots, bookings, etc</v-card-text>
        <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            color="darken-1"
            text
            @click="cancelDelete"
        >
            Cancel
        </v-btn>
        <v-btn
            color="red darken-1"
            text
            @click="confirmDelete"
        >
            Continue
        </v-btn>
        </v-card-actions>
    </v-card>
    </v-dialog>
</v-row>
</template>

<script>
export default {
    props: ['dialog'],
    data () {
    return {
        // dialog: false,
    }
    },

    methods: {
        confirmDelete(){
            this.$emit('confirmDelete')
        },
        cancelDelete() {
            this.$emit('cancelDelete')
        }
    }
}
</script>