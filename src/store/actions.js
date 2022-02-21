import axios from 'axios'
// import Vue from 'vue'

export const setTotalMarksScored = ({ commit}, payload) => {
    commit('SET_TOTAL_MARKS_SCORED', payload)
}

export const addToAnswersheet = ({ commit}, payload) => {
    commit('ADD_ANSWER_TO_ANSWERSHEET', payload)
}

export const setNextQuestion = ({ commit }) => {
    commit('SET_NEXT_QUESTION')
}

export const setPreviousQuestion = ({ commit }) => {
    commit('SET_PREVIOUS_QUESTION')
}

export const setQuestionIndex = ({ commit }, payload) => {
    commit('SET_QUESTION_INDEX', payload)
}

export const setLayoutState = ({ commit }) => {
    commit('SET_LAYOUT_STATE')
}

export const addForumDiscussion = ({ commit }, payload) => {
    commit('ADD_TO_FORUM', payload)
}

export const forumDiscussionUpvote = ({ commit }, id) => {
    commit('FORUM_UPVOTE', id)
}

export const forumDiscussionDownvote = ({ commit }, id) => {
    commit('FORUM_DOWNVOTE', id)
}

export const setHideNav = ({ commit }, payload) => {
    commit('SET_HIDENAV_STATUS', payload)
}

export const register = async ({ commit }, payload) => {
    try {
        const response = await axios.post(process.env.VUE_APP_API_URL + '/users/register', payload, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        // console.log(response)
        commit('SET_REGISTER_FORM_RESPONSE', response.data)
    } catch (error) {
        commit('SET_REGISTER_FORM_ERRORS', error.response.data.error)
    }
}

export const login = async ({ commit }, payload) => {
    try {
        const response = await axios.post(process.env.VUE_APP_API_URL + '/users/login', payload, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        // console.log(response)
        let userDetails = {
            user: response.data.user,
            token: response.data.token
        }
        commit('SET_USER', userDetails)
    } catch (error) {
        console.log('error-action', error)
        commit('SET_LOGIN_FORM_ERRORS', error.response.data.error)
    }
}

export const resetLoginErrors = ({ commit }) => {
    commit('RESET_LOGIN_ERRORS')
}

export const resetRegisterErrors = ({ commit }) => {
    commit('RESET_REGISTER_ERRORS')
}

// Forgot password
export const forgotPassword = async ({ commit }, payload) => {
    try {
        const response = await axios.post(process.env.VUE_APP_API_URL + '/forgot-password', payload, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })

        // console.log(response);
        commit('FORGOT_PASSWORD_RESPONSE', response.data.message)
    } catch (error) {
        // console.log('error from action',error.response.data);
        commit('FORGOT_PASSWORD_ERROR', error.response.data.message)
    }
}


export const clearPasswordForgotErrors = ({ commit }) => {
    commit('CLEAR_PASSWORD_FORGOT_ERRORS')
}

export const clearPasswordForgotResponse = ({ commit }) => {
    commit('CLEAR_PASSWORD_FORGOT_RESPONSE')
}

// Reset password
export const resetPassword = async ({ commit }, payload) => {
    try {
        const response = await axios.post(process.env.VUE_APP_API_URL + '/reset-password', payload, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        commit('RESET_PASSWORD_RESPONSE', response.data.message)
    } catch (error) {
        commit('RESET_PASSWORD_ERROR', error.response.data.message)
    }
}


export const clearPasswordResetErrors = ({ commit }) => {
    commit('CLEAR_PASSWORD_FORGOT_ERRORS')
}

export const clearPasswordResetResponse = ({ commit }) => {
    commit('CLEAR_PASSWORD_FORGOT_RESPONSE')
}

//papers
export const getPapers = async ({ commit }, payload) => {
    try {
        const response = await axios.get(process.env.VUE_APP_API_URL + '/papers/show', payload, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        commit('SET_PAPERS', response.data.papers)
    } catch (error) {
        console.log(error.response.data);
    }
}

export const getPaperYears = async ({ commit }, payload) => {
    try {
        const response = await axios.get(process.env.VUE_APP_API_URL + '/papers/years', payload, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        commit('SET_PAPERS_YEARS', response.data.years)
    } catch (error) {
        console.log(error.response.data);
    }
}

export const getPaperSubjects = async ({ commit }, payload) => {
    try {
        const response = await axios.get(process.env.VUE_APP_API_URL + '/papers/subjects', payload, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        commit('SET_PAPERS_SUBJECTS', response.data.subjects)
    } catch (error) {
        console.log(error.response.data);
    }
}

export const setSelectedPaper = async ({ commit }, payload) => {
    commit('SET_SELECTED_PAPER', payload)
}

//admin - manage users
export const getUsers = async ({ commit }, token) => {
    try {
        const response = await axios.get(process.env.VUE_APP_API_URL + '/users', {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${token}`,
            }
        })

        commit('SET_USERS', response.data.users)
    } catch (error) {
        console.log(error.response.data);
    }
}

export const setEditingUser = async ({ commit }, payload) => {
    commit('SET_EDITING_USER', payload)
}

export const resetEditingUser = async ({ commit }) => {
    commit('RESET_EDIING_USER')
}