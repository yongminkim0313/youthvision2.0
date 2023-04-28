import Vue from 'vue'
import VueRouter from 'vue-router'
// import HelloWorld from './components/HelloWorld'
// import UserHeader from './components/UserHeader'
import UserFooter from './components/UserFooter'
import Home from './views/Home.vue'
import ConnectLog from './components/ConnectLog.vue'
import CampLive from './views/CampLive.vue'
import NewsCast from './views/NewsCast.vue'
import AplyCamp from './views/AplyCamp.vue'
import MyAplyList from './views/MyAplyList.vue'
import AplyPoster from './views/AplyPoster.vue'
import Board from './views/Board.vue'
import About from './views/About.vue'
import FAQ from './views/FAQ.vue'
import Youthvision from './views/Youthvision.vue'
import Admin from './views/admin/Admin.vue'
Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Home",
        components: {
            default: Home,
            footer: UserFooter
        }
    },
    {
        path: "/connectLog",
        name: "ConnectLog",
        components: {
            default: ConnectLog,
            footer: UserFooter
        }
    },
    {
        path: "/aplyCamp",
        name: "AplyCamp",
        components: {
            default: AplyCamp,
            footer: UserFooter
        }
    },
    {
        path: "/campLive",
        name: "CampLive",
        components: {
            default: CampLive,
            footer: UserFooter
        }
    },
    {
        path: "/myAplyList",
        name: "MyAplyList",
        components: {
            default: MyAplyList,
            footer: UserFooter
        }
    },
    {
        path: "/aplyPoster",
        name: "AplyPoster",
        components: {
            default: AplyPoster,
            footer: UserFooter
        }
    },
    {
        path: "/board",
        name: "Board",
        components: {
            default: Board,
            footer: UserFooter
        }
    },
    {
        path: "/about",
        name: "About",
        components: {
            default: About,
            footer: UserFooter
        },
        meta: { unauthorized: true }
        ,props: true
    },
    {
        path: "/newsCast",
        name: "NewsCast",
        components: {
            default: NewsCast,
            footer: UserFooter
        },
        meta: { unauthorized: true }
        ,props: true
    },
    {
        path: "/FAQ",
        name: "FAQ",
        components: {
            default: FAQ,
            footer: UserFooter
        },
        meta: { unauthorized: true }
        ,props: true
    },
    {
        path: "/youthvision",
        name: "YOUTHVISION",
        components: {
            default: Youthvision,
            footer: UserFooter
        },
        meta: { unauthorized: true }
        ,props: true
    },
    {
        path: "/admin",
        name: "Admin",
        components: {
            default: Admin,
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