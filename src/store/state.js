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

    papers: [],
    selected_paper: null,
    papers_subjects: [],
    papers_years: [],

    users: [],
    editingUser: null,

    bookingCreateData: {
        bookingDetails: {
            service: [],
            staff: {},
            date: moment().format("YYYY-MM-DD"),
            time: []
        },
        customer: {}
    },

}