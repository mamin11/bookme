import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
  },
  {
    path: '/booking',
    name: 'Booking',
    component: () => import(/* webpackChunkName: "booking" */'../views/Bookings/BookingAdd.vue')
  },
  {
    path: '/team',
    name: 'Team',
    component: () => import(/* webpackChunkName: "team" */ '../views/Team/Team.vue')
  },
  {
    path: '/my-account',
    name: 'My Account',
    meta: {
      requiresAuth: true,
    },
    component: () => import(/* webpackChunkName: "login" */ '../views/Pages/MyAccount.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Pages/Login.vue')
  },
  {
    path: '/verify/:email_verify_url(.*)',
    // props: route => ({ query: route.query.expires }),
    name: 'User Verification',
    component: () => import(/* webpackChunkName: "user-verification" */ '../views/Pages/UserVerification.vue'),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/verification',
    name : 'Verification',
    component: () => import(/* webpackChunkName: "user-verification" */ '../views/Pages/Verification.vue'),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/forgot-password',
    name: 'Forgot Password',
    component: () => import(/* webpackChunkName: "forgot-password" */ '../views/Pages/ForgotPassword.vue')
  },
  {
    path: '/reset-password',
    name: 'Reset Password',
    props: route => ({ query: route.query.token }),
    component: () => import(/* webpackChunkName: "reset-password" */ '../views/Pages/ResetPassword.vue')
  },
  {
    path: '/manage-users',
    name: 'Manage Users',
    component: () => import(/* webpackChunkName: "manage-users" */ '../views/Pages/Admin/ManageUsers.vue'),
    
    meta: {
      requiresAuth: true,
      is_admin : true
    }
  },
  {
    path: '/manage-papers',
    name: 'Manage Papers',
    component: () => import(/* webpackChunkName: "manage-users" */ '../views/Pages/Admin/ManagePapers.vue'),
    
    meta: {
      requiresAuth: true,
      is_admin : true
    }
  },
  {
    path: '/404',
    name: 'Error',
    component: () => import(/* webpackChunkName: "404" */ '../views/Pages/404.vue'),
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth) && to.name !== 'Login') {
        if (JSON.parse(localStorage.getItem('vue-session-key')).token !== undefined ) {
          //if the user has not verified their email  
          if(JSON.parse(localStorage.getItem('vue-session-key')).user.email_verified_at !== null){
            if(to.matched.some(record => record.meta.is_admin) && JSON.parse(localStorage.getItem('vue-session-key')).user.role !== 'admin') {
              next('/404')
            } else {
              next()
            }
          } else {
            next({
              path: '/verification'
            })
          }
        } 
        else {
            next({
              path: '/login',
              // params: { nextUrl: to.fullPath }
          })
        }

  }
  else {
    if (JSON.parse(localStorage.getItem('vue-session-key')).token !== undefined ) {
        if(to.name !== 'Login') {
          next()
        } else {
          //if the user is logged in, dont show them the login page
          next({path: from.fullPath})
        }
    } else {
      next()
    }
    
  }

})

export default router
