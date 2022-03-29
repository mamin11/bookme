<template>
<div>


            <!-- <b-field label="Start time" custom-class="is-small has-text-weight-light">
                <b-timepicker
                    v-model="booking_time"
                    rounded
                    placeholder="Click to select..."
                    icon="clock"
                    :enable-seconds="false"
                    :hour-format="hourFormat"
                    :locale="locale"
                    position="is-top-right"
                    
                    >
                </b-timepicker>
            </b-field> -->

            <!-- <label class="text-gray-500 text-sm">Select time</label><br>
        <input v-model="booking_time" class="w-full outline-none" type="time" /> -->


<!-- time picker starts here -->
        <v-col
            cols="12"
            class="border-b-2 border-gray-300"
        >
        <v-dialog
            ref="dialog"
            v-model="time_modal"
            width="290px"
            color="red lighten-1"
            >
            <template v-slot:activator="{ on, attrs2 }">
                <v-text-field
                v-model="booking_time"
                label="Select Time"
                append-icon="mdi-clock"
                readonly
                v-bind="attrs2"
                v-on="on"
                color="red lighten-1"
                ></v-text-field>
            </template>
            <v-time-picker
            ampm-in-title
            format="ampm"
            no-title
            v-model="booking_time"
            >
                <v-spacer></v-spacer>
                <v-btn
                text
                color="red lighten-1"
                @click="time_modal = false"
                >
                Cancel
                </v-btn>
                <v-btn
                text
                color="red lighten-1"
                @click="time_modal = false"
                >
                OK
                </v-btn>
            </v-time-picker>
            </v-dialog>
        <!-- <label class="text-gray-500 text-sm">Select time</label><br>
        <input v-model="booking_time" class="w-full outline-none" type="time" /> -->
        </v-col>


</div>
</template>

<script>
export default {

}
</script>

<style>

</style>