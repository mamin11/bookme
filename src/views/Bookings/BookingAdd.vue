<template>
<div class="container ">
    <div class="row h-screen justify-center">
        <div  class="col-md-4 flex items-center my-auto">
            <!-- card starts here -->
            <div class="w-full max-w-xl relative mx-auto my-auto rounded-xl shadow-lg bg-white">
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
                        <booking-confirmation></booking-confirmation>
                    </v-window-item>
                    </v-window>
                    <!-- end of windows -->
                </v-row>

            </div>
            <!-- card ends here -->
            
        </div>
    </div>
</div>
</template>

<script>
import BookingConfirmation from './booking-card/BookingConfirmation.vue'
import BookingDetails from './booking-card/BookingDetails.vue'
import CustomerDetails from './booking-card/CustomerDetails.vue'
export default {
  components: { BookingDetails, CustomerDetails, BookingConfirmation },
    data() {
            return {
            step: 1,
            progressTracker: 33,
            activeLink: 1,
        }
    },
    computed: {
        // date() {
        //     const t = new Date();
        //     const date = ('0' + t.getDate()).slice(-2);
        //     const month = ('0' + (t.getMonth() + 1)).slice(-2);
        //     const year = t.getFullYear();
        //     return `${date}/${month}/${year}`;
        // }
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