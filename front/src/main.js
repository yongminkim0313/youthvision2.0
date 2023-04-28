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
axios.interceptors.response.use((res)=>res,(err)=>{
  const {response:{data:{error}}} = err;
  if(error){
    alert(error);
    console.log('error message : ', error);
  } 
  throw err;
})
Vue.prototype.$axios = axios;
Vue.prototype.$common = common;
Vue.prototype.$eventBus = new Vue();
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
  document.title = 'YOUTHVISION | '+to.name;
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
  axios.get('/api/auth/user/info') 
  .then((res)=>{ 
    res.data['isLogin'] = res.data['kakaoId']?true:false;
    //console.log(res.data); 
    Vue.prototype.$eventBus.$emit('userInfo',res.data)
    if(!Vue.prototype.$socket){ 
      Vue.prototype.$socket = io(process.env.VUE_APP_SOCKET_URL,{
          autoConnect: true,
          query: res.data,
      });

      Vue.prototype.$socket.on("disconnect", () => {
        console.log('disconnect');
        Vue.prototype.$eventBus.$emit('userInfo',{isLogin : false, auth : 'guest'})
        localStorage.clear();
        Vue.prototype.$cookies.clear();
        location.href=this.APP_URL+"/api/auth/logout";
      });
    }
    next();
  })
  .catch((err)=>{
    console.log(err);
    alert('사용자정보를 가져올수 없습니다.')
    console.log('사용자정보를 가져올수 없습니다.');
  })
})



export function formatDate(value) {
  const date = new Date(value);
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  month = month > 9 ? month : `0${month}`;
  const day = date.getDate();
  let hours = date.getHours();
  hours = hours > 9 ? hours : `0${hours}`;
  let minutes = date.getMinutes();
  minutes = minutes > 9 ? minutes : `0${minutes}`;
  let seconds = date.getSeconds();
  seconds = seconds > 9 ? seconds : `0${seconds}`;
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

Vue.filter('formatDate',formatDate);

new Vue({ router, vuetify, render: h => h(App) }).$mount('#app')

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

