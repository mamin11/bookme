<template>
    <div>
        <v-responsive class="overflow-y-auto" max-height="400">
            <v-toolbar dense elevation="0" class="mb-3">
                <v-text-field hide-details color="black" append-icon="mdi-magnify" single-line label="Search customer"></v-text-field>
            </v-toolbar>

            <v-list shaped>
                <v-list-item-group
                v-model="model"
                >
                <template v-for="(item, i) in items">
                    <v-divider
                    v-if="!item"
                    :key="`divider-${i}`"
                    ></v-divider>

                    <v-list-item
                    v-else
                    :key="`item-${i}`"
                    :value="item"
                    active-class="orange-dark--text text--accent-4"
                    >
                    <template v-slot:default="{ active }">
                        <v-list-item-content>
                        <v-list-item-title v-text="item"></v-list-item-title>
                        </v-list-item-content>

                        <v-list-item-action>
                        <v-checkbox
                            :input-value="active"
                            color="orange accent-4"
                        ></v-checkbox>
                        </v-list-item-action>
                    </template>
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
    items: [
        'Dog Photos',
        'Cat Photos',
        'Potatoes',
        'Carrots',
        'Dog Photos',
        'Cat Photos',
        'Potatoes',
        'Carrots',
        'Dog Photos',
        'Cat Photos',
        'Potatoes',
        'Carrots',
        'Dog Photos',
        'Cat Photos',
        'Potatoes',
        'Carrots',
    ],
    model: ['Carrots'],
    }),
}
</script>

<style>

</style>