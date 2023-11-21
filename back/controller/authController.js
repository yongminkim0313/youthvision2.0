module.exports = (app, winston, db) => {
    function requireLogin(req, res, next) {
      console.log(req.url);
      if (req.session.kakaoId) {
        next();
      } else {
        res.status(401).json({msg: '로그인이 필요합니다.'});
      }
    }

    function requireAdminLogin(req, res, next) {
      console.log(req.url, req.method);
      if(req.url == '/api/common/connectLog'){
        next();
      } else{

        if (req.session.kakaoId && req.session.auth == 'admin') {
          next();
        } else {
          res.status(401).json({msg: '로그인이 필요합니다.'});
        }
        
      }
    }
    app.all('/api/auth/*', function(req, res, next){
        next();
    });
    app.all('/api/user/*', requireLogin, function(req, res, next){
      next();
    });
    app.post('/api/public/*', requireAdminLogin, function(req, res, next){
        next();
    });
    app.put('/api/public/*', requireAdminLogin, function(req, res, next){
      next();
    });
    app.delete('/api/public/*', requireAdminLogin, function(req, res, next){
      next();
    });
    app.all('/api/admin/*', requireAdminLogin, function(req, res, next){
        next();
    });
    app.post('/api/common/*', requireAdminLogin, function(req, res, next){
      next();
    });
    app.put('/api/common/*', requireAdminLogin, function(req, res, next){
      next();
    });
    app.delete('/api/common/*', requireAdminLogin, function(req, res, next){
      next();
    });
    /************************* [Start] get, post, put, delte api 설정 **********************/
// app.get('*', (req, res, next) => {
//     // logger.info('url: ' +req.url + ' body: '+ JSON.stringify(req.body)+ ' params: '+JSON.stringify(req.params) +' method: '+ req.method+ ' kakaoId: '+req.session.kakaoId+' auth: '+ req.session.auth);
//         if(req.url.indexOf('/auth/kakao/callback') > -1){
//             next();
//             return;
//         }
//         if(req.url.indexOf('/api/user/') > -1){
//             if(req.session.kakaoId) next();
//             else res.status(400).json({msg: '로그인이 필요합니다.'});
//         }else{
//             adminUrlCheck(req, 
//                 function(){ res.sendFile(path.join(__dirname, '/public/index.html')) },
//                 function(){ new Error('관리자가 아닙니다'); }
//             )
//         }
//     });
//     app.post('*', (req, res, next) => {
//         logger.info('url: ' +req.url + ' body: '+ JSON.stringify(req.body)+ ' params: '+JSON.stringify(req.params) +' method: '+ req.method+ ' kakaoId: '+req.session.kakaoId+' auth: '+ req.session.auth);
//         if(!req.session.kakaoId && req.url != '/api/subscribe' && req.url != '/api/connectLog' && req.url != '/api/user/KoGPT'){
//             logger.warn('로그인 상태가 아닙니다.')
//             res.status(500).send({ error: '로그인 상태가 아닙니다.' });
//             return;
//         }else{
//             adminUrlCheck(req, 
//             function(){ 
//                 req.body['kakaoId'] = req.session.kakaoId; //카카오아이디 추가
//                 next();
//             },
//             function(){ res.status(400).json({msg: '관리자가 아닙니다'}); }
//             )
//         }
//     });
//     app.put('*', (req, res, next) => {
//         logger.info('url: ' +req.url + ' body: '+ JSON.stringify(req.body)+ ' params: '+JSON.stringify(req.params) +' method: '+ req.method+ ' kakaoId: '+req.session.kakaoId+' auth: '+ req.session.auth);
//         if(!req.session.kakaoId && !(req.url.indexOf('/cnt') > -1)){
//             logger.warn('로그인 상태가 아닙니다.')
//             res.status(500).send({ error: '로그인 상태가 아닙니다.' });
//             return;
//         }else{
//             adminUrlCheck(req, 
//                 function(){ 
//                     req.body['kakaoId'] = req.session.kakaoId; //카카오아이디 추가
//                     next();
//                 },
//                 function(){ res.status(400).json({msg: '관리자가 아닙니다'}); }
//             )
//         }
//     });
//     app.delete('*', (req, res, next) => {
//         logger.info('url: ' +req.url + ' body: '+ JSON.stringify(req.body)+ ' params: '+JSON.stringify(req.params) +' method: '+ req.method+ ' kakaoId: '+req.session.kakaoId+' auth: '+ req.session.auth);
//         if(!req.session.kakaoId){
//             logger.warn('로그인 상태가 아닙니다.')
//             res.status(500).send({ error: '로그인 상태가 아닙니다.' });
//             return;
//         }else{
//             adminUrlCheck(req, 
//             function(){ 
//                 req.body['kakaoId'] = req.session.kakaoId; //카카오아이디 추가
//                 next();
//             },
//             function(){ res.status(400).json({msg: '관리자가 아닙니다'}); }
//         )
//     }
// });
/************************* [End] get, post, put, delte api 설정 **********************/


}