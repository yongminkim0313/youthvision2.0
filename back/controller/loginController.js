const kakao = require('../services/kakaoService');
module.exports = (app, winston, db) => {
    app.get('/auth/kakao/callback', async(req, res) => {
        const { headers: { cookie } } = req;
        try {
            const response = await kakao.getToken(req.query.code);
            const access_token = response.data.access_token;
            const refresh_token = response.data.refresh_token;
            const userInfo = await kakao.getUserInfo(access_token);
            req.session.kakaoId           = userInfo.data.id
            req.session.nickname          = userInfo.data.kakao_account.profile.nickname
            req.session.accessToken       = `${access_token}`;
            req.session.refreshToken      = `${refresh_token}`;
            req.session.email             = userInfo.data.kakao_account.email||'no data';
            req.session.thumbnailImageUrl = userInfo.data.kakao_account.profile.thumbnail_image_url;
            req.session.gender            = userInfo.data.kakao_account.gender||'no data';
            winston.info(req.session.kakaoId+' '+req.session.nickname+' '+req.session.email+' '+req.session.gender+' '+req.session.thumbnailImageUrl)
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
            req.session.save(function() {
                res.redirect(req.query.state);});
        } catch (err) {
            winston.error("/auth/kakao/callback Error >>" + err);
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
}