import Vue from 'vue';

export const getAnswerSheet = (state) => {
    return state.answerSheet
}

export const getQuestions = (state) => {
    return state.questions
}

export const getSkippedQuestions = (state) => {
    return state.skippedQuestions
}

export const getQuestionsCounts = (state) => {
    return state.questions.length
}

export const getTotalMarksScored = (state)  => {
    return state.totalMarksScored
}

export const getAnsweredQuestions = (state) => {
    return state.answerSheet.map((item) => {
        return item.question
    })
}

export const getQuestionIndex = (state) => {
    return state.questionIndex
}

export const getOptionsNext = (state) => {
    return state.questions[state.questionIndex+1].options;
}

export const getOptionsPrevious = (state) => {
    if(state.questionIndex != 0){
        return state.questions[state.questionIndex-1].options;
    }
    return null;
}

export const getLayoutState = (state) => {
    return state.layoutState
}

export const getForumDiscussions = (state) => {
    return state.forumDiscussion
}

export const getHideNavState = (state) => {
    return state.hideNav
}

export const getLoadingStatus = (state) => {
    return state.loading
}

export const getRegisterFormErrors = (state) => {
    return state.registerFormErrors
}

export const getLoginFormErrors = (state) => {
    return state.loginFormErrors
}

export const getRgisterFormResponse = (state) => {
    return state.registerFormResponse
}

export const getUserToken = () => {
    return Vue.prototype.$session.get('token')
}

export const getUser = (state) => {
    return state.user
}

export const getForgotPasswordErrors = (state) => {
    return state.forgotPasswordErrors
}

export const getForgotPasswordResponse = (state) => {
    return state.forgotPasswordResponse
}

export const getResetPasswordErrors = (state) => {
    return state.resetPasswordErrors
}

export const getResetPasswordResponse = (state) => {
    return state.resetPasswordResponse
}

//papers

export const getPapers = (state) => {
    return state.papers
}

export const getPaperYears = (state) => {
    return state.papers_years
}

export const getPaperSubjects = (state) => {
    return state.papers_subjects
}

export const getSelectedPaper = (state) => {
    return state.selected_paper
}

//admin - manage users
export const getUsers = (state) => {
    return state.users
}

export const getEditingUser = (state) => {
    return state.editingUser
}