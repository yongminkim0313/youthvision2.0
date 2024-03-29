
const common = require('../services/commonService');
const kakao = require('../services/kakaoService');
const { v4 } = require('uuid');
module.exports = (app, winston, db) => {

    app.get('/api/user/campAply',(req,res)=>{
        db.getList('campAply','selectCampAply', req.body)
        .then(function(row) {
            res.status(200).json(row);
        })
        .catch(err=>{
            res.status(400).json(Error(err))
        });
    })
    app.get('/api/user/campAply/one',(req,res)=>{
        db.getData('campAply','selectCampAplyOne', req.query)
        .then(function(row) { res.status(200).json(row); })
        .catch(err=>{ res.status(400).json(Error(err)) });
    })
    app.get('/api/user/joinPathSe/one',(req,res)=>{
        db.getList('campAply','selectJoinPathSe', req.query)
        .then(function(row) { res.status(200).json(row); })
        .catch(err=>{ res.status(400).json(Error(err)) });
    })
    app.get('/api/user/campCnt/one',(req,res)=>{
        db.getData('campAply','selectCampCnt', req.query)
        .then(function(row) { res.status(200).json(row); })
        .catch(err=>{ res.status(400).json(Error(err)) }); 
    });
    app.post('/api/user/campAply',async (req,res)=>{
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
                var campCnt = 0 
                var a = req.body['campCnt'];
                for(var c in a){
                    if(c != 'seq')campCnt += a[c];
                }
                var tokens = v4().split('-');
                var uuid = tokens[2] + tokens[1] + tokens[0] + tokens[3] + tokens[4];
                
                //나에게 메세지 보내기 api
                kakao.sendMeAplyCampInfo({campCnt, uuid, accessToken:req.session.accessToken});
                
                db.setData('campAply','insertCampConnectUuid',  {uuid: uuid, seq: req.body['seq']})
                .then(function(row) {console.log(row)})
    
                res.status(200).json({code: 0, msg:'success! '});
            })
        }
                
    })
    
    app.get('/api/user/aply/camp/one', async(req,res) => {
        var campAply = await db.getList('campAply','selectCampAplyOne', req.session)
        res.status(200).json(campAply);
    })
    app.get('/api/user/aply/camp/one/uuid', async(req,res) => {
        console.log(req.query);
        var campAply = await db.getList('campAply','selectCampAplyOneForUuid', req.query)
        res.status(200).json(campAply);
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
    
    
}