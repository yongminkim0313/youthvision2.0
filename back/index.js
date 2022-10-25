require("dotenv").config();
var path = require('path');
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const axios = require('axios');
const logger = require('./modules/winstonConfig');
const db = require('./modules/dbConnect');
const kakao = require('./services/kakaoService');
const common = require('./services/commonService');

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
    if(req.url.indexOf('/auth') >-1 || req.url.indexOf('/api') >-1){
        next();
        return;
    }else{
        res.sendFile(path.join(__dirname, '/public/index.html'));
    }
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
    var todayFm = common.getDate();
    onChildAdded(ref(fireDB,'posts/common/connectLog/'+common.getDate())
    ,(snapshot)=>{
        var data = snapshot.val();
          //console.log('onChildAdded::',data);
          socket.emit('addConnectLog',data);
     });
    
});

app.get('/api/conectLog/key', (req, res) =>{
    get(ref(fireDB,'posts/common/connectLog/'))
    .then((snapshot)=>{
        if (snapshot.exists()) {
            res.status(200).json(Object.keys(snapshot.val()));
        } else {
            console.log("No data available");
            res.status(401).json({msg:"No data available"});
        }
    });
})

app.get('/api/conectLog', (req, res) =>{
    get(ref(fireDB,'posts/common/connectLog/'+req.query.dt))
    .then((snapshot)=>{
        if (snapshot.exists()) {
            res.status(200).json(snapshot.val());
        } else {
            console.log("No data available");
            res.status(401).json({msg:"No data available"});
        }
    });
})

app.post('/api/conectLog', (req, res) =>{
    db.setData('conectLog', 'insertConectLog', req.body)
    .then(function(row) {
        res.status(200).json('success');
    })
    .catch(err=>{
        res.status(400).json(Error(err))
    });

    set(ref(fireDB,'posts/common/connectLog/'+common.getDate()+'/'+req.body.conectDt),req.body);
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
    const { headers: { cookie } } = req;
    if (cookie) {
        const values = cookie.split(';').reduce((res, item) => {
            const data = item.trim().split('=');
            return { ...res, [data[0]]: data[1] };
        }, {});
        logger.info(values);
    }
    try {
        const response = await kakao.getToken(req.query.code);
        const access_token = response.data.access_token;
        const refresh_token = response.data.refresh_token;
        const userInfo = await kakao.getUserInfo(access_token);
        
        req.session.kakaoId         = userInfo.data.id
        req.session.name            = userInfo.data.kakao_account.profile.nickname
        req.session.accessToken     = `${access_token}`;
        req.session.refreshToken    = `${refresh_token}`;
    // //     var user = await User.findOne({id: userInfo.data.id});
    // //     if(user) req.session.auth = user.auth;
    // //     if(req.session.email=='kimyongmin1@kakao.com') req.session.auth = 'admin';
        userInfo.data.last_connect_dt = common.getDateTime();
        userInfo.data.prmanent_cookie = common.getPrmanentCookie(req);
        logger.info(userInfo.data);
        set(ref(fireDB,`posts/common/kakaologin/${userInfo.data.id}`),userInfo.data);

        req.session.save(function() {
            res.cookie('isLogin','001');
            res.redirect('/');
        });

    } catch (err) {
        logger.error("/auth/kakao/callback Error >>" + err);
    }
});

app.get('/auth/logout', async(req, res) => {
    const accessToken = req.session.accessToken;
    console.log('accessToken::::::::',accessToken);
    
    req.session.save(function() {
        res.cookie('isLogin','002');
        res.redirect('/');
    });
    
    // var result;
    // if(accessToken){
    //     result = await kakao.logout(accessToken);
    // }
    // res.status(200).json(result);
});

app.post('/auth/myKakaoMsgAgree', async(req,res) => { //동의항목 가져오기
    const accessToken = req.session.accessToken;
    console.log('accessToken::::::::',accessToken);

    var result = await kakao.agree(accessToken);    
    res.status(200).json({result: result});
});

app.get('/auth/user/info', (req,res)=>{
    res.status(200).json({userInfo: req.session.name});
})



app.listen(process.env.SERVER_PORT,()=>{
    logger.info(`server start! port:${process.env.SERVER_PORT}`)
})
