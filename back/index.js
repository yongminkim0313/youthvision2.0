require("dotenv").config();
var path = require('path');
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const axios = require('axios');
const logger = require('./modules/winstonConfig');
const db = require('./modules/dbConnect');

const { initializeApp } = require('firebase/app');
const { getDatabase, ref, onChildAdded, set, get } = require('firebase/database');
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

const app = express();
app.use(cors({origin:'*'}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')));
app.use(session({
    secret: 'youthvision-kr',
    resave: false,
    saveUninitialized: false, 
    cookie: {
        secure: false,
        maxAge : 1000* 60 * 60 
    }
}));
app.get('*', (req, res, next) => {
    if(req.url.indexOf('/auth') >-1 ){
        next();
        return;
    }
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

const options = { maxHttpBufferSize: 1e8, cors: { origin: '*', }, cookie: true }; //1e6: 1MB
const server = require('http').createServer(app);
const io = require('socket.io')(server, options);
server.listen(4000);
io.on('connection', socket => {
    logger.info(`socket.io connected`);
    socket.on('disconnect', () => { 
        logger.info("@ socket disconnect @@@@"); 
    });
    socket.on('reconnecting', () => { logger.info("@ socket reconnecting @@@@"); });
    socket.on('reconnection', () => { logger.info("@ socket reconnection @@@@"); });
    
    function substrBack(str){
        return str.substring(str.length-2, str.length)
    }
    var today = new Date();
    var todayFm = today.getFullYear() +'-'
        + substrBack('0'+(today.getMonth()+1)) + '-' 
        + substrBack('0'+today.getDate());

    // get(ref(fireDB,'posts/common/connectLog/'+todayFm))
    // .then((snapshot)=>{
    //     if (snapshot.exists()) {winston
    //         socket.emit('getConnectLog',snapshot.val());
    //         console.log('onValue::',snapshot.val());
    //     } else {
    //         console.log("No data available");
    //     }
    // });
    onChildAdded(ref(fireDB,'posts/common/connectLog/'+todayFm)
    ,(snapshot)=>{
        var data = snapshot.val();
          //console.log('onChildAdded::',data);
          socket.emit('addConnectLog',data);
     });
    
});

app.post('/api/conectLog', (req, res) =>{
    db.setData('conectLog', 'insertConectLog', req.body)
    .then(function(row) {
        //console.log(row);
        res.status(200).json('success');
    })
    .catch(err=>{
        res.status(400).json(Error(err))
    });

    function substrBack(str){
        return str.substring(str.length-2, str.length)
    }

    var today = new Date();
    var todayFm = today.getFullYear() +'-'
        + substrBack('0'+(today.getMonth()+1)) + '-' 
        + substrBack('0'+today.getDate());
    set(ref(fireDB,'posts/common/connectLog/'+todayFm+'/'+req.body.conectDt),req.body);
})

app.get('/api/campAply',(req,res)=>{
    console.log('res.query',req.query);
    db.getList('campAply','selectCampAply', req.body)
    .then(function(row) {
        res.status(200).json(row);
    })
    .catch(err=>{
        res.status(400).json(Error(err))
    });

})

app.get('/auth/kakao/callback', async(req, res) => {
    // onChildAdded(ref(fireDB,'posts/common/connectLog/'+todayFm)
    // ,(snapshot)=>{
    //     var data = snapshot.val();
    //       //console.log('onChildAdded::',data);
    //       socket.emit('addConnectLog',data);
    //  });
    
    try {
        const response = await axios({
            method: "post",
            url: "https://kauth.kakao.com/oauth/token", // 서버
            headers: { 'Content-type': 'application/x-www-form-urlencoded;charset=utf-8' }, // 요청 헤더 설정
            params: {
                grant_type: 'authorization_code',
                client_id: `${process.env.client_id}`,
                redirect_uri: `${process.env.redirect_uri}`,
                code: req.query.code
            },
        });
        const access_token = response.data.access_token;
        const refresh_token = response.data.refresh_token;
        console.log(response.data);
        const response2 = await axios({
            method: "post",
            url: "https://kapi.kakao.com/v2/user/me", // 서버
            headers: {
                'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
                'Authorization': `Bearer ${access_token}`
            }, // 요청 헤더 설정
            params: {
                secure_resource: true,
                property_keys: `${process.env.property_keys}`
            },
        });
        
        req.session.kakaoId         = response2.data.id
        req.session.name            = response2.data.kakao_account.profile.nickname
        req.session.email           = response2.data.kakao_account.email?response2.data.kakao_account.email:response2.data.id
        req.session.profileImage    = response2.data.kakao_account.profile.profile_image_url
        req.session.nickname        = response2.data.kakao_account.profile.nickname
        req.session.accessToken     = `${access_token}`;
        req.session.refreshToken    = `${refresh_token}`;
        req.session.type            = 'kakao';
        req.session.auth            = 'user';
        
    // //     var user = await User.findOne({id: response2.data.id});
    // //     if(user) req.session.auth = user.auth;
    // //     if(req.session.email=='kimyongmin1@kakao.com') req.session.auth = 'admin';
        
        req.session.save(function() {
            res.cookie('isLogin',true);
            res.redirect('/');
        });

    } catch (err) {
        logger.error("Error >>" + err);
    }
});

app.get('/auth/logout', async(req, res) => {
    const accessToken = req.session.accessToken;
    console.log('accessToken::::::::',accessToken);
    try {
        const response2 = await axios({
            method: "post",
            url: "https://kapi.kakao.com/v1/user/logout", // 서버
            headers: { 'Authorization': `Bearer ${accessToken}` }, // 요청 헤더 설정
        });
        logger.info('logout:::::'+response2.status);
        req.session.destroy(function(err) {
            if (err) throw err;
        });
    } catch (err) {
        logger.error("Error >>" + err);
    }
    req.session.save(function() {
        res.cookie('isLogin',false);
        res.redirect('/');
    });
});

app.listen(process.env.SERVER_PORT,()=>{
    console.log(`server start! port:${process.env.SERVER_PORT}`)
})
