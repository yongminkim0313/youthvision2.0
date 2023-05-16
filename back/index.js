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
    cookie: { secure: false, maxAge : 1000* 60 * 60 }
}));

function logErrors(err, req, res, next) {
    console.error('logErrors'+err.stack);
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

const adminUrlCheck = function(req,trueCallback,falseCallback){
    var url = req.url, auth= req.session.auth;
    if(url.indexOf('/admin') > -1 && auth != "admin"){
        return falseCallback();
    }
    return trueCallback();
}
/************************* [Start] get, post, put, delte api 설정 **********************/
app.get('*', (req, res, next) => {
    logger.info('url: ' +req.url + ' body: '+ JSON.stringify(req.body)+ ' params: '+JSON.stringify(req.params) +' method: '+ req.method+ ' kakaoId: '+req.session.kakaoId+' auth: '+ req.session.auth);
    if(req.url.indexOf('/auth/kakao/callback') > -1){
        next();
        return;
    }
    if(req.url.indexOf('/api') > -1){
        adminUrlCheck(req, 
            function(){ req.query['kakaoId'] = req.session.kakaoId; next(); },
            function(){ res.status(400).json({msg: '관리자가 아닙니다'}); }
            )
        }else{
            adminUrlCheck(req, 
                function(){ res.sendFile(path.join(__dirname, '/public/index.html')) },
                function(){ new Error('관리자가 아닙니다'); }
                )
            }
        });
app.post('*', (req, res, next) => {
    logger.info('url: ' +req.url + ' body: '+ JSON.stringify(req.body)+ ' params: '+JSON.stringify(req.params) +' method: '+ req.method+ ' kakaoId: '+req.session.kakaoId+' auth: '+ req.session.auth);
    if(!req.session.kakaoId){
        logger.warn('로그인 상태가 아닙니다.')
        res.status(500).send({ error: '로그인 상태가 아닙니다.' });
        return;
    }else{
        adminUrlCheck(req, 
            function(){ 
                req.body['kakaoId'] = req.session.kakaoId; //카카오아이디 추가
                next();
            },
            function(){ res.status(400).json({msg: '관리자가 아닙니다'}); }
            )
        }
    });
    app.put('*', (req, res, next) => {
        logger.info('url: ' +req.url + ' body: '+ JSON.stringify(req.body)+ ' params: '+JSON.stringify(req.params) +' method: '+ req.method+ ' kakaoId: '+req.session.kakaoId+' auth: '+ req.session.auth);
        if(!req.session.kakaoId && !(req.url.indexOf('/cnt') > -1)){
            logger.warn('로그인 상태가 아닙니다.')
            res.status(500).send({ error: '로그인 상태가 아닙니다.' });
            return;
        }else{
            adminUrlCheck(req, 
                function(){ 
                    req.body['kakaoId'] = req.session.kakaoId; //카카오아이디 추가
                    next();
                },
                function(){ res.status(400).json({msg: '관리자가 아닙니다'}); }
            )
        }
    });
    app.delete('*', (req, res, next) => {
        logger.info('url: ' +req.url + ' body: '+ JSON.stringify(req.body)+ ' params: '+JSON.stringify(req.params) +' method: '+ req.method+ ' kakaoId: '+req.session.kakaoId+' auth: '+ req.session.auth);
        if(!req.session.kakaoId){
            logger.warn('로그인 상태가 아닙니다.')
            res.status(500).send({ error: '로그인 상태가 아닙니다.' });
            return;
        }else{
            adminUrlCheck(req, 
            function(){ 
                req.body['kakaoId'] = req.session.kakaoId; //카카오아이디 추가
                next();
            },
            function(){ res.status(400).json({msg: '관리자가 아닙니다'}); }
        )
    }
});
/************************* [End] get, post, put, delte api 설정 **********************/


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
    db.getList('campAply','selectCampAply', req.body)
    .then(function(row) {
        res.status(200).json(row);
    })
    .catch(err=>{
        res.status(400).json(Error(err))
    });
})
app.get('/api/campAply/one',(req,res)=>{
    db.getData('campAply','selectCampAplyOne', req.query)
    .then(function(row) { res.status(200).json(row); })
    .catch(err=>{ res.status(400).json(Error(err)) });
})
app.get('/api/joinPathSe/one',(req,res)=>{
    db.getList('campAply','selectJoinPathSe', req.query)
    .then(function(row) { res.status(200).json(row); })
    .catch(err=>{ res.status(400).json(Error(err)) });
})
app.get('/api/campCnt/one',(req,res)=>{
    db.getData('campAply','selectCampCnt', req.query)
    .then(function(row) { res.status(200).json(row); })
    .catch(err=>{ res.status(400).json(Error(err)) }); 
});
app.post('/api/campAply',async (req,res)=>{
    var {cnt} = await db.getData('campAply','selectCampAplyCntSeq',req.body)
    if( cnt > 0){/** update */
        req.body['aplyTotAmt'] = 0;
        req.body['aplyPrgrs'] = '접수';
        req.body['aplyDt'] = common.getDate();
        req.body['updtNm'] = req.session.nickname;
        req.body['updtDt'] = common.getDateTime();
        req.body['kakaoId'] = req.session.kakaoId
        
        db.setData('campAply','updateCampAply', req.body)
        .then(function(row) {console.log(row)})
        .catch(err=>{ res.status(400).json(Error(err)) });
    
        db.setData('campAply','updateCampCnt', req.body['campCnt'])
        .then(function(row) {console.log(row)})
        .catch(err=>{ res.status(400).json(Error(err)) });

        var result = await db.setData('campAply','deleteJoinPathSe',req.body);

        var joinPathSe = req.body['joinPathSe'];
        console.log('joinPathSe', joinPathSe);
        for(var i = 0 ; i < joinPathSe.length ; i++){
            if(joinPathSe[i]){
                db.setData('campAply','insertJoinPathSe', {seq: req.body['seq'], path: joinPathSe[i]})
                .then(function(row) {console.log(row)})
            }
        }

        res.status(200).json({code: 0, msg:'success! '});
    }else{/** insert */
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
            for(var i = 0 ; i < joinPathSe.length ; i++){
                if(joinPathSe[i]){
                    db.setData('campAply','insertJoinPathSe', {seq: req.body['seq'], path: joinPathSe[i]})
                    .then(function(row) {console.log(row)})
                }
            }
            res.status(200).json({code: 0, msg:'success! '});
        })
    }
            
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
        req.session.kakaoId           = userInfo.data.id
        req.session.nickname          = userInfo.data.kakao_account.profile.nickname
        req.session.accessToken       = `${access_token}`;
        req.session.refreshToken      = `${refresh_token}`;
        req.session.email             = userInfo.data.kakao_account.email;
        req.session.thumbnailImageUrl = userInfo.data.kakao_account.profile.thumbnail_image_url;
        req.session.gender            = userInfo.data.kakao_account.gender;
        logger.info(req.session.kakaoId+' '+req.session.nickname+' '+req.session.email+' '+req.session.gender+' '+req.session.thumbnailImageUrl)
        var adminList = ['cnalgus1004@naver.com','kimyongmin1@kakao.com','yjcm00@hanmail.net'];
        if(adminList.indexOf(userInfo.data.kakao_account.email) > -1){
            req.session.auth = 'admin';
        }else{
            req.session.auth = 'user';
        }
        db.getData('user','selectUser',req.session)
        .then((row)=>{
            console.log('selectUser', row);
            if(row){
                db.setData('user','updateUser',req.session);
            }else{
                db.setData('user','insertUser',req.session);
            }
        })
        req.session.save(function() {res.redirect('/'); });
    } catch (err) {
        logger.error("/auth/kakao/callback Error >>" + err);
    }
});

