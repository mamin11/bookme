import Vue from 'vue';

export const getLayoutState = (state) => {
    return state.layoutState
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

//admin - manage users
export const getUsers = (state) => {
    return state.users
}

export const getEditingUser = (state) => {
    return state.editingUser
}

export const getCreateBookingData = (state) => {
    return state.bookingCreateData

}