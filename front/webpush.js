import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onChildAdded, set, get, onValue, child, push } from 'firebase/database';

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