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
const { join } = require("path");
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
// APLY GET start
app.get('/api/campAply/one',(req,res)=>{
    console.log('res.query',req.query);
    db.getData('campAply','selectCampAplyOne', req.query)
    .then(function(row) { res.status(200).json(row); })
    .catch(err=>{ res.status(400).json(Error(err)) });
})

app.get('/api/joinPathSe/one',(req,res)=>{
    console.log('res.query',req.query);
    db.getList('campAply','selectJoinPathSe', req.query)
    .then(function(row) { res.status(200).json(row); })
    .catch(err=>{ res.status(400).json(Error(err)) });
})

app.get('/api/campCnt/one',(req,res)=>{
    console.log('res.query',req.query);
    db.getData('campAply','selectCampCnt', req.query)
    .then(function(row) { res.status(200).json(row); })
    .catch(err=>{ res.status(400).json(Error(err)) }); 
});
// APLY GET end


app.post('/api/campAply',(req,res)=>{
    if(!req.session.kakaoId){
        res.status(200).json({code: -1, msg:'세션이 만료되었습니다. 재 로그인 하시기 바랍니다.'});
        return;
    }
    db.getData('campAply','selectMaxSeq', {})
    .then(function(row) { 
        req.body['seq'] = row.seq+1;
        req.body['aplyTotAmt'] = 0;
        req.body['aplyPrgrs'] = '접수';
        req.body['aplyDt'] = common.getDate();
        req.body['rgtrNm'] = req.session.name;
        req.body['rgtrDt'] = common.getDateTime();
        req.body['updtNm'] = req.session.name;
        req.body['updtDt'] = common.getDateTime();
        req.body['kakaoId'] = req.session.kakaoId
        console.log(req.body);
        
        db.setData('campAply','insertCampAply', req.body)
        .then(function(row) {console.log(row)})
        .catch(err=>{ res.status(400).json(Error(err)) });
        
        req.body['campCnt'].seq = row.seq+1;;
        db.setData('campAply','insertCampCnt', req.body['campCnt'])
        .then(function(row) {console.log(row)})
        .catch(err=>{ res.status(400).json(Error(err)) });
        
        var joinPathSe = req.body['joinPathSe'];
        console.log('joinPathSe', joinPathSe);
        if(joinPathSe[0]){
            db.setData('campAply','insertJoinPathSe', {seq: req.body['seq'], path: joinPathSe[0]})
            .then(function(row) {console.log(row)})
        }
        if(joinPathSe[1]){
            db.setData('campAply','insertJoinPathSe', {seq: req.body['seq'], path: joinPathSe[1]})
            .then(function(row) {console.log(row)})
        }
        if(joinPathSe[2]){
            db.setData('campAply','insertJoinPathSe', {seq: req.body['seq'], path: joinPathSe[2]})
            .then(function(row) {console.log(row)})
        }
        if(joinPathSe[3]){
            db.setData('campAply','insertJoinPathSe', {seq: req.body['seq'], path: joinPathSe[3]})
            .then(function(row) {console.log(row)})
        }
        if(joinPathSe[4]){
            db.setData('campAply','insertJoinPathSe', {seq: req.body['seq'], path: joinPathSe[4]})
            .then(function(row) {console.log(row)})
        }

        res.status(200).json({code: 0, msg:'success! '});
        
    })

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
        console.log(userInfo);
        req.session.kakaoId         = userInfo.data.id
        req.session.name            = userInfo.data.kakao_account.profile.nickname
        req.session.accessToken     = `${access_token}`;
        req.session.refreshToken    = `${refresh_token}`;
        var adminList = ['cnalgus1004@naver.com','kimyongmin1@kakao.com'];
        console.log(userInfo.data.kakao_account.email);
        if(adminList.indexOf(userInfo.data.kakao_account.email) > -1){
            req.session.auth = 'admin';
            res.cookie('auth','admin');
        }else{
            req.session.auth = 'user';
            res.cookie('auth','user');
        }
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

app.get('/api/youtube', (req, res) => {
    const query = req.query;
    db.getList('campLive','selectCampLive', query)
    .then(function(row) {
        res.status(200).json(row);
    })
    .catch(err=>{
        res.status(400).json(Error(err))
    });
});

app.get('/api/admin/aply/all', async (req, res)=>{
    logger.info(req.session.auth);
    if(req.session.auth == 'admin'){
        console.log('관리자가 아닙니다.')
        res.status(200).json([]);
        return;
    }
    var aplyList        = await db.getList('campAply','selectCampAply', {})
    var aplyCampCnt     = await db.getList('campAply','selectCampCnt', {})
    var aplyPathSe      = await db.getList('campAply','selectPathSe', {})
    aplyList.forEach((aply) => {
        var a = aplyCampCnt.find((el, idx, arr)=>{
            return el.seq == aply.seq;
        })
        aply['campCnt'] = a;
        
        var b = aplyPathSe.filter((el) =>{
            return el.seq == aply.seq;
        })
        aply['joinPathSe'] = [];
        b.forEach((el)=>{
            aply['joinPathSe'].push(el.path);
        })
    })
    console.log('aplyList:',aplyList);
    res.status(200).json(aplyList);
})

app.listen(process.env.SERVER_PORT,()=>{
    logger.info(`server start! port:${process.env.SERVER_PORT}`)
})
