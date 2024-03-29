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
  const {response:{data, status}} = err;
  if(status == 401){
    router.push('/');
  }
  console.log(err);
  if(data.msg){
    alert(data.msg);
  } 
  throw err;
})
Vue.prototype.$axios = axios;
Vue.prototype.$common = common;
Vue.prototype.$eventBus = new Vue();
Vue.prototype.$joinMember = new Array();
Vue.prototype.$socket = io(process.env.VUE_APP_SOCKET_URL,{
  reconnectionDelay: 10000,
  autoConnect: true,
  path: "/my-ws",
});

Vue.prototype.$intersection = function(el, fn){
  return new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    // entry의 target으로 DOM에 접근합니다.
    const $target = entry.target;
    // 화면에 노출 상태에 따라 해당 엘리먼트의 class를 컨트롤 합니다.
    console.log(entry.isIntersecting);
    fn(entry.isIntersecting);
    //if (entry.isIntersecting) { } else { }
  });
  },{ threshold: 0.3}).observe(el);
}
;

router.beforeEach(async (to,from, next) => { // router interceptor
  document.title = 'YOUTHVISION | '+to.name;
  var todayFm = common.getDateTime();
  var ua = new UAParser()
  if(!Vue.$cookies.get('tmpr_cookie')) Vue.$cookies.set('tmpr_cookie',v4(),0, null, null, null, 'Strict');
  if(!Vue.$cookies.get('prmanent_cookie')) Vue.$cookies.set('prmanent_cookie',v4(), 60 * 60 * 24 * 365, null, null, null, 'Strict');
  var uaOS = ua.getOS();
  var connectLog = {
    'conectUrl' : to.path,
    'conectDt': todayFm,
    'menuNm' : to.name,
    'osKnd' : uaOS.name,
    'osNm' : uaOS.name + ' ' + uaOS.version,
    'browserNm' : ua.getBrowser().name,
    // 'ipAdres' : userIp,
    'refUrl' : document.referrer,
    'prmanentCookie' : Vue.$cookies.get('prmanent_cookie'),
    'tmprCookie' : Vue.$cookies.get('tmpr_cookie')
  }
  axios.post('/api/common/connectLog',connectLog)
  axios.get('/api/auth/user/info') 
  .then((res)=>{ 
    res.data['isLogin'] = res.data['kakaoId']?true:false;
    Vue.prototype.$eventBus.$emit('userInfo',res.data)
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
  let day = date.getDate();
  day = day > 9 ? day : `0${day}`;
  let hours = date.getHours();
  hours = hours > 9 ? hours : `0${hours}`;
  let minutes = date.getMinutes();
  minutes = minutes > 9 ? minutes : `0${minutes}`;
  let seconds = date.getSeconds();
  seconds = seconds > 9 ? seconds : `0${seconds}`;
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

Vue.filter('formatDate',formatDate);

new Vue({ router, vuetify, render: h => h(App) }).$mount('#app');

Vue.nextTick(function(){
  Vue.prototype.$socket.on('connect', async function (data) { 
    console.log('연결되었습니다.');
    Vue.prototype.$axios.get('/api/public/socket')
    .then(result =>{
      Vue.prototype.$eventBus.$emit('joinMember',result.data);

      Vue.prototype.$socket.on('welcome', async function(data){
          Vue.prototype.$eventBus.$emit('joinMember',data);
      });
      
    })
  });
  
})

Vue.prototype.navi = function (){
  console.log('navi');
  Kakao.Navi.start({ name:"침례신학대학교 교단기념대강당", x:127.324031228478, y:36.3850828115922, coordType:'wgs84' });
}