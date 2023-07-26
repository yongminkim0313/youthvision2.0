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
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onChildAdded, set, get, onValue, child, push } from 'firebase/database';

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

const firebaseConfig = {
    apiKey: "AIzaSyBz9iJl2SDU9NAgzDcMp7vP0OLdWRL9inU",
    authDomain: "youthvisionkr.firebaseapp.com",
    databaseURL: "https://youthvisionkr-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "youthvisionkr",
    storageBucket: "youthvisionkr.appspot.com",
    messagingSenderId: "872270613716",
    appId: "1:872270613716:web:47cc7435673ac20834bf41",
    measurementId: "G-RV8DQS8YX7"
};
initializeApp(firebaseConfig);
const fireDB = getDatabase();

Vue.prototype.$fireDB = {
  set : function(path,data){
    return new Promise(function(resolve, reject){
      set(ref(fireDB,path),data);
      resolve('success!!');
    })
  },
  get : function(path){
    return new Promise(function(resolve, reject){
      get(child(ref(getDatabase()), path)).then((snapshot)=>{
        if (snapshot.exists()) {
          const data = snapshot.val();
          resolve(data);
        } else {
          reject("No data available");
        }
      })
    });
  },
  onValue : function(path, fn){
    return onValue(ref(fireDB, path), fn);
  },
  push : function(path, data){
    return new Promise(function(resolve, reject){
      set(push(ref(getDatabase(), path)), data);
      resolve('success!!');
    })
  }
}
Vue.prototype.$webPush = {
  publicVapidKey:"BKr0X9xxLDeBlo9K-XVBj9RvR5NtO-0scX8J6uq5sNZEIWGIAgwsAOASnN7lIDOj33Ah3vr_PDYGvbhYaxgu8Hg",
  init: function(){
    var _this = this;
    return new Promise(function(resolve, reject){
      if ("serviceWorker" in navigator) {
        _this.regist().then(()=>{
          resolve('init');
        }).catch((err) => console.error(err));
      }
    })
  },
  regist: async function(){// 서비스워커 등록, 푸쉬 등록, 푸쉬 보내기
    var register = await navigator.serviceWorker.register("/worker.js", { scope: "/", });// 서비스워커 등록
    this.subscription = await register.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: this.urlBase64ToUint8Array(this.publicVapidKey)});// 푸쉬 등록
  },
  subscription: Object,
  send: async function(obj){
    var welcomeMsg = { title: '[YOUTHVISION] 환영합니다.', message:'2023년 여름캠프 신청이 시작되었습니다.' };
    if(obj){
      welcomeMsg = obj;
    }
    await axios.post('/api/subscribe',{subscription: this.subscription, msg: welcomeMsg})// 푸쉬 보내기
  },
  urlBase64ToUint8Array: function(base64String){ // Vapid key를 안전하게 base64 스트링을 Unit8Array로 변환..
    var padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    var base64 = (base64String + padding) .replace(/\-/g, "+") .replace(/_/g, "/");
    var rawData = window.atob(base64);
    var outputArray = new Uint8Array(rawData.length);
    for (var i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  },
}


router.beforeEach(async (to,from, next) => { // router interceptor
  document.title = 'YOUTHVISION | '+to.name;
  var todayFm = common.getDateTime();
  var ua = new UAParser()
  if(!Vue.$cookies.get('tmpr_cookie')) Vue.$cookies.set('tmpr_cookie',v4(),0, null, null, null, 'Strict');
  if(!Vue.$cookies.get('prmanent_cookie')) Vue.$cookies.set('prmanent_cookie',v4(), 60 * 60 * 24 * 365, null, null, null, 'Strict');
  var uaOS = ua.getOS();
  var conectLog = {
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
  axios.post('/api/conectLog',conectLog)
  axios.get('/api/auth/user/info') 
  .then((res)=>{ 
    res.data['isLogin'] = res.data['kakaoId']?true:false;
    //console.log(res.data); 
    Vue.prototype.$eventBus.$emit('userInfo',res.data)
    if(!Vue.prototype.$socket){ 
      
      Vue.prototype.$webPush.init().then((msg)=>{
        console.log(msg);
        if(res.data['isLogin']){
          Vue.prototype.$webPush.send({ title: JSON.stringify(res.data.nickname)+'님', message: '환영합니다^^'});
        }
      })

      Vue.prototype.$socket = io(process.env.VUE_APP_SOCKET_URL,{
          autoConnect: true,
          query: res.data,
          path: "/my-ws",
      });

      Vue.prototype.$socket.on("disconnect", () => {
        console.log('disconnect');
        Vue.prototype.$eventBus.$emit('userInfo',{isLogin : false, auth : 'guest'})
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

new Vue({ router, vuetify, render: h => h(App) }).$mount('#app');



Vue.prototype.navi = function (){
  console.log('navi');
  Kakao.Navi.start({ name:"침신대", x:126.92287320297946, y:37.55737651736918, coordType:'wgs84' });
}

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

