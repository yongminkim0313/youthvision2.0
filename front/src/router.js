import Vue from 'vue'
import VueRouter from 'vue-router'
// import HelloWorld from './components/HelloWorld'
import UserHeader from './components/UserHeader'
import UserFooter from './components/UserFooter'
import Home from './views/Home.vue'
import connectLog from './components/ConnectLog.vue'

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Home",
        components: {
            header: UserHeader,
            default: Home,
            footer: null
        }
    },
    {
        path: "/connectLog",
        name: "ConnectLog",
        components: {
            header: null,
            default: connectLog,
            footer: null
        }
    }
]

export default new VueRouter({
    mode: 'history',
    routes
});