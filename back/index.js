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
const fs = require('fs');

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

function logErrors(err, req, res, next) {
    console.error(err.stack);
    next(err);
}
function clientErrorHandler(err, req, res, next) {
    if (req.xhr) {
        res.status(500).send({ error: 'Something failed!' });
    } else {
        next(err);
    }
}
function errorHandler(err, req, res, next) {
    res.status(500);
    res.render('error', { error: err });
}
app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);
  
require('./modules/socketConfig')(app,logger);
app.get('*', (req, res, next) => {
    if(req.url.indexOf('/auth') >-1 || req.url.indexOf('/api') >-1){
        next();
        return;
    }else{
        res.sendFile(path.join(__dirname, '/public/index.html'));
    }
});
app.post('*', (req, res, next) => {
    const kakaoId = req.session.kakaoId;
    console.log('req.method: ', req.method, 'req.session.kakaoId: ', kakaoId);
    if(!kakaoId){
        console.log('로그인 상태가 아닙니다.');
        res.status(500).send({ error: '로그인 상태가 아닙니다.' });
        return;
    }else{
        req.body['kakaoId'] = kakaoId; //카카오아이디 추가
        next();
    }
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
        req.body['rgtrNm'] = req.session.nickname;
        req.body['rgtrDt'] = common.getDateTime();
        req.body['updtNm'] = req.session.nickname;
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
        req.session.kakaoId           = userInfo.data.id
        req.session.nickname          = userInfo.data.kakao_account.profile.nickname
        req.session.accessToken       = `${access_token}`;
        req.session.refreshToken      = `${refresh_token}`;
        req.session.email             = userInfo.data.kakao_account.email;
        req.session.thumbnailImageUrl = userInfo.data.kakao_account.profile.thumbnail_image_url;
        req.session.gender            = userInfo.data.kakao_account.gender;
        var adminList = ['cnalgus1004@naver.com','kimyongmin1@kakao.com','yjcm00@hanmail.net'];
        console.log(userInfo.data.kakao_account.email);
        if(adminList.indexOf(userInfo.data.kakao_account.email) > -1){
            req.session.auth = 'admin';
            res.cookie('auth','admin');
        }else{
            req.session.auth = 'user';
            res.cookie('auth','user');
        }
        // logger.info(userInfo.data);
        // set(ref(fireDB,`posts/common/kakaologin/${userInfo.data.id}`),userInfo.data);
        db.getData('user','selectUser',req.session)
        .then((row)=>{
            console.log('selectUser', row);
            if(row){
                db.setData('user','updateUser',req.session);
            }else{
                db.setData('user','insertUser',req.session);
            }
        })
        req.session.save(function() {
            res.cookie('isLogin','001');
            res.redirect('/');
        });

    } catch (err) {
        logger.error("/auth/kakao/callback Error >>" + err);
    }
});

app.get('/api/auth/logout', async(req, res) => {
    const accessToken = req.session.accessToken;
    console.log('accessToken::::::::',accessToken);
    req.session.kakaoId         = null
    req.session.nickname            = null
    req.session.email           = null
    req.session.auth            = 'guest'
    req.session.save(function() {
        res.cookie('isLogin','002');
        res.cookie('auth','guest')
        res.redirect('/');
    });
});

app.post('/auth/myKakaoMsgAgree', async(req,res) => { //동의항목 가져오기
    const accessToken = req.session.accessToken;
    console.log('accessToken::::::::',accessToken);

    var result = await kakao.agree(accessToken);    
    res.status(200).json({result: result});
});

app.get('/auth/user/info', (req,res)=>{
    res.status(200).json(req.session);
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
    if(req.session.auth != 'admin'){
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
        aply['uuid']='';
    })
    res.status(200).json(aplyList);
})
app.get('/api/user/aply/poster',async(req, res)=>{
    if(!req.session) return;
    var aplyList = await db.getList('campAply','selectCampAplyToPoster', req.session);
    res.status(200).json(aplyList);
})

app.post('/api/user/aply/poster', async(req,res)=>{
    var aplyContents = {
        brochureCnt: req.body['brochureCnt'],
        posterCnt: req.body['posterCnt'],
        aplyName: req.body['aplyName'],
        church: req.body['church'],
        addr: req.body['addr'],
        dtlAddr: req.body['dtlAddr'],
        phone: req.body['phone'],
        email: req.body['email'],
      }
    db.setData('campAply','insertAplyPoster', aplyContents )
    .then(function(row) {console.log(row)})
    res.status(200).json({msg:'success'});
})

app.post('/api/admin/aply/excel', async(req, res) => {
    const excelService = require('./services/excelService');
    try{
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
        const report = await excelService.makeExcelFile(aplyList);
        res.status(200).json({content: report.toString('base64'), filename: 'testFile', result:true});
    } catch (err) {
        logger.error("Error >>" + err);
        res.status(400).json({msg: '캠프신청 불러오기 실패'});
    }
});

app.put('/api/admin/aply/one/prgrs', async(req, res)=>{
    if(req.session.auth != "admin"){
        res.status(400).json({msg: '관리자가 아닙니다'});
        return;
    } 

    const { body: { aplyPrgrs, seq } } = req;
    console.log(aplyPrgrs, seq);
    db.setData('campAply','updateAplyCampPrgrs', {aplyPrgrs:aplyPrgrs, seq:seq} )
    .then(function(row) {
        res.status(200).json({msg: '접수상태 변경 성공'});
    })
})

app.put('/api/admin/aply/one', async(req, res)=>{
    if(req.session.auth != "admin"){
        res.status(400).json({msg: '관리자가 아닙니다'});
        return;
    } 
    console.log(req.body);
    db.setData('campAply','updateCampCnt', req.body.campCnt )
    
    db.setData('campAply','updateAplyCamp', req.body )
    .then(function(row) {
        res.status(200).json({msg: '변경 성공'});
    })
})

app.post('/api/admin/message/send', async(req,res) => {
    const {body: {uuid, args,templateId},session: {accessToken}} = req;

    try {
        const response = await axios({
            method: "post",
            url: "https://kapi.kakao.com/v1/api/talk/friends/message/send", // 서버
            headers: {
                'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
                'Authorization': `Bearer ${accessToken}`
            },
            params:{
                    receiver_uuids: '["'+uuid+'"]',
                    template_id : templateId,
                    template_args : args
                }
        });
        console.log('response::',response.data);
        res.status(200).json(response.data);
    } catch (err) {
        logger.error("Error >>" + err);
        console.log(err);
        res.status(401).json(err);
    }
    
})

app.post('/api/talk/friends', async(req,res) => {
    logger.info(req.session.auth);
    if(req.session.auth != 'admin'){
        console.log('관리자가 아닙니다.')
        res.status(200).json([]);
        return; 
    }
    const accessToken = req.session.accessToken;
    try {
        const response = await axios({
            method: "get",
            url: "https://kapi.kakao.com/v1/api/talk/friends", // 서버
            headers: { 'Authorization': `Bearer ${accessToken}` }, // 요청 헤더 설정
        });

        console.log('response::',response.data);
        res.status(200).json(response.data);
    } catch (err) {
        logger.error("Error >>" + err);
        res.status(401).json(err);
    }
    
})

app.get('/api/user/aply/camp/one', async(req,res) => {
    console.log(req.session);
    if(!req.session.kakaoId) return;
    var aply = await db.getData('campAply','selectCampAplyOne', req.session);
    res.status(200).json(aply);
})

app.get('/api/bbs', async(req,res) =>{
    var bbs = await db.getList('bbs','selectBbs', {});
    res.status(200).json(bbs);
})

app.post('/api/bbs', async(req,res) =>{
    console.log('/api/bbs',req.body)
    var bbs = await db.setData('bbs','insertBbs', req.body);
    res.status(200).json('success');
})

app.get('/api/download/:id', async(req, res, next) => {
    try{
        var atchmnfl = await db.getData('bbs','selectAtchmnfl', {atchmnflId: req.params.id, atchmnflSn: 1 });
        console.log(atchmnfl);
        var filePath = path.join(__dirname, atchmnfl.atchmnflPath);
    
        console.log(filePath);
        res.download(filePath, atchmnfl.atchmnflNm,
            (err) => {
                if (err) { res.send({ error : err, msg   : "Problem downloading the file" }) }
            }
        );
    }catch(err){
        console.log(err);
        logger.error(err);
        next(err);
    }
});

app.get('/api/image/:id', async(req,res, next)=>{
    try{
        var atchmnfl = await db.getData('bbs','selectAtchmnfl', {atchmnflId: req.params.id, atchmnflSn: 1 });
        var ext;
        if(atchmnfl){
            var f = atchmnfl.atchmnflNm;
            var l = f.length;
            var dot = f.lastIndexOf('.');
            ext = f.substring(dot+1, l).toLowerCase();
        }else{
            console.log("없는 파일 입니다.")
            res.send('image xx');
            return;
        }

        var imgExtList = ['jpg','png','jpeg'];
        console.log(imgExtList.indexOf(ext));
        if(imgExtList.indexOf(ext) > -1){
            var filePath = path.join(__dirname, atchmnfl.atchmnflPath);
            res.sendFile(filePath);
        }else{
            console.log("이미지 파일이 아닙니다.")
            res.send('no image');
            return;
        }
    }catch(err){
        console.log(err);
        logger.error(err);
        next(err);
    }
})
app.put('/api/bbs/cnt',(req,res)=>{
    const { body:{idx} } = req;
    db.setData('bbs','updateBbsClickCnt',{idx:idx});
    res.status(200).send('cnt +1');
})
app.delete('/api/bbs/:idx',(req,res)=>{
    const {params : { idx }} = req;
    console.log(req.session);
    logger.info('delete : ' + idx );
    db.setData('bbs','deleteBbs',{idx:idx});
    res.status(200).send('delete!! '+idx);
})
app.post('/api/bbs/reply', async(req,res) =>{
    console.log('/api/bbs/reply',req.body)
    var bbs = await db.setData('bbs','insertBbsReply', req.body);
    res.status(200).json('success');
})
app.get('/api/bbs/reply', async(req,res) =>{
    var bbsReply = await db.getList('bbs','selectBbsReply', req.query);
    res.status(200).json(bbsReply);
})
app.listen(process.env.SERVER_PORT,()=>{
    logger.info(`server start! port:${process.env.SERVER_PORT}`)
})
