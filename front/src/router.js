import Vue from 'vue'
import VueRouter from 'vue-router'
// import HelloWorld from './components/HelloWorld'
import UserHeader from './components/UserHeader'
import UserFooter from './components/UserFooter'
import Home from './views/Home.vue'
import User from './views/User.vue'
import ConnectLog from './components/ConnectLog.vue'
import CampLive from './views/CampLive.vue'
import AplyCamp from './views/AplyCamp.vue'
import MyAplyList from './views/MyAplyList.vue'

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
            default: ConnectLog,
            footer: null
        }
    },
    {
        path: "/user",
        name: "User",
        components: {
            header: UserHeader,
            default: User,
            footer: null
        }
    },
    {
        path: "/aplyCamp",
        name: "AplyCamp",
        components: {
            header: UserHeader,
            default: AplyCamp,
            footer: null
        }
    },
    {
        path: "/campLive",
        name: "CampLive",
        components: {
            header: UserHeader,
            default: CampLive,
            footer: null
        }
    },
    {
        path: "/myAplyList",
        name: "MyAplyList",
        components: {
            header: UserHeader,
            default: MyAplyList,
            footer: null
        }
    },
]

export default new VueRouter({
    mode: 'history',
    routes
});