<template>
<div class="container ">
    <div class="row justify-center lg:justify-between">
      
        <quiz-card
        v-if="questionIndex !== 0"
        :questionIndex="questionIndex"
        :questionsLength="questions.length"
        :question="questions[questionIndex-1]"
        :options="optionsPrevious"
        ></quiz-card>
        <empty-card 
        v-else  
        :loading="loading"
        ></empty-card>

        <!-- <full-layout @setLoadingStatus="setLoadingStatus"></full-layout> -->
        <question-main @setLoadingStatus="setLoadingStatus"></question-main>

        <quiz-card
        v-if="questionIndex != questions.length-1"
        :loading="loading"
        :questionIndex="questionIndex"
        :questionsLength="questions.length"
        :question="questions[questionIndex+1]"
        :options="optionsNext"
        ></quiz-card>
        <empty-card 
        v-else  
        :loading="loading"
        ></empty-card>

    </div>
</div>
</template>

<script>
import EmptyCard from '../components/Quiz/EmptyCard.vue';
import QuizCard from '../components/Quiz/QuizCard.vue';
import QuestionMain from '../components/Quiz/QuestionMain.vue';
// import FullLayout from '../components/Quiz/FullLayout.vue';
import { mapGetters } from 'vuex'

export default {
  //  FullLayout
  components: { EmptyCard, QuizCard, QuestionMain },
    name: 'Questions',
    data() {
        return {
            loading: true,
        }
    },

    computed: {
      ...mapGetters({
        questions: 'getQuestions',
        questionIndex: 'getQuestionIndex',
        optionsNext: 'getOptionsNext',
        optionsPrevious: 'getOptionsPrevious'
      }),
    },

    methods: {
        setLoadingStatus(status) {
          this.loading = status
        },
    }

}
</script>

<style>

</style>