<template>
    <div>
        <v-col
            class="d-flex"
            cols="12"
        >
            <v-select
            :items="services"
            item-value="item"
            item-text="title"
            item-color="red"
            label="Select service"
            color="orange lighten-1"
            dense
            v-model="form.service"
            return-object
            ></v-select>
        </v-col>

<!-- TODO: adopt common neat font -->
<!-- TODO: disable taken hours -->
        <v-col
            class="d-flex"
            cols="12"
        >
            <v-select
            :items="staff"
            item-value="id"
            item-color="red"
            label="Select staff"
            color="orange lighten-1"
            dense
            v-model="form.staff"
            return-object
            >
            <template v-slot:selection="{ item }" class="">
                <span class="text-black" :key="item.id" >{{ item.name }}</span>
            </template>
            <template v-slot:item="{ item }" class="">
                <span class="text-black text-sm" :key="item.id">{{ item.name }}</span>
                <v-spacer></v-spacer>
                <v-avatar size="36"><img :src="item.image" :alt="item.name"></v-avatar>
            </template>
            </v-select>
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
                v-model="form.date"
                label="Select date"
                append-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
                color="red lighten-1"
                ></v-text-field>
            </template>
            <v-date-picker
                v-model="form.date"
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
        <input v-model="form.time" class="w-full outline-none" type="time"/>
        </v-col>

        <v-col
            class="d-flex"
            cols="12"
        >
            <v-text-field
            label="Select duration (hours)"
            color="orange lighten-1"
            type="number"
            min="1"
            v-model="form.duration"
            ></v-text-field>
        </v-col>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                service: {},
                staff: {},
                date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
                time: new Date().toLocaleTimeString(),
                duration: '1'
            },
            date_modal: false,
            time_modal: false,
            services: [
                {
                    id: 1,
                    title: "Wedding",
                    price: 100
                },
                {
                    id: 2,
                    title: "Birthday",
                    price: 150
                },
                {
                    id: 3,
                    title: "Portrait",
                    price: 50
                },
                {
                    id: 4,
                    title: "Engagement",
                    price: 200
                },
                {
                    id: 5,
                    title: "Product",
                    price: 80
                }
            ],
            staff: [
                {
                    id: 1,
                    name: "John Doe",
                    image: "https://cdn.vuetifyjs.com/images/john.jpg"
                },
                {
                    id: 2,
                    name: "Lisa Revy",
                    image: "https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                },
                {
                    id: 3,
                    name: "Allan Smith",
                    image: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                },
                {
                    id: 4,
                    name: "Amin Hussein",
                    image: "https://www.gravatar.com/avatar/b17065ea1655f1e3283aac8d8fc16019?s=48&d=identicon&r=PG"
                }
            ],
        }
    }
}
</script>

<style>

</style>