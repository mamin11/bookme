<template>
<div>
    <v-app-bar
        :hidden="hideNav"
        color="gray accent-4"
        
    >
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title>{{ currentRouteName }}</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs2 }">
        <v-btn 
        icon
        v-bind="attrs2"
        v-on="on"
        >
            <v-switch
                color="orange"
                hide-details
                icon
                @change="changeLayout"
            ></v-switch>
        </v-btn>
        </template>
        <span>change layout</span>
        </v-tooltip>

        <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
        <v-btn 
        icon
        v-bind="attrs"
        v-on="on"
        >
            <v-icon>mdi-plus</v-icon>
        </v-btn>
        </template>
        <span>Invite others</span>
        </v-tooltip>

        <v-tooltip 
        bottom
        v-if="hasSession"
        >
            <template v-slot:activator="{ on, attrs }">
                <v-btn icon
                v-bind="attrs"
                v-on="on"
                @click="logout"
                >
                <v-icon>mdi-logout</v-icon>
                </v-btn>
            </template>
        <span>logout</span>
        </v-tooltip>

    <v-avatar size="36" v-if="hasSession">
        <img
        v-if="userInSession.image !== null"
        :src="userInSession.image_url"
        alt="user"
        >
        <avatar 
        v-else
        color="red" :fullname="user.full_name" :size=36></avatar>
    </v-avatar>
    </v-app-bar>

    <v-navigation-drawer
        v-model="drawer"
        absolute
        temporary
    >
        <v-list
        nav
        dense
        shaped
        >
        <v-list-item-group
            active-class="red--text text--accent-4"
            class="p-4"
        >
            <v-list-item
            v-if="hasSession"
            class="pb-2"
            >
            <v-avatar size="36" >
                <img
                v-if="userInSession.image !== null"
                :src="userInSession.image_url"
                alt="user"
                >
                <avatar 
                v-else
                color="red" :fullname="user.full_name" :size=36></avatar>
            </v-avatar>
            <v-list-item-title class="pl-3">{{user.full_name}}</v-list-item-title>
            </v-list-item>

            <admin-dropdown v-if="hasSession && user.role === 'admin'"></admin-dropdown>

            <v-list-item
            :color="$route.name == 'Booking'? 'red' : ''"
            class="pb-2"
            to="/booking"
            >
            <v-icon>mdi-clock-plus-outline</v-icon>
            <v-list-item-title class="pl-3">Bookings</v-list-item-title>
            </v-list-item>

            <v-list-item
            :color="$route.name == 'Quiz'? 'red' : ''"
            class="pb-2"
            to="/quiz"
            >
            <v-icon>mdi-head-question</v-icon>
            <v-list-item-title class="pl-3">Questions</v-list-item-title>
            </v-list-item>

            <v-list-item
            color="red"
            class="pb-2"
            to="/papers"
            >
                <v-icon>mdi-note-search</v-icon>
                <v-list-item-title class="pl-3">Past papers</v-list-item-title>
            </v-list-item>

            <v-list-item
            class="pb-2"
            >
            <v-icon>mdi-map-search</v-icon>
            <v-list-item-title class="pl-3">Find a tutor</v-list-item-title>
            </v-list-item>

            <v-list-item
            class="pb-2"
            to="/notes"
            >
            <v-icon md>mdi-note-plus</v-icon>
            <v-list-item-title class="pl-3">Notes</v-list-item-title>
            </v-list-item>

            <v-list-item
            class="pb-2"
            >
            <v-icon>mdi-account-group</v-icon>
            <v-list-item-title class="pl-3">My Bubble</v-list-item-title>
            </v-list-item>

            <v-list-item
            class="pb-2"
            >
            <v-icon>mdi-chart-box</v-icon>
            <v-list-item-title class="pl-3">Statistics</v-list-item-title>
            </v-list-item>

            <v-list-item
            color="red"
            class="pb-2"
            to="/forum"
            >
            <v-icon>mdi-forum</v-icon>
            <v-list-item-title class="pl-3">Forum</v-list-item-title>
            </v-list-item>

            <v-list-item
            color="red"
            class="pb-2"
            to="/my-account"
            >
            <v-icon>mdi-account</v-icon>
            <v-list-item-title class="pl-3">My Profile</v-list-item-title>
            </v-list-item>

            <v-list-item
            v-if="hasSession"
            color="red"
            class="pb-2"
            @click="logout"
            >
            <v-icon>mdi-power</v-icon>
            <v-list-item-title class="pl-3">Logout</v-list-item-title>
            </v-list-item>

        </v-list-item-group>
        </v-list>
    </v-navigation-drawer>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import Avatar from 'vue-avatar-component'
import axios from 'axios'
import AdminDropdown from '../Admin/Navigation/AdminDropdown.vue'

export default {
    name: 'Navigation',

    components: { Avatar, AdminDropdown, },

    data: () => ({
    drawer: false,
    // group: null,
    userHasImage: false,
    user: null,
    token: null,
    hasSession: false,
    }),

    watch: {
        // group () {
        //     this.drawer = false
        // },
        currentRouteName() {
            this.getUser()
            this.getToken()
            this.hasSessionCheck()
        },
    },

    computed: {
        ...mapGetters({
            layoutState: 'getLayoutState',
            hideNav: 'getHideNavState',
        }),
        currentRouteName() {
            return this.$route.name;
        },
        userInSession() {
            return this.$session.get('user')
        }
    },

    methods: {
        changeLayout() {
            this.$store.dispatch('setLayoutState', this.layoutState)
            console.log('state changed', this.layoutState)
        },
        hasSessionCheck() {
            if(this.$session.has('token')) {
                this.hasSession =  true
            } else {
                this.hasSession =  false
            }
        },
        getUser() {
            this.user =  this.$session.get('user')
        },
        getToken() {
            this.token =  this.$session.get('token')
        },
        async logout() {
            await axios.post(process.env.VUE_APP_API_URL+'/users/logout', this.user, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${this.token}`,
            }
            })
            .then(() => {
                // console.log(response.data.message);
                this.$session.destroy()
                this.$router.go('/login')
            })
            .catch((error) => {
                console.log(error.response.data);
            })
        }
    }
}
</script>

<style>

</style>