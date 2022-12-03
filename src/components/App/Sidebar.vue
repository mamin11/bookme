<template>
    <div>
        <!-- Sidebar backdrop (mobile only) -->
        <div class="fixed inset-0 bg-slate-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200" :class="sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'" aria-hidden="true"></div>

        <div
        id="sidebar"
        ref="sidebar"
        class="flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 transform h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-slate-900 p-4 transition-all duration-200 ease-in-out"
        :class="sidebarOpen ? 'translate-x-0' : '-translate-x-64'"
        >
        <!-- Sidebar header -->

        <!-- Links -->
        <div class="space-y-8">
            <v-list
            dark
            color="#0f172a"
            class="h-full"
        nav
        dense
        shaped
        >
        <v-list-item-group
            active-class="red--text text--accent-4"
            class="p-4"
        >
            <div
                color="red"
                class="mb-6 mx-2 flex lg:hidden"
                @click="toggleSidebar"
                >
                <v-icon>mdi-menu-open</v-icon>
                <v-list-item-title class="pl-3 text-sm">close</v-list-item-title>
            </div>
            
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
            v-for="(item, i) in links"
            :key="i"
            class="pb-2"
            :to="item.to"
            :color="$route.name == item.title ? 'red' : ''"
            >
                <v-icon>{{item.icon}}</v-icon>
                <v-list-item-title class="pl-3">{{item.title}}</v-list-item-title>
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
        </div>

        </div>

    </div>
</template>

<script>
    import axios from 'axios'
// import AdminDropdown from '../Admin/Navigation/AdminDropdown.vue'

export default {
    name: 'Sidebar',
    props: ['sidebarOpen'],
    
    data: () => ({
    sidebarExpanded: false,
    userHasImage: false,
    user: null,
    token: null,
    hasSession: false,
    links: [
        {
            icon: "mdi-clock-plus-outline",
            title: "Bookings",
            to: "/booking"
        },
        {
            icon: "mdi-account-group",
            title: "Services",
            to: "/services"
        },
        {
            icon: "mdi-account-group",
            title: "Team",
            to: "/team"
        },
        {
            icon: "mdi-account-multiple",
            title: "Customers",
            to: "/customers"
        },
        {
            icon: "mdi-wrench-clock",
            title: "Timeslots",
            to: "/timeslots"
        },
        {
            icon: "mdi-note-search",
            title: "Files",
            to: "/files"
        },
        {
            icon: "mdi-calendar",
            title: "Calendar",
            to: "/calendar"
        },
        {
            icon: "mdi-cog-outline",
            title: "Settings",
            to: ""
        },
        {
            icon: "mdi-account",
            title: "Profile",
            to: "/my-account"
        },
    ]
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
        currentRouteName() {
            return this.$route.name;
        },
        userInSession() {
            return this.$session.get('user')
        }
    },

    methods: {
        toggleSidebar() {
            this.$emit('toggle-sidebar')
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