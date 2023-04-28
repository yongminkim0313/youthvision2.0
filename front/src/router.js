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
        name: "홈",
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
        name: "캠프신청",
        components: {
            default: AplyCamp,
            footer: UserFooter
        }
    },
    {
        path: "/campLive",
        name: "캠프라이브",
        components: {
            default: CampLive,
            footer: UserFooter
        }
    },
    {
        path: "/myAplyList",
        name: "나의신청정보",
        components: {
            default: MyAplyList,
            footer: UserFooter
        }
    },
    {
        path: "/aplyPoster",
        name: "포스터신청",
        components: {
            default: AplyPoster,
            footer: UserFooter
        }
    },
    {
        path: "/board",
        name: "게시판",
        components: {
            default: Board,
            footer: UserFooter
        }
    },
    {
        path: "/about",
        name: "초대의글",
        components: {
            default: About,
            footer: UserFooter
        },
        meta: { unauthorized: true }
        ,props: true
    },
    {
        path: "/newsCast",
        name: "뉴스캐스트",
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
        name: "유스비전 소개",
        components: {
            default: Youthvision,
            footer: UserFooter
        },
        meta: { unauthorized: true }
        ,props: true
    },
    {
        path: "/admin",
        name: "관리자페이지",
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