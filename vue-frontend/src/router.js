import Vue from 'vue'
import VueRouter from 'vue-router'

// import pages
import Logon from './pages/Logon'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Account from './pages/Account'
import InicidentNew from './pages/NewIncident'
import IncidentEdit from './pages/EditInicident'

import PageNotFound from './pages/Errors/404'

import isAuthenticated from './services/auth'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Login',
        component: Logon,
        meta: {
            guest: true
        }
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
        meta: {
            guest: true
        }
    },
    { 
        path: '/profile',
        name: 'Profile',
        component: Profile,
        meta: {
            authenticated: true
        }
    },
    { 
        path: '/account',
        name: 'Account',
        component: Account,
        meta: {
            authenticated: true
        }
    },
    { 
        path: '/incidents',
        name: 'IncidentEdit',
        component: IncidentEdit,
        meta: {
            authenticated: true
        }
    },
    { 
        path: '/incidents/new',
        name: 'IncidentNew',
        component: InicidentNew,
        meta: {
            authenticated: true
        }
    },
    { 
        path: "*",
        component: PageNotFound,
     }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.authenticated)) {
        if (isAuthenticated() === false) {
            next({ name: 'Login' })
        } else {
            next()
        }
    } else if(to.matched.some(record => record.meta.guest)) {
        if(isAuthenticated() === false){
            next()
        } else {
            next({ name: 'Profile'})
        }
    } else {
        next()
    }
})

export default router