app.get('/api/auth/logout', async(req, res) => {
    kakao.logout(req.session.accessToken);
    req.session.destroy();
    res.clearCookie("sid");
    res.redirect('/');
});

app.post('/auth/myKakaoMsgAgree', async(req,res) => { //동의항목 가져오기
    var result = await kakao.agree(req.session.accessToken);    
    res.status(200).json({result: result});
});

app.get('/api/auth/user/info', (req,res)=>{
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
    var aplyList        = await db.getList('campAply','selectCampAply', {})
    var aplyCampCnt     = await db.getList('campAply','selectCampCntAll', {})
    var aplyPathSe      = await db.getList('campAply','selectPathSeAll', {})
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
    var aplyList = await db.getList('campAply','selectCampAplyToPoster', req.session);
    res.status(200).json(aplyList);
})
app.post('/api/user/aply/poster', async(req,res)=>{
    db.setData('campAply','insertAplyPoster', req.body )
    .then(function(row) {console.log(row)})
    res.status(200).json({msg:'success'});
})
app.post('/api/admin/aply/excel', async(req, res) => {
    const excelService = require('./services/excelService');
    try{
        var aplyList        = await db.getList('campAply','selectCampAply', {})
        var aplyCampCnt     = await db.getList('campAply','selectCampCntAll', {})
        var aplyPathSe      = await db.getList('campAply','selectPathSeAll', {})
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
    const { body: { aplyPrgrs, seq } } = req;
    db.setData('campAply','updateAplyCampPrgrs', {aplyPrgrs:aplyPrgrs, seq:seq} )
    .then(function(row) {
        res.status(200).json({msg: '접수상태 변경 성공'});
    })
})

app.put('/api/admin/aply/one', async(req, res)=>{
    db.setData('campAply','updateCampCnt', req.body.campCnt )
    db.setData('campAply','updateCampAply', req.body )
    .then(function(row) {
        res.status(200).json({msg: '변경 성공'});
    })
})
app.delete('/api/admin/aply/one', async(req, res)=>{
    db.setData('campAply','deleteAplyCamp', req.body )
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
        res.status(200).json(response.data);
    } catch (err) {
        logger.error("Error >>" + err);
        console.log(err);
        res.status(401).json(err);
    }
})

