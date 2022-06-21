import moment from "moment"
export default {
    layoutState: false,
    hideNav: false,
    loading: false,
    registerFormErrors: {},
    loginFormErrors: {},
    registerFormResponse: {},

    userToken: null,
    user: null,

    forgotPasswordResponse: null,
    forgotPasswordErrors: null,

    resetPasswordResponse: null,
    resetPasswordErrors: null,

    users: [],
    editingUser: null,

    bookings: [],
    services: [],

    bookingCreateData: {
        bookingDetails: {
            service: [],
            staff: {},
            date: moment().format("YYYY-MM-DD"),
            time: [],
            notifyCustomer: false,
        },
        customer: {},
        disabled: true
    },

}