<template>
        <!-- start of question in middle  -->
        <transition  name="animate" enter-active-class="animate-enter-active" leave-active-class="animate-leave-active">
        <div class="col-12 flex w-full h-screen items-center my-auto animate__animated animate__faster">
        <v-skeleton-loader
        v-if="loading"
        class="w-screen max-w-6xl p-5 relative mx-auto  rounded-xl shadow-lg  bg-white "
        v-bind="attrs"
        type=" table-heading, divider, list-item-two-line,list-item-three-line, list-item-three-line, list-item-three-line"
        ></v-skeleton-loader>
            
            <div v-else class="w-full max-w-6xl p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white ">
                <v-alert
                v-if="isTimeRunningOut"
                type="error"
                elevation="6"
                dismissible
                >Time is running out
                </v-alert>
                <v-row justify="space-around">
                    <v-col
                    cols="12"
                    sm="10"
                    md="12"
                    >
                    <v-sheet
                        class="py-1 px-1"
                    >
                        <v-chip-group
                        active-class="primary--text"
                        >
                        <v-chip
                            elevation="10"
                            v-for="skippedQuestion in skippedQuestions"
                            :key="skippedQuestion"
                            @click="goToSkippedQuestion(skippedQuestion)"
                        >
                            {{ skippedQuestion+1 }}
                        </v-chip>
                        </v-chip-group>
                    </v-sheet>
                    </v-col>
                </v-row>
                <div>
                    <v-progress-linear 
                    :value="questionsProgress"
                    rounded
                    background-color="red lighten-4"
                    color="red lighten-1"
                    >
                    </v-progress-linear>
                </div>
                <!-- <div class=""> -->
                    <div class="text-center p-2 flex-auto justify-center align-middle">
                        <div class="flex justify-between">
                            <label for="toogleButton" class="flex items-center cursor-pointer">
                                <div class="px-2">auto next</div>
                                <!-- toggle -->
                                <div class="relative">
                                <input :disabled="hasTimeRunOut" id="toogleButton" @click="handleAutoNext" type="checkbox" class="hidden" />
                                <!-- path -->
                                <div
                                    class="toggle-path bg-gray-200 w-9 h-5 rounded-full shadow-inner"
                                ></div>
                                <!-- crcle -->
                                <div
                                    class="toggle-circle absolute w-3.5 h-3.5 bg-white rounded-full shadow inset-y-0 left-0"
                                ></div>
                                </div>
                            </label>
                            <div :class="[isTimeRunningOut ? 'animate__animated animate__pulse animate-pulse' : '']">{{timer}}</div>
                        </div>
                        <h2 class="text-xl font-bold py-4 ">{{questions[questionIndex].title}}? ({{questionIndex+1}}/{{questions.length}} )</h2>

                            <ul class="flex flex-col bg-white p-2" v-if="!hasTimeRunOut">
                                <li v-for="(option, i) in options" :key="i" class="border-gray-400 flex flex-row mb-2" @click="selectAnswer(i)" >
                                    <div class="select-none cursor-pointer rounded-md flex flex-1 items-center p-2  
                                    transition duration-200 ease-in-out transform hover:-translate-y-1 hover:shadow-lg" 
                                    :class="[ (selectedAnswerIndex == i) || (getPickedAnswer === optionLetterList(i)) ? '-translate-y-1 shadow-lg bg-blue-300' : '']">
                                    <div class="flex flex-row flex-1 pl-1">
                                        <span class="pr-3">{{optionLetterList(i)}}:</span>
                                        <div class="font-small">{{option.text}}.</div>
                                    </div>
                                    </div>
                                </li>

                            </ul>
                            <ul class="flex flex-col bg-white p-2" v-else>
                                <li v-for="(option, i) in options" :key="i" class="border-gray-400 flex flex-row mb-2">
                                    <div class="select-none rounded-md flex flex-1 items-center p-2 " 
                                    :class="[ (selectedAnswerIndex == i) || (getPickedAnswer === optionLetterList(i)) ? '-translate-y-1 shadow-lg bg-blue-300' : '']">
                                    <div class="flex flex-row flex-1 pl-1">
                                        <span class="pr-3">{{optionLetterList(i)}}:</span>
                                        <div class="font-small">{{option.text}}.</div>
                                    </div>
                                    </div>
                                </li>
                            </ul>

                        </div>

                    <div class="p-3 mt-2 text-center space-x-4 md:block">
                        <button :disabled="hidePrevious || hasTimeRunOut" @click="previousQuestion" 
                        class="mb-2 md:mb-0 disabled:opacity-50 bg-white px-4 
                        py-2 text-sm shadow-sm font-medium tracking-wider border 
                        text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100">Previous</button>
                        <button :disabled="hideSkip || getPickedAnswer != undefined || hasTimeRunOut" @click="skipQuestion" 
                        class="mb-2 md:mb-0 disabled:opacity-50 bg-red-500 
                        border border-red-500 px-4 py-2 text-sm shadow-sm 
                        font-medium tracking-wider text-white rounded-full 
                        hover:shadow-lg hover:bg-red-600">Skip</button>
                        <button :disabled="hideNext || getPickedAnswer == undefined || hasTimeRunOut || autoNext" @click="nextQuestion" 
                        class="mb-2 md:mb-0 disabled:opacity-50 bg-white px-4 py-2 text-sm 
                        shadow-sm font-medium tracking-wider border text-gray-600 rounded-full 
                        hover:shadow-lg hover:bg-gray-100">Next</button>
                        <submit-dialog class="mt-2" @markQuestions="markQuestions" @stopTimer="stopTimer" :totalQuestions="questions.length" />

                </div>
                </div>
        </div>
        </transition>
        <!-- end of question in middle  -->
