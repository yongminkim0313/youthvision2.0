import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import vueCookies from 'vue-cookies'
import { v4 } from 'uuid'
import { UAParser } from 'ua-parser-js'
import axios from 'axios'
import io from "socket.io-client";
import common from "./common"


Vue.config.productionTip = false;
Vue.prototype.APP_URL = process.env.VUE_APP_API_URL;
Vue.use(vueCookies);
Vue.prototype.$axios = axios;
Vue.prototype.$common = common;
Vue.directive('scroll', {
  inserted: function (el, binding) {
      let f = function (evt) {
        if (binding.value(evt, el)) {
            window.removeEventListener('scroll', f)
        }
      }
      window.addEventListener('scroll', f)
  }
});

router.beforeEach(async (to,from, next) => { // router interceptor
  var todayFm = common.getDateTime();
  var ua = new UAParser()
  if(!Vue.$cookies.get('tmpr_cookie')) Vue.$cookies.set('tmpr_cookie',v4(),0, null, null, null, 'Strict');
  if(!Vue.$cookies.get('prmanent_cookie')) Vue.$cookies.set('prmanent_cookie',v4(), 60 * 60 * 24 * 365, null, null, null, 'Strict');
  // var {data} = await axios.get('https://api.ipify.org?format=json');
  // var userIp = data.ip;
  // var uaOS = ua.getOS();
  // var conectLog = {
  //   'conectUrl' : to.path,
  //   'conectDt': todayFm,
  //   'menuNm' : to.name,
  //   'osKnd' : uaOS.name,
  //   'osNm' : uaOS.name + ' ' + uaOS.version,
  //   'browserNm' : ua.getBrowser().name,
  //   'ipAdres' : userIp,
  //   'refUrl' : document.referrer,
  //   'prmanentCookie' : Vue.$cookies.get('prmanent_cookie'),
  //   'tmprCookie' : Vue.$cookies.get('tmpr_cookie')
  // }
  // axios.post('/api/conectLog',conectLog)
  console.log('socket is complate')
  if(!Vue.prototype.$socket){
    Vue.prototype.$socket = io(process.env.VUE_APP_SOCKET_URL,{
        autoConnect: true,
        query: {isLogin:true },
    });
}
  axios.get('/auth/user/info') .then((res)=>{ 
    localStorage.setItem("kakaoId", res.data['kakaoId'])
    localStorage.setItem("name", res.data['name'])
    localStorage.setItem("auth", res.data['auth'])
    console.log(res); 
    next();
  })
})

new Vue({ router, vuetify, render: h => h(App) }).$mount('#app')

Vue.prototype.$eventBus = new Vue();
// 디바운싱: 이벤트가 맨 마지막에만 발생하도록!
let timer;
window.addEventListener("scroll", () => {   
  if (!timer) {
      timer = setTimeout(() => {
          timer = null;
          var p = window.pageYOffset/window.innerHeight;
          Vue.prototype.$eventBus.$emit('scrollValue',p);
      }, 500);
  }
  // if (timer) {   
  //     clearTimeout(timer); 
  // }
  // timer = setTimeout(() => {
  //     // const scrollValue = document.documentElement.scrollTop;
  //     var p = window.pageYOffset/window.innerHeight;
  //     Vue.prototype.$eventBus.$emit('scrollValue',p);
  // }, 200);
})

