import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import vueCookies from 'vue-cookies'
import { v4 } from 'uuid'
import { UAParser } from 'ua-parser-js'
import axios from 'axios'
import io from "socket.io-client";

Vue.config.productionTip = false;

Vue.use(vueCookies);
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

function substrBack(str){
  return str.substring(str.length-2, str.length)
}

// router interceptor
router.beforeEach(async (to,from, next) => {
  // console.log(navigator.userAgent);
  // console.log(document.referrer);
  // console.log(Vue.$cookies)
  // console.log(to, from);

  var today = new Date();
  var todayFm = today.getFullYear() +'-'
    + substrBack('0'+(today.getMonth()+1)) + '-' 
    + substrBack('0'+today.getDate()) + ' '
    + today.getHours() + ':'
    + today.getMinutes() + ':'
    + today.getSeconds();

    var ua = new UAParser()

  if(!Vue.$cookies.get('tmpr_cookie')){
    Vue.$cookies.set('tmpr_cookie',v4(),0, null, null, null, 'Strict');
  }

  if(!Vue.$cookies.get('prmanent_cookie')){
    Vue.$cookies.set('prmanent_cookie',v4(), 60 * 60 * 24 * 365, null, null, null, 'Strict');
  }

  var {data} = await axios.get('https://api.ipify.org?format=json');
  var userIp = data.ip;

  var uaOS = ua.getOS();

  var conectLog = {
    'conectUrl' : to.path,
    'conectDt': todayFm,
    'menuNm' : to.name,
    'osKnd' : uaOS.name,
    'osNm' : uaOS.name + ' ' + uaOS.version,
    'browserNm' : ua.getBrowser().name,
    'ipAdres' : userIp,
    'refUrl' : document.referrer,
    'prmanentCookie' : Vue.$cookies.get('prmanent_cookie'),
    'tmprCookie' : Vue.$cookies.get('tmpr_cookie')
  }

  axios.post('/api/conectLog',conectLog)

  next();
})


if(!Vue.prototype.$socket){
  Vue.prototype.$socket = io(process.env.VUE_APP_SOCKET_URL,{
      autoConnect: false,
      // query: {
      //     loginId         : 1,
      //     name            : '김용민',
      // },
  });
}

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')


