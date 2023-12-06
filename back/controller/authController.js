module.exports = (app, winston, db) => {
  function requireLogin(req, res, next) {
    if (req.session.kakaoId || req.url.indexOf('/api/user/aply/camp/one/uuid') > -1 ) {
      console.log('UserLogin url: ',req.url, req.method);
      req.body['kakaoId'] = req.session.kakaoId;
      next();
    } else {
      res.status(401).json({msg: '로그인이 필요합니다.'});
    }
  }

  function requireAdminLogin(req, res, next) {
    if(req.url == '/api/common/connectLog'){
      next();
    } else{
      if (req.session.kakaoId && req.session.auth == 'admin') {
        console.log('AdminLogin url: ',req.url, req.method);
        req.body['kakaoId'] = req.session.kakaoId;
        next();
      } else {
        res.status(401).json({msg: '로그인이 필요합니다.'});
      }
    }
  }
  app.all('*', function(req,res,next){
    console.log(req.url, req.method);
    next();
  })
  app.all('/api/auth/*', function(req, res, next){
      next();
  });
  app.all('/api/user/*', requireLogin, function(req, res, next){
    next();
  });
  app.post('/api/public/*',  function(req, res, next){
      next();
  });
  app.put('/api/public/*',  function(req, res, next){
    next();
  });
  app.delete('/api/public/*',  function(req, res, next){
    next();
  });
  app.all('/api/admin/*', requireAdminLogin, function(req, res, next){
      next();
  });
  app.get('/api/common/*', function(req, res, next){
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
}