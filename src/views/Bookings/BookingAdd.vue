<template>
  <div class="flex h-screen overflow-hidden">
  <sidebar :sidebarOpen="sidebarOpen" @toggle-sidebar="sidebarOpen = !sidebarOpen"></sidebar>
    <div class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
      <Header :sidebarOpen="sidebarOpen" @toggle-sidebar="sidebarOpen = !sidebarOpen" />
      <!-- center content start here  -->
        <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <div class="row justify-center">
                <div  class="col-md-6 col-12 flex items-center my-auto">
                    <!-- card starts here -->
                    <div class="w-full max-w-xl relative mx-auto my-auto rounded-xl shadow-lg bg-white">
                        <div class="bg-gradient-to-r from-red-900 to-yellow-500 opacity-95">
                            <v-col
                                cols="12"
                                class="flex justify-end"
                            >
                                <v-tooltip bottom color="">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                    large
                                    icon
                                    color="white"
                                    v-bind="attrs"
                                    v-on="on"
                                    @click="restartBooking"
                                    >
                                    <v-icon>mdi-cached</v-icon>
                                    </v-btn>
                                </template>
                                <span>Restart booking</span>
                                </v-tooltip>
                            </v-col>
                        </div>
                        <div class="flex flex-col bg-gradient-to-r from-red-900 to-yellow-500 opacity-95">
                            <div class="h-40 m-5 flex">
                                <h1 class="text-center text-2xl p-5 text-white my-auto mx-auto">Create a Booking</h1>
                            </div>
                            <v-progress-linear 
                            :value="progressTracker"
                            rounded
                            background-color="red lighten-4"
                            color="red lighten-1"
                            class="my-5"
                            >
                            </v-progress-linear>
                        </div>

                        <div class="form-group w-2/3 mx-auto my-5">
                            <div class="w-full flex justify-between">
                                <span 
                                @click="selectBookingWindow" 
                                class="text-black login-register-links-sm cursor-pointer w-1/3 d-inline-block text-center"
                                :class="activeLink == 1 ? 'link-active' : ''"
                                >Booking</span>
                                <span 
                                @click="selectCustomerWindow"
                                class="text-black login-register-links-sm cursor-pointer w-1/3 d-inline-block text-center"
                                :class="activeLink == 2 ? 'link-active' : ''"
                                >Customer</span>
                                <span 
                                @click="selectConfirmWindow" 
                                class="text-black login-register-links-sm cursor-pointer w-1/3 d-inline-block text-center"
                                :class="activeLink == 3 ? 'link-active' : ''"
                                >Confirmation</span>
                            </div>
                        </div>

                        <hr>

                        <v-row align="center" class="w-full p-5">
                            <!-- start of windows -->
                            <v-window class="w-full" v-model="step" touchless>
                                <v-window-item :value="1">
                                    <booking-details></booking-details>
                                </v-window-item>

                            <v-window-item :value="2">
                                <customer-details></customer-details>
                            </v-window-item>

                            <v-window-item :value="3">
                                <booking-confirmation @resetFormStep="resetFormStep"></booking-confirmation>
                            </v-window-item>
                            </v-window>
                            <!-- end of windows -->
                        </v-row>

                    </div>
                    <!-- card ends here -->
                    
                </div>

                <snack-bar :snackbar="snackbar" :text="text" :message-type="messageType" ></snack-bar>

            </div>
        </div>
    </div>
</div>
</template>

<script>
import SnackBar from '../../components/Booking/BookingCard/BookingConfimation/SnackBar.vue'
import BookingConfirmation from './booking-card/BookingConfirmation.vue'
import BookingDetails from './booking-card/BookingDetails.vue'
import CustomerDetails from './booking-card/CustomerDetails.vue'
import Sidebar from '../../components/App/Sidebar.vue';
import Header from '../../components/App/Header.vue';
export default {
    components: { BookingDetails, CustomerDetails, BookingConfirmation, SnackBar, Sidebar, Header },
    data() {
            return {
            step: 1,
            progressTracker: 33,
            activeLink: 1,
            snackbar: false,
            text: '',
            messageType: null,
            sidebarOpen: false
        }
    },
    computed: {
        bookingFormData: {
            get() {
                return {
                    customer: this.$store.state.bookingCreateData.customer,
                    staff:  this.$store.state.bookingCreateData.bookingDetails.staff,
                    service: this.$store.state.bookingCreateData.bookingDetails.service,
                    date: this.$store.state.bookingCreateData.bookingDetails.date,
                    times: this.$store.state.bookingCreateData.bookingDetails.time,
                }
            }
        },
        disabled: {
            get() {
                return this.$store.state.bookingCreateData.disabled
            },
            set(value) {
                this.$store.commit('SET_BOOKING_SUBMIT_DISABLED', value)
            }
        },
        message() {
            return this.$store.state.message
        }
    },

    watch: {
        bookingFormData(newValue) {
            let isValid = this.isFormInvalid(newValue)
            this.disabled = isValid
        }
    },

    methods: {
        selectBookingWindow() {
            this.step = 1
            this.progressTracker = 33
            this.activeLink = 1
        },
        selectCustomerWindow() {
            this.step = 2
            this.progressTracker = 66
            this.activeLink = 2
        },
        selectConfirmWindow() {
            this.step = 3
            this.progressTracker = 100
            this.activeLink = 3
        },
        restartBooking() {
            this.$store.dispatch('restartBooking')
        },
        resetFormStep() {
            this.step = 1
            this.progressTracker = 33
            this.activeLink = 1

            //show snackbar
            this.snackbar = true
            this.text = this.message.text === null ? 'Default message' : this.message.text
            this.messageType = this.message.type === null ? 0 : this.message.type
        },
        isFormInvalid(form) {
            if((form.customer.userId===undefined) || (form.staff.id===undefined) || 
                (form.service.id===undefined) || (form.date === '') || 
                (form.times.length === 0) ) {
                    return true
                } 
                return false
        }
    }
}
</script>

<style>
    .login-register-links-sm {
    color: #373737;
    margin-right: 1%;
    padding: 10px 7px;
    border-bottom: 2px solid transparent;
    margin-bottom: -2px;
    text-decoration: none;
    font-weight: bold;
    font-size: 0.8rem;
    }

    .login-register-links-sm:hover {
    text-decoration: none;
    color: #373737;
    cursor: pointer;
    }
    .form-group {
        display: flex;
        flex: 0 0 auto;
        flex-flow: row wrap;
        align-items: center;
        margin-bottom: 0;
    }
    .link-active {
        color: #a95832;
        border-color: #a95832;
        cursor: pointer;
    }
</style>