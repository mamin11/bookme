<template>
    <v-row justify="center">
        <v-dialog
        v-model="dialog"
        persistent
        max-width="450"
        >
        <template v-slot:activator="{ on, attrs }">
            <button 
            v-bind="attrs"
            v-on="on"
            @click="submit"
            class="mb-2 md:mb-0 disabled:opacity-50 bg-blue-500 px-9 py-3 text-sm 
            shadow-sm font-medium tracking-wider border text-white rounded-full 
            hover:shadow-lg hover:bg-blue-400">Submit</button>
        </template>
        <v-card>
            <v-card-title class="text-h5">
            {{resultReady || resultShown ? 'Result' : 'Are you sure?'}}
            </v-card-title>
            <v-card-text v-if="!showMarkingLoading && !resultReady">{{resultShown ? 'You scored: '+ getResults() : 'Current answered questions will be marked.'}}</v-card-text>
            <v-card-text v-if="resultReady">You scored: {{getResults()}}</v-card-text>
                <atom-spinner
                    v-if="showMarkingLoading"
                    class="mx-auto"
                        :animation-duration="1000"
                        :size="60"
                        :color="'#ff1d5e'"
                    />
            <v-card-actions>
            <v-btn
                :disabled="showMarkingLoading"
                color="red darken-1"
                text
                @click="cancelFunction"
            >
                Close
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
                :disabled="showMarkingLoading || resultShown"
                color="blue darken-1"
                text
                @click="continueFunction"
            >
                Continue
            </v-btn>
            </v-card-actions>
        </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
import {AtomSpinner} from 'epic-spinners'
import { mapGetters } from  'vuex'

export default {
    components: { AtomSpinner },
    props: ['totalQuestions'],
    data () {
        return {
            dialog: false,
            showMarkingLoading: false,
            resultReady: false,
            resultShown: false,
        }
    },

    computed: {
        ...mapGetters({
            totalMarksScored: 'getTotalMarksScored',
        }),
    },

    methods: {
        submit() {
            console.log('submit clicked');
        },
        cancelFunction(){
            this.dialog = false
            this.resultReady = false
            console.log('cancel clicked');
        },
        continueFunction(){
            console.log('continue clicked');
            //trigger loading animation
            this.showMarkingLoading = true
            this.resultReady = false
            this.$emit('markQuestions')
            this.$emit('stopTimer')
            this.delayFunction()
        },
        delayFunction(){
            setTimeout(() => {  
                this.showMarkingLoading = false 
                this.resultReady = true
                this.resultShown = true
                }, 2000);
        },
        getResults(){
            return  this.totalMarksScored+'/'+this.totalQuestions + ' - ' + (this.totalMarksScored/this.totalQuestions * 100) + '%';
        }
    }
}
</script>

<style>

</style>