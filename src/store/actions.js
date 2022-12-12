import axios from 'axios'
import {Messages} from "@/Util/contants";
// import Vue from 'vue'

export const setLayoutState = ({ commit }) => {
    commit('SET_LAYOUT_STATE')
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
        let userDetails = {
            user: response.data.user,
            token: response.data.token
        }
        commit('SET_USER', userDetails)
    } catch (error) {
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

        commit('FORGOT_PASSWORD_RESPONSE', response.data.message)
    } catch (error) {
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

//admin - manage users
export const setEditingUser = async ({ commit }, payload) => {
    commit('SET_EDITING_USER', payload)
}

export const resetEditingUser = async ({ commit }) => {
    commit('RESET_EDIING_USER')
}

//booking
export const setCreateBookingData = ({ commit }, payload) => {
    commit('SET_CREATE_BOOKING_DATA', payload)
}

export const setServiceInBookingDetails = ({ commit }, payload) => {
    commit('SET_SERVICE_IN_BOOKING_DETAILS', payload)
}

export const setStaffInBookingDetails = ({ commit }, payload) => {
    commit('SET_STAFF_IN_BOOKING_DETAILS', payload)
}

export const setDateInBookingDetails = ({ commit }, payload) => {
    commit('SET_DATE_IN_BOOKING_DETAILS', payload)
}

export const setTimeInBookingDetails = ({ commit }, payload) => {
    commit('SET_TIME_IN_BOOKING_DETAILS', payload)
}

export const setDurationInBookingDetails = ({ commit }, payload) => {
    commit('SET_DURATION_IN_BOOKING_DETAILS', payload)
}

export const setCustomerInBookingDetails = ({ commit }, payload) => {
    commit('SET_CUSTOMER_IN_BOOKING_DETAILS', payload)
}

export const restartBooking = ({ commit }) => {
    commit('RESTART_BOOKING')
}

export const saveBooking = async ({ commit }, payload) => {
    try {
        // get token from cookies

        const response = await axios.post(process.env.VUE_APP_API_URL + '/booking/add', payload, {
            headers: {
                "Content-Type": "application/json",
                // "Authorization": `Bearer ${token}`,
            }
        })

        commit('SAVE_BOOKING', response.data.booking)
        
        let message = {
            text: response.data.message,
            type: Messages.SUCCESS
        }

        commit('SET_BOOKING_MESSAGE',message )
    } catch (error) {        
        let message = {
            text: error.response.data.error,
            type: Messages.ERROR
        }

        commit('SET_BOOKING_MESSAGE', message)
    }
}

export const getServices = async ({ commit }) => {
    try {
        const response = await axios.get(process.env.VUE_APP_API_URL + '/services/all', {
            headers: {
                "Content-Type": "multipart/form-data",
                // "Authorization": `Bearer ${token}`,
            }
        })

        commit('SAVE_SERVICE', response.data)
    } catch (error) {
        console.log(error.response.data)
    }
}

export const getStaff = async ({ commit }, payload) => {
    try {
        const response = await axios.post(process.env.VUE_APP_API_URL + '/users/staff', payload, {
            headers: {
                "Content-Type": "application/json",
                // "Authorization": `Bearer ${token}`,
            }
        })

        commit('SAVE_STAFF', response.data)
    } catch(error) {
        commit('SET_ERROR', error.response.data)
    }

}

export const searchStaff = async ({ commit }, name) => {
    try {
        const response = await axios.get(process.env.VUE_APP_API_URL + '/users/staff/search/'+name, {
            headers: {
                "Content-Type": "multipart/form-data",
                // "Authorization": `Bearer ${token}`,
            }
        })

        commit('SAVE_STAFF', response.data)
    } catch(error) {
        commit('SET_ERROR', error.response.data)
    }

}

export const getCustomers = async ({ commit }, pageNumber) => {
    try {
        const response = await axios.get(process.env.VUE_APP_API_URL + '/users/customers/'+pageNumber, {
            headers: {
                "Content-Type": "multipart/form-data",
                // "Authorization": `Bearer ${token}`,
            }
        })

        commit('SAVE_CUSTOMERS', response.data)
    } catch(error) {
        commit('SET_ERROR', error.response.data)
    }

}

export const searchCustomers = async ({ commit }, name) => {
    try {
        const response = await axios.get(process.env.VUE_APP_API_URL + '/users/customers/search/'+name, {
            headers: {
                "Content-Type": "multipart/form-data",
                // "Authorization": `Bearer ${token}`,
            }
        })

        commit('SAVE_CUSTOMERS', response.data)
    } catch(error) {
        commit('SET_ERROR', error.response.data)
    }

}