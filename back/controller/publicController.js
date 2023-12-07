const kakao = require('../services/kakaoService');
module.exports = (app, winston, db) => {
    app.get('/api/youtube', (req, res) => {
        const query = req.query;
        db.getList('common','selectCampLive', query)
        .then(function(row) {
            res.status(200).json(row);
        })
        .catch(err=>{
            res.status(400).json(Error(err))
        });
    });

    app.get('/api/public/bbs', async(req,res) =>{
        db.getList('bbs','selectBbs', {})
        .then((row)=>{
            res.status(200).json(row);
        })
    })


    app.post('/api/public/bbs', async(req,res) =>{
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

    app.put('/api/public/bbs/cnt',(req,res)=>{
        db.setData('bbs','updateBbsClickCnt',req.body);
        res.status(200).send('cnt +1');
    })
    app.delete('/api/public/bbs/:idx',(req,res)=>{
        db.setData('bbs','deleteBbs',req.params);
        res.status(200).send('delete!! '+idx);
    })
    app.post('/api/public/bbs/reply', async(req,res) =>{
        db.setData('bbs','insertBbsReply', req.body)
        .then((row)=>{
            res.status(200).json('success');
        })
    })
    app.get('/api/public/bbs/reply', async(req,res) =>{
        db.getList('bbs','selectBbsReply', req.query)
        .then((row)=>{
            res.status(200).json(row);
        })
    })
    app.get('/api/public/myAply', async (req,res)=>{
        var {acnt} = await db.getData('campAply','selectCampAplyCnt',{kakaoId: req.session.kakaoId?req.session.kakaoId:0});
        var {pcnt} = await db.getData('campAply','selectPosterAplyCnt',{kakaoId: req.session.kakaoId?req.session.kakaoId:0});
        res.status(200).json({ acnt: Number(acnt) , pcnt:Number(pcnt)})
    })
    app.get('/api/public/banner', async(req,res)=>{
        db.getData('common','selectBannerToday',{})
        .then((row)=>{
            res.status(200).json(row);
        })
    })
    app.get('/api/public/board', async(req,res)=>{
        db.getList('bbs','selectBoardList',{})
        .then((row)=>{
            res.status(200).json(row);
        })
    })
    app.get('/api/public/board/detail', async(req,res)=>{
        var {idx} = req.query;
        if(!idx){
            res.status(200).end();
            return;
        }
        // console.log(req.query);
        db.getData('bbs','selectBbsDetail',req.query)
        .then((row)=>{
            res.status(200).json(row);
        })
    })
}
