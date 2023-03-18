import Vue from 'vue'
import VueRouter from 'vue-router'
// import HelloWorld from './components/HelloWorld'
import UserHeader from './components/UserHeader'
import UserFooter from './components/UserFooter'
import Home from './views/Home.vue'
import User from './views/User.vue'
import ConnectLog from './components/ConnectLog.vue'
import CampLive from './views/CampLive.vue'
import NewsCast from './views/NewsCast.vue'
import AplyCamp from './views/AplyCamp.vue'
import MyAplyList from './views/MyAplyList.vue'
import AplyList from './views/admin/AplyList.vue'
import AplyPoster from './views/AplyPoster.vue'
import Board from './views/Board.vue'
import About from './views/About.vue'
Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Home",
        components: {
            header: UserHeader,
            default: Home,
            footer: UserFooter
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
            footer: UserFooter
        }
    },
    {
        path: "/campLive",
        name: "CampLive",
        components: {
            header: UserHeader,
            default: CampLive,
            footer: UserFooter
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
    {
        path: "/aplyList",
        name: "AplyList",
        components: {
            header: UserHeader,
            default: AplyList,
            footer: null
        }
    },
    {
        path: "/aplyPoster",
        name: "AplyPoster",
        components: {
            header: UserHeader,
            default: AplyPoster,
            footer: null
        }
    },
    {
        path: "/board",
        name: "Board",
        components: {
            header: UserHeader,
            default: Board,
            footer: null
        }
    },
    {
        path: "/about",
        name: "About",
        components: {
            header: UserHeader,
            default: About,
            footer: UserFooter
        },
        meta: { unauthorized: true }
        ,props: true
    },
    {
        path: "/campLive",
        name: "CampLive",
        components: {
            header: UserHeader,
            default: CampLive,
            footer: UserFooter
        },
        meta: { unauthorized: true }
        ,props: true
    },
    {
        path: "/newsCast",
        name: "NewsCast",
        components: {
            header: UserHeader,
            default: NewsCast,
            footer: UserFooter
        },
        meta: { unauthorized: true }
        ,props: true
    },
]

export default new VueRouter({
    mode: 'history',
    routes
});