<template>
    <div>
        <v-col
            class="d-flex"
            cols="12"
        >
            <v-select
            :items="services"
            label="Select service"
            color="black"
            dense
            ></v-select>
        </v-col>

<!-- TODO: add image icons to user list -->
<!-- TODO: adopt common neat font -->
<!-- TODO: disable taken hours -->
        <v-col
            class="d-flex"
            cols="12"
        >
            <v-select
            :items="staff"
            label="Select staff"
            color="black"
            dense
            ></v-select>
        </v-col>

        <v-col
            cols="12"
        >
            <v-dialog
            ref="dialog"
            v-model="date_modal"
            width="290px"
            color="red lighten-1"
            >
            <template v-slot:activator="{ on, attrs }">
                <v-text-field
                v-model="date"
                label="Select date"
                append-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
                color="red lighten-1"
                ></v-text-field>
            </template>
            <v-date-picker
                v-model="date"
                scrollable
                :min="new Date().toISOString().substr(0, 10)"
                :disabledDates="'2022-02-25'"
                color="red lighten-1"
            >
                <v-spacer></v-spacer>
                <v-btn
                text
                color="red lighten-1"
                @click="date_modal = false"
                >
                Cancel
                </v-btn>
                <v-btn
                text
                color="red lighten-1"
                @click="date_modal = false"
                >
                OK
                </v-btn>
            </v-date-picker>
            </v-dialog>
        </v-col>

        <v-col
            cols="12"
            class="border-b-2 border-gray-300"
        >
        <label class="text-gray-500 text-sm">Select time</label><br>
        <input class="w-full outline-none" type="time" :value="time"/>
        </v-col>

        <!-- <v-col
            cols="12"
        >
            <v-dialog
            ref="dialog"
            v-model="time_modal"
            width="290px"
            color="red lighten-1"
            >
            <template v-slot:activator="{ on, timeModalActivator }">
                <v-text-field
                v-model="time"
                label="Select time"
                append-icon="mdi-clock"
                readonly
                v-bind="timeModalActivator"
                v-on="on"
                color="red lighten-1"
                ></v-text-field>
            </template>
            <v-time-picker
                v-model="time"
                scrollable
                color="red lighten-1"
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
        </v-col> -->

        <v-col
            class="d-flex"
            cols="12"
        >
            <v-text-field
            label="Select duration (hours)"
            color="orange lighten-1"
            type="number"
            min="0"
            ></v-text-field>
        </v-col>
    </div>
</template>

<script>
export default {
    data() {
        return {
            time: new Date().toLocaleTimeString(),
            date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            date_modal: false,
            time_modal: false,
            services: ['Wedding', 'Birthday', 'Portrait', 'Event', 'New-born', 'Engagement', 'Product'],
            staff: ['John Doe', 'Lisa Revy', 'Allan Smith', 'Amin Hussein', 'Becky Smith', 'Frank Onza', 'Gabriel Oscar'],
        }
    }
}
</script>

<style>

</style>