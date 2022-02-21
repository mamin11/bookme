<template>
<v-container>
    <h1 class="text-center font-light text-lg md:text-2xl p-3">PAST EXAM PAPERS</h1>

    <v-row>
        <v-col cols="12">
            <v-row>
                <v-col
                    class="d-flex"
                    cols="12"
                    sm="5"
                >
                    <v-select
                    :items="years"
                    label="select year"
                    solo
                    v-model="selectedYear"
                    ></v-select>
                </v-col>
                <v-col
                    class="d-flex"
                    cols="12"
                    sm="5"
                >
                    <v-select
                    :items="subjects"
                    label="select subject"
                    solo
                    v-model="selectedSubject"
                    ></v-select>
                </v-col>
                <v-col
                    class="d-flex"
                    cols="12"
                    sm="2"
                >
                <v-btn
                depressed
                color="red white--text text--accent-4"
                class="mt-2"
                >
                Apply filter
                </v-btn>
                </v-col>
            </v-row>
        </v-col>

        <v-col v-if="selectedPaper !== null" cols="12">
            <view-one :url="selectedPaper.full_url"></view-one>
        </v-col>

        <v-col v-else cols-md="12" cols-sm="12">
                <v-card
                class="mx-auto"
                max-width="800"
                >
                    <v-card-subtitle>please select subjejct and year....</v-card-subtitle>
                </v-card>
        </v-col>
        
    </v-row>

</v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import ViewOne from './ViewOne.vue'
// import axios from 'axios'

export default {
  components: { ViewOne },

    data: () => ({
        selectedYear: null,
        selectedSubject: null,
        selectedPaper: null,
        liked: false,
        }),

    computed: {
        ...mapGetters({
            years: 'getPaperYears',
            subjects: 'getPaperSubjects',
            papers: 'getPapers'
        })
    },

    mounted() {
        this.requestPapers()
    },

    watch: {
        selectedYear() {
            if(this.selectedSubject !== null) {
                //fetch file for selected subject and year
                // console.log('updating result',newValue);
                this.selectedPaper = null
                this.getSelectedPaper()

            }
        },
        selectedSubject() {
            if(this.selectedYear !== null) {
                // console.log('updating result',newValue);
                this.selectedPaper = null
                this.getSelectedPaper()

            }
        },
        selectedPaper() {
            this.$store.dispatch('setSelectedPaper', this.selectedPaper)
        }
    },

    methods: {
        likePaper() {
            this.liked = !this.liked
        },
        async requestPapers() {
            const formData = new FormData();
            formData.append('_method', 'POST')

            await this.$store.dispatch('getPapers', formData)
            await this.$store.dispatch('getPaperYears', formData)
            await this.$store.dispatch('getPaperSubjects', formData)
        },

        getSelectedPaper() {
            let name = this.selectedSubject+'-'+this.selectedYear
            this.papers.map((item) => {
                if(item.name === name) {
                    this.selectedPaper =  item
                }
            })

            this.$store.dispatch('setSelectedPaper', this.selectedPaper)
        }
    },
}
</script>

<style>

</style>