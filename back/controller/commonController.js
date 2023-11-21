const multer = require('multer'); // express에 multer모듈 적용 (for 파일업로드)
const upload = multer({ dest: 'uploadsFile/' })
const sharp = require('sharp');
var path = require('path');
const fs = require('fs');
const logger = require('../modules/winstonConfig');
const axios = require('axios');

module.exports = (app, winston, db) => {

    app.get('/api/common/menu', async(req, res, next) => {
       db.getList('common','selectMenu', {})
        .then((row)=>{
            const makeMenuList = (inputList,outputList,menuId) => {
                let tempList = []; 
                   // 상위메뉴와 하위메뉴 관계 => 0 > 01 > 011, 0 > 02 > 021,022
                tempList = inputList.filter((row) => row.uppMenuId === menuId );
                // 해당하는 하위메뉴가 더이상 없을때 return 
                if (tempList.length == 0) { return outputList; }
                for (let i = 0; i < tempList.length; i++){
                    if (tempList[i].subMenu == undefined) {
                        tempList[i].subMenu = [];
                    }
                    // important!!!! subMenu 배열을 던져줘야한다. index는 메뉴키의 자릿수로 이용함, 상위메뉴의 key도 줘야함.
                    makeMenuList(inputList, tempList[i].subMenu, tempList[i].menuId)
                    outputList.push(tempList[i]);
                }
                return outputList
            };
            let brandTree = makeMenuList(row, [], null);
            res.status(200).json(brandTree);
        })
    });

    app.put('/api/common/menu', async(req, res, next) => {
        const { body } = req;
        console.log(body);
        db.setData('common','updateMenu',body);
        res.status(200).json(body);
     });

    app.post('/api/common/connectLog', (req, res) =>{
    
        if(req.ip == '127.0.0.1' || req.body['prmanentCookie'] =='ca87c075-2159-4a40-84cb-f25b9f4a6383'){
            res.status(200).json('success');
            return;
        }
        req.body['ipAdres'] = req.ip;
        req.body['kakaoId'] = req.body['kakaoId'] ? req.body['kakaoId']: 0;
        console.log(req.body);
        // set(ref(fireDB,'connectLog/'+common.getDate()+'/'+req.body.conectDt),req.body);
        db.setData('connectLog', 'insertConnectLog', req.body)
        .then(function(row) {
            res.status(200).json('success');
        })
        .catch(err=>{
            res.status(400).json(Error(err))
        });
    })
    
    app.get('/api/common/connectLog', (req, res) =>{
        // get(ref(fireDB,'posts/common/connectLog/'+req.query.dt))
        // .then((snapshot)=>{
        //     if (snapshot.exists()) {
        //         res.status(200).json(snapshot.val());
        //     } else {
        //         console.log("No data available");
        //         res.status(401).json({msg:"No data available"});
        //     }
        // });
        console.log("##########/api/common/connectLog####################");
        console.log(req.query);

        db.getList('connectLog','selectConnectLog',req.query)
        .then((row)=>{
            res.status(200).json(row);
        })
    })

    app.get('/api/common/connectLog/dt', (req, res) =>{
        db.getList('connectLog','selectLogDt',req.query)
        .then((row)=>{
            res.status(200).json(row);
        })
    })

    app.get('/api/admin/banner', async(req,res)=>{
        db.getList('common','selectBanner',{})
        .then((row)=>{
            res.status(200).json(row);
        })
    })
    app.post('/api/admin/banner', async(req,res) =>{
        db.getData('common','selectBannerCnt',req.body)
        .then((row)=>{
            /** merge (inser, update) */
            if(row.cnt){ //update
                db.setData('common','updateBanner', req.body )
                .then(function(row) {
                    res.status(200).json({msg: 'update success!!'});
                })
            }else{//insert
                db.setData('common','insertBanner', req.body )
                .then((row)=>{
                    res.status(200).json('insert success');
                })
            }
        })
    })
    app.delete('/api/admin/banner/:bannerId',(req,res)=>{
        const {params : { bannerId }} = req;
        db.setData('common','deleteBanner',{bannerId:bannerId})
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
        db.getList('common','selectVideo',{})
        .then((row)=>{
            res.status(200).json(row);
        })
    })
    app.post('/api/admin/video', async(req,res) =>{
        const { body: { videoSn, atchmnflId } } = req;
        db.getData('common','selectVideoCnt',req.body)
        .then((row)=>{
            /** merge (inser, update) */
            if(row.cnt){ //update
                db.setData('common','updateVideo', req.body )
                .then(function(row) {
                    res.status(200).json({msg: 'update success!!'});
                })
            }else{//insert
                db.setData('common','insertVideo', req.body )
                .then((row)=>{
                    res.status(200).json('insert success');
                })
            }
        })
    })
    app.delete('/api/admin/Video/:videoSn',(req,res)=>{
        const {params : { videoSn }} = req;
        db.setData('common','deleteVideo',{videoSn:videoSn})
        .then((row)=>{
            res.status(200).send('delete!!');
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

    app.get('/api/common/image/:id', async(req,res, next)=>{
        console.log("#############################")
        var atchmnfl = await db.getData('bbs','selectAtchmnfl', {atchmnflId: req.params.id, atchmnflSn: 1 });
        console.log(atchmnfl);
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
            var filePath = path.join(__dirname,'../', atchmnfl.atchmnflPath);
            fs.access(filePath, fs.F_OK, (err) => {
                if (err) {
                    var noImage = path.join(__dirname,'../', '/uploadFile/no-image-icon.png');
                    console.log('asdfasdfad',noImage);
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

    app.post('/api/user/upload', upload.single('file'), async function(req, res){
        console.log(req.file); // 콘솔(터미널)을 통해서 req.file Object 내용 확인 가능.
        var{ seq } = await db.getData('bbs','selectNextAtchmnflSeq', {})
        var saveFileData = {
            atchmnflId : seq, 
            atchmnflSn : 1, 
            atchmnflNm : req.file.originalname, 
            atchmnflSize : req.file.size, 
            atchmnflPath : req.file.path, 
            kakaoId:req.session.kakaoId
        };
        logger.info(saveFileData);
        await db.setData('bbs','insertAtchmnfl', saveFileData);
        res.status(200).json(saveFileData); // object를 리턴함
    });

    app.get('/api/common/carousel', async(req,res)=>{
        db.getList('common','selectCarousel',{})
        .then((row)=>{
            res.status(200).json(row);
        })
    })
    app.post('/api/common/carousel', upload.single('file'), async function(req, res){
        console.log(req.file); // 콘솔(터미널)을 통해서 req.file Object 내용 확인 가능.
        try {
            sharp(req.file.path) // 리사이징할 파일의 경로
               .resize({ width: 640 }) // 원본 비율 유지하면서 width 크기만 설정
               .withMetadata()
               .toFile(`${req.file.destination}resize/${req.file.originalname}`, (err, info) => {
                  if (err) throw err;
                  console.log(info);
                //   fs.unlink(`${req.file.destination}resize/${req.file.originalname}`, (err) => {
                //      // 원본파일은 삭제해줍니다
                //      // 원본파일을 삭제하지 않을거면 생략해줍니다
                //      if (err) throw err;
                //   });
               });
         } catch (err) {
            console.log(err);
         }
        
        var{ seq } = await db.getData('bbs','selectNextAtchmnflSeq', {})
        var saveFileData = {
            atchmnflId : Number(seq), 
            atchmnflSn : 1, 
            atchmnflNm : req.file.originalname, 
            atchmnflSize : Number(req.file.size), 
            atchmnflPath : req.file.path, 
            kakaoId: Number(req.session.kakaoId)
        };
        logger.info(saveFileData);
        await db.setData('bbs','insertAtchmnfl', saveFileData);
        const result = await db.setData('common','insertCarousel', saveFileData )
        console.log(result);
        res.status(200).json(result.affectedRows);
    })

    app.delete('/api/common/carousel/:carouselId', async(req,res)=>{
        const {params : { carouselId }} = req;
        console.log(req.params);
        db.setData('common','deleteCarousel',{carouselId:carouselId})
        .then((row)=>{
            res.status(200).send('delete!!');
        })
    })

    app.put('/api/common/carousel', async(req,res)=>{
        // console.log(req.body);
        var updated = 0;
        for(var item of req.body){
            console.log(item);
            var d = await db.setData('common','updateCarousel',item);
            updated += d.affectedRows;
        }
        res.status(200).send('updated: '+ updated);
    })

    app.post('/api/common/youtube', async(req,res)=>{
       console.log('###############################################');
       var { src } = req.body;
       console.log(req.body);
       var url = `https://i1.ytimg.com/vi/${src}/1.jpg`;
       console.log(url);

        const img = await axios
    	.get(url, { responseType: 'arraybuffer' })
    	.then((response) => Buffer.from(response.data));
       try {
            var resizeImg = await sharp(img) // 리사이징할 파일의 경로
            .resize(50,50) // 원본 비율 유지하면서 width 크기만 설정
            .withMetadata()
            // .toFile(`uploadsFile/resize/${youtubeId}.jpg`, (err, info) => {
            //     if (err) throw err;
            //     console.log(info);
            //     res.status(200).json({msg:'success!!'});
            // })
            .toBuffer();
            console.log('@@@@@@@@@@@@@@@@@', resizeImg);
            var buf = Buffer.from(resizeImg);
            req.body['thumbImg']= buf.toString('base64');
            var d = await db.setData('common','updateYoutubeThumb',req.body);
            res.status(200).end(resizeImg); // 리사이징된 이미지를 브라우저에 뜨게 응답
        } catch (err) {
            console.log(err);
        }
    })
}