app.get('/api/admin/talk/friends', async(req,res) => {
    const accessToken = req.session.accessToken;
    try {
        const response = await axios({
            method: "get",
            url: "https://kapi.kakao.com/v1/api/talk/friends", // 서버
            headers: { 'Authorization': `Bearer ${accessToken}` }, // 요청 헤더 설정
        });
        res.status(200).json(response.data);
    } catch (err) {
        logger.error("Error >>" + err);
        res.status(401).json(err);
    }
})
app.get('/api/user/aply/camp/one', async(req,res) => {
    var campAply = await db.getList('campAply','selectCampAplyOne', req.session)
    res.status(200).json(campAply);
})
app.get('/api/bbs', async(req,res) =>{
    db.getList('bbs','selectBbs', {})
    .then((row)=>{
        res.status(200).json(row);
    })
})
app.post('/api/bbs', async(req,res) =>{
    db.getData('bbs','selectBbsCnt',req.body)
   .then((row)=>{
    if(row.cnt < 1){
        db.setData('bbs','insertBbs', req.body)
        .then((row)=>{
            res.status(200).json('success');
        })
    }else{
        db.setData('bbs','updateBbs', req.body)
        .then((row)=>{
            res.status(200).json('success');
        })
    }
   })
})
app.get('/api/download/:id', async(req, res, next) => {
    try{
        var atchmnfl = await db.getData('bbs','selectAtchmnfl', {atchmnflId: req.params.id, atchmnflSn: 1 });
        var filePath = path.join(__dirname, atchmnfl.atchmnflPath);
        res.download(filePath, atchmnfl.atchmnflNm,
            (err) => {
                if (err) { res.send({ error : err, msg   : "Problem downloading the file" }) }
            }
        );
    }catch(err){
        logger.error(err);
        next(err);
    }
});

app.get('/api/image/:id', async(req,res, next)=>{
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
    var imgExtList = ['jpg','png','jpeg','webp'];
    if(imgExtList.indexOf(ext) > -1){
        var filePath = path.join(__dirname, atchmnfl.atchmnflPath);
        fs.access(filePath, fs.F_OK, (err) => {
            if (err) {
                var noImage = path.join(__dirname, '/uploadFile/no-image-icon.png');
                res.sendFile(noImage,{},function(err){
                    if(err)res.status(err.status).end();
                })
                return
            }
            res.sendFile(filePath,{},function(err){
                if(err)res.status(err.status).end();
            })
        })
    }else{
        console.log("이미지 파일이 아닙니다.")
        res.send('no image');
        return;
    }
})
app.put('/api/bbs/cnt',(req,res)=>{
    db.setData('bbs','updateBbsClickCnt',req.body);
    res.status(200).send('cnt +1');
})
app.delete('/api/bbs/:idx',(req,res)=>{
    db.setData('bbs','deleteBbs',req.params);
    res.status(200).send('delete!! '+idx);
})
app.post('/api/bbs/reply', async(req,res) =>{
    db.setData('bbs','insertBbsReply', req.body)
    .then((row)=>{
        res.status(200).json('success');
    })
})
app.get('/api/bbs/reply', async(req,res) =>{
    db.getList('bbs','selectBbsReply', req.query)
    .then((row)=>{
        res.status(200).json(row);
    })
})
app.get('/api/admin/userList', async(req,res)=>{
    db.getList('user','selectUserList',req.session)
    .then((row)=>{
        res.status(200).json(row);
    })
})
app.get('/api/carousel', async(req,res)=>{
    db.getList('cmm','selectCarousel',{})
    .then((row)=>{
        res.status(200).json(row);
    })
})
app.post('/api/admin/carousel', async(req,res) =>{
    const { body: { imageSn, atchmnflId } } = req;
    db.getData('cmm','selectCarouselCnt',req.body)
    .then((row)=>{
        /** merge (inser, update) */
        if(row.cnt){ //update
            db.setData('cmm','updateCarousel', req.body )
            .then(function(row) {
                res.status(200).json({msg: 'update success!!'});
            })
        }else{//insert
            db.setData('cmm','insertCarousel', req.body )
            .then((row)=>{
                res.status(200).json('insert success');
            })
        }
    })
})
app.delete('/api/admin/carousel/:imageSn',(req,res)=>{
    const {params : { imageSn }} = req;
    db.setData('cmm','deleteCarousel',{imageSn:imageSn})
    .then((row)=>{
        res.status(200).send('delete!!');
    })
})
app.get('/api/download/:id', async(req,res, next)=>{
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
            res.send('파일이 존재하지 않습니다.');
            return;
        }
        var filePath = path.join(__dirname, atchmnfl.atchmnflPath);
        res.download(filePath);
    }catch(err){
        logger.error(err);
        next(err);
    }
})
app.get('/api/video', async(req,res)=>{
    db.getList('cmm','selectVideo',{})
    .then((row)=>{
        res.status(200).json(row);
    })
})
app.post('/api/admin/video', async(req,res) =>{
    const { body: { videoSn, atchmnflId } } = req;
    db.getData('cmm','selectVideoCnt',req.body)
    .then((row)=>{
        /** merge (inser, update) */
        if(row.cnt){ //update
            db.setData('cmm','updateVideo', req.body )
            .then(function(row) {
                res.status(200).json({msg: 'update success!!'});
            })
        }else{//insert
            db.setData('cmm','insertVideo', req.body )
            .then((row)=>{
                res.status(200).json('insert success');
            })
        }
    })
})
app.delete('/api/admin/Video/:videoSn',(req,res)=>{
    const {params : { videoSn }} = req;
    db.setData('cmm','deleteVideo',{videoSn:videoSn})
    .then((row)=>{
        res.status(200).send('delete!!');
    })
})
app.get('/api/user/banner', async(req,res)=>{
    db.getData('cmm','selectBannerToday',{})
    .then((row)=>{
        res.status(200).json(row);
    })
})
app.get('/api/admin/banner', async(req,res)=>{
    db.getList('cmm','selectBanner',{})
    .then((row)=>{
        res.status(200).json(row);
    })
})
app.post('/api/admin/banner', async(req,res) =>{
    db.getData('cmm','selectBannerCnt',req.body)
    .then((row)=>{
        /** merge (inser, update) */
        if(row.cnt){ //update
            db.setData('cmm','updateBanner', req.body )
            .then(function(row) {
                res.status(200).json({msg: 'update success!!'});
            })
        }else{//insert
            db.setData('cmm','insertBanner', req.body )
            .then((row)=>{
                res.status(200).json('insert success');
            })
        }
    })
})
app.delete('/api/admin/banner/:bannerId',(req,res)=>{
    const {params : { bannerId }} = req;
    db.setData('cmm','deleteBanner',{bannerId:bannerId})
    .then((row)=>{
        res.status(200).send('delete!!');
    })
})
app.get('/api/user/myAply', async (req,res)=>{
    var {acnt} = await db.getData('campAply','selectCampAplyCnt',{kakaoId: req.session.kakaoId?req.session.kakaoId:0});
    var {pcnt} = await db.getData('campAply','selectPosterAplyCnt',{kakaoId: req.session.kakaoId?req.session.kakaoId:0});
    console.log(acnt,pcnt);
    res.status(200).json({ acnt: Number(acnt) , pcnt:Number(pcnt)})
})
app.get('/api/admin/aply/poster', (req,res)=>{
    db.getList('campAply','selectAplyPosterList',req.body)
    .then((row)=>{
        res.status(200).json(row);
    })
})
app.listen(process.env.SERVER_PORT,()=>{
    logger.info(`server start! port:${process.env.SERVER_PORT}`)
})