</template>

<script>
import moment from 'moment'
import SubmitDialog from './SubmitDialog.vue';
import { mapGetters } from 'vuex'
import { optionLetterList } from '../../helpers/helpers'

export default {
  components: { SubmitDialog },
    name: 'QuestionMain',
    data() {
        return {
            hidePrevious: true,
            hideNext: false,
            hideSkip: false,
            autoNext: false,
            selectedAnswerIndex: null,
            allocatedTimeMins:5,
            timerCount: null,
            loading: true,
            attrs: {
                class: 'mb-6',
                boilerplate: true,
                elevation: 2,
                height: 570
            },
        }
    },

    beforeMount(){
        //set allocated time, call method
        this.timerCount =  this.setAllocatedTime()
    },

    mounted() {
        setInterval(() => {
            if (this.timerCount > 0) {
                this.timerCount = moment(this.timerCount.subtract(1, 'seconds'))
            }
        }, 1000);
        this.options
    },

    watch: {

    },

    computed: {
        ...mapGetters({
            questions: 'getQuestions',
            skippedQuestions: 'getSkippedQuestions',
            answerSheet: 'getAnswerSheet',
            totalMarksScored: 'getTotalMarksScored',
            getAnsweredQuestions: 'getAnsweredQuestions',
            questionIndex: 'getQuestionIndex',
            optionsNext: 'getOptionsNext',
            optionsPrevious: 'getOptionsPrevious'
        }),
        options() {
            this.delayFunction()
            if(this.questionIndex == 0 || this.questionIndex == this.questions.length - 1){
                this.setHideSkipTrue
            } else {
                this.setHideSkipFalse
            }
            return this.questions[this.questionIndex].options;
        },
        getPickedAnswer() {
            //get answer for current question
            //first check if the question has been anwered
            let returnVar = null
            if(this.getAnsweredQuestions.includes(this.questionIndex+1)){
                // return this.answerSheet.map((item) => {
                this.answerSheet.map((item) => {
                    if(item.question === this.questionIndex+1){
                        // return item.answer
                        returnVar = item.answer
                    }
                })
            }
            return returnVar
        },
        timer() {
            return this.timerCount.format('mm:ss')
        },
        questionsProgress(){
            //get count of answered questions
            //calc % and return
            let percentage = (this.getAnsweredQuestions.length/this.questions.length)*100
            return percentage
        },
        isTimeRunningOut(){
            //set alert threshold to 20% allocated time
            let tenPercent = 0.20*this.allocatedTimeMins
                // console.log(moment(this.timerCount).format('mm:ss'));
            if((moment(this.timerCount).format('mm:ss') < moment(tenPercent*60*1000).format('mm:ss'))){
                return true
            }
            return false
        },
        hasTimeRunOut(){
            if((moment(this.timerCount).format('mm:ss') == moment(0*60*1000).format('mm:ss'))){
                return true
            }
            return false
        }
    },

    methods: {
        setHideSkipTrue(){
            this.hideSkip = true
        },
        setHideSkipFalse(){
            this.hideSkip = false
        },
        delayFunction(){
            setTimeout(() => {  
                this.loading = false
                this.$emit('setLoadingStatus', this.loading)
                }, 1000);
        },
        markQuestions(){
            let counter = 0
            //check if all questions have been answered
            //show alert if not
            if(this.answerSheet.length >0){
                this.answerSheet.map((item) => {
                    if(item.answer === this.getCorrectAnswer(item.question)){
                        console.log('correct answer selected.........');
                        counter++
                    } else {
                        console.log('INCORRET ANSWER.....',item.answer);
                    }
                })
                    // this.totalMarksScored = counter
                    this.$store.dispatch('setTotalMarksScored', counter)

                
            } else{
                console.log('no questions answered');
            }
            // this.markingLoadingStatus = status
            console.log('MARKING....');
        },
        handleAutoNext() {
            //this function is called when auto next is checked
            //this was created to be able to turn animations off when auto next is checked
            //otherwise this would work - v-model="autoNext" - on the input
            this.autoNext = !this.autoNext
        },
        nextQuestion() {
            //this function is called when next button is clicked
            //set index to current + 1
            // this.questionIndex++
            this.$store.dispatch('setNextQuestion')
            this.hidePrevious = false
            this.selectedAnswerIndex = null

            //check if index is questions array size - 1, set disabled to true
            if(this.questionIndex == this.questions.length - 1){
                this.hideNext = true
                this.hideSkip = true
            } 

            // console.log('next question requested');
        },
        previousQuestion() {
            //this function is called when previous question button is clicked
            //set index to current - 1
            // this.questionIndex--
            this.$store.dispatch('setPreviousQuestion')
            this.hideNext = false
            this.hideSkip = false
            this.selectedAnswerIndex = null

            //check if index is 0, set disable to true
            if(this.questionIndex == 0){
                this.hidePrevious = true
            } 

        },
        skipQuestion() {
            //this function is called when skip button is clicked
            //set questionIndex to current + 1
            // this.questionIndex++
            this.$store.dispatch('setNextQuestion')
            this.hidePrevious = false
            this.selectedAnswerIndex = null

            //check if index is questions array size - 1, set disabled to true
            if(this.questionIndex == this.questions.length - 1){
                this.hideSkip = true
                this.hideNext = true
            }

            //else add the current question to list of skipped questions
            //check if skipped question is already in array or not
            if(!this.skippedQuestions.includes(this.questionIndex-1)){
                this.skippedQuestions.push(this.questionIndex-1)
            }

        },
        goToSkippedQuestion(index){
            //allow go back to question if time has not run out
            this.selectedAnswerIndex = null
            if(!this.hasTimeRunOut) {
                // this.questionIndex = index;
                this.$store.dispatch('setQuestionIndex', index)
                //enable next button
                if(this.questionIndex == this.questions.length - 1){
                    this.hideNext = true
                    this.hideSkip = true
                } else {
                    this.hideNext = false
                    this.hideSkip = false
                }

                //enable previous button
                if(this.questionIndex == 0){
                    this.hidePrevious = true
                } else {
                    this.hidePrevious = false
                }
            }
        },
        getCorrectAnswer(questionNumber){
            //get question at index
            let question = this.questions[questionNumber-1]
            let letter = ''
            this.questions.map((item) => {
                if(item.title == question.title){
                    for (let index = 0; index < item.options.length; index++) {
                        // const element = array[index];
                        if(item.options[index].isCorrect == true){
                            letter = this.optionLetterList(index)
                        }
                        
                    }
                }
            })
            return letter
            // console.log(letter);
        },
        selectAnswer(i) {
            //this function is called whenever the user click an answer
            //add css class to selected option
            this.selectedAnswerIndex = i
            

            //add the selected answer and its question to answerSheet, questionIndex+1 and optionLetter(i)
            //check if answer has been already been added for question, if yes, replace, else add
            if(!this.getAnsweredQuestions.includes(this.questionIndex+1)){
                //question does not exist in answersheet, therefore not answered. add answer
                let payload = {question: this.questionIndex+1, answer: this.optionLetterList(i) }

                this.$store.dispatch('addToAnswersheet', payload)

                //if question is in skipped questions, remove it
                if(this.skippedQuestions.includes(this.questionIndex)){
                    if(this.questionIndex == 0) {
                        this.skippedQuestions.shift()
                    } else {
                        this.skippedQuestions.splice(this.skippedQuestions.indexOf(this.questionIndex),this.questionIndex);
                    }
                }
            } else {
                //find the question and update its answer
                this.answerSheet.map((item) => {
                    if(item.question === this.questionIndex+1){
                        item.answer =this.optionLetterList(i)
                    }
                })

            }
            //check if auto next is true, go to next question
            if(this.autoNext == true && (this.questionIndex !== this.questions.length - 1)){
                this.questionIndex++
                this.selectedAnswerIndex = null
                this.hidePrevious = false
            } 
            // console.log('answersheet', this.answerSheet);

        },
        setAllocatedTime(){
            return moment(this.allocatedTimeMins* 60 * 1000)
            // this.timerCount = moment(this.allocatedTimeMins* 60 * 1000)
            // return 
        },
        stopTimer(){
            this.timerCount = moment(0* 60 * 1000)
        },
        optionLetterList(i){
            return optionLetterList(i)
        }
    }

}
</script>

<style>
.toggle-path {
    transition: background 0.3s ease-in-out;
}
.toggle-circle {
    top: 0.2rem;
    left: 0.25rem;
    transition: all 0.3s ease-in-out;
}
input:checked ~ .toggle-circle {
    transform: translateX(100%);
}
input:checked ~ .toggle-path {
    background-color:#81E6D9;
}
.bg-circle {
    background: linear-gradient(
    90deg,
    white 0%,
    transparent 80%
    );
}
</style>