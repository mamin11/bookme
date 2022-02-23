<template>
<div class="container ">
    <div class="row h-screen justify-center">
        <div  class="col-md-4 xl:flex items-center my-auto">
            <!-- card starts here -->
            <div class="w-full max-w-xl relative mx-auto my-auto rounded-xl shadow-lg bg-white">
                <div class="flex flex-col bg-gradient-to-r from-red-900 to-yellow-500 opacity-95">
                    <div class="h-40 m-5 flex">
                        <h1 class="text-center text-2xl p-5 text-white my-auto mx-auto">Create a Booking</h1>
                    </div>
                    <v-progress-linear 
                    :value="33"
                    rounded
                    background-color="red lighten-4"
                    color="red lighten-1"
                    class="my-5"
                    >
                    </v-progress-linear>
                </div>

                <v-row align="center" class="my-5 w-full p-5">
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
                        persistent
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
                    >
                        <v-dialog
                        ref="dialog"
                        v-model="time_modal"
                        persistent
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
                    </v-col>

                    <v-col
                        class="d-flex"
                        cols="12"
                    >
                        <v-text-field
                        label="Select duration (hours)"
                        color="black"
                        type="number"
                        min="0"
                        ></v-text-field>
                    </v-col>

                </v-row>

            </div>
            <!-- card ends here -->
            
        </div>
    </div>
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
    },
    computed: {
        // date() {
        //     const t = new Date();
        //     const date = ('0' + t.getDate()).slice(-2);
        //     const month = ('0' + (t.getMonth() + 1)).slice(-2);
        //     const year = t.getFullYear();
        //     return `${date}/${month}/${year}`;
        // }
    },
    methods: {
    }
}
</script>

<style>

</style>