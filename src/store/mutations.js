import Vue from 'vue';
import moment from "moment"

export const SET_LAYOUT_STATE = (state) => {
    state.layoutState = !state.layoutState
}

export const SET_HIDENAV_STATUS = (state, data) => {
    state.hideNav = data
}

export const SET_LOADING_STATUS = (state, data) => {
    state.loading = data
}

export const SET_REGISTER_FORM_ERRORS = (state, data) => {
    state.registerFormErrors = data
}

export const SET_LOGIN_FORM_ERRORS = (state, data) => {
    state.loginFormErrors = data
}

export const SET_REGISTER_FORM_RESPONSE = (state, {message, user}) => {
    state.registerFormResponse = message
    state.user = user
    // state.userToken = token

    // Vue.prototype.$session.start()
    // Vue.prototype.$session.set('token', token)
    // Vue.prototype.$session.set('user', user)
}

export const SET_USER_TOKEN = (state, data) => {
    state.userToken = data
}

export const SET_USER = (state, data) => {
    state.user = data.user
    Vue.prototype.$session.start()
    Vue.prototype.$session.set('token', data.token)
    Vue.prototype.$session.set('user', data.user)
}

export const RESET_LOGIN_ERRORS = (state) => {
    state.loginFormErrors = {}
}

export const RESET_REGISTER_ERRORS = (state) => {
    state.registerFormErrors = {}
}

//forgot password
export const FORGOT_PASSWORD_RESPONSE = (state, data) => {
    state.forgotPasswordResponse = data
}

export const FORGOT_PASSWORD_ERROR = (state, data) => {
    state.forgotPasswordErrors = data
}

export const CLEAR_PASSWORD_FORGOT_ERRORS = (state) => {
    state.forgotPasswordErrors = null
}

export const CLEAR_PASSWORD_FORGOT_RESPONSE = (state) => {
    state.forgotPasswordResponse = null
}

//reset password
export const RESET_PASSWORD_RESPONSE = (state, data) => {
    state.resetPasswordResponse = data
}

export const RESET_PASSWORD_ERROR = (state, data) => {
    state.resetPasswordErrors = data
}

export const CLEAR_PASSWORD_RESET_ERRORS = (state) => {
    state.resetPasswordErrors = null
}

export const CLEAR_PASSWORD_RESET_RESPONSE = (state) => {
    state.resetPasswordResponse = null
}

//admin - manage users
export const SET_USERS = (state, data) => {
    state.users = data
}

export const SET_EDITING_USER = (state, data) => {
    state.editingUser = data
}

export const RESET_EDIING_USER = (state) => {
    state.editingUser = null
}

// booking
export const SET_CREATE_BOOKING_DATA = (state, data) => {
    state.bookingCreateData = data
}

export const SET_SERVICE_IN_BOOKING_DETAILS = (state, data) => {
    state.bookingCreateData.bookingDetails.service = data
}

export const SET_STAFF_IN_BOOKING_DETAILS = (state, data) => {
    state.bookingCreateData.bookingDetails.staff = data
}

export const SET_DATE_IN_BOOKING_DETAILS = (state, data) => {
    state.bookingCreateData.bookingDetails.date = data
}

export const SET_TIME_IN_BOOKING_DETAILS = (state, data) => {
    state.bookingCreateData.bookingDetails.time = data
}

export const SET_DURATION_IN_BOOKING_DETAILS = (state, data) => {
    let intValue = data !== '' ? parseInt(data) : data
    if (intValue>=1)
    state.bookingCreateData.bookingDetails.service.duration = intValue
}

export const SET_CUSTOMER_IN_BOOKING_DETAILS = (state, data) => {
    state.bookingCreateData.customer = data
}

export const RESTART_BOOKING = (state) => {
    state.bookingCreateData = {
        bookingDetails: {
            service: [],
            staff: {},
            date: moment().format("YYYY-MM-DD"),
            time: [],
            notifyCustomer: false
        },
        customer: {}
    }
}

export const SAVE_BOOKING = (state, data) => {
    state.bookings = data
}

export const SET_NOTIFY_CUSTOMER_IN_BOOKING_DETAILS = (state, data) => {
    state.bookingCreateData.bookingDetails.notifyCustomer = data
}

export const SET_BOOKING_SUBMIT_DISABLED = (state, data) => {
    state.bookingCreateData.disabled = data
}

export const SAVE_SERVICE = (state, data) => {
    state.services = data
}

export const PUSH_SERVICE = (state, data) => {
    console.log(state, data)
    // state.services.push(data)
}