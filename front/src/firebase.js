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