require("dotenv").config();
var path = require('path');
const express = require('express');
const http = require('http');
const https = require('https');
const session = require('express-session');
const cors = require('cors');
const axios = require('axios');
const logger = require('./modules/winstonConfig');
const db = require('./modules/dbConnect');
const common = require('./services/commonService');
const fs = require('fs');
const webpush = require("web-push");

const publicVapidKey = 'BKr0X9xxLDeBlo9K-XVBj9RvR5NtO-0scX8J6uq5sNZEIWGIAgwsAOASnN7lIDOj33Ah3vr_PDYGvbhYaxgu8Hg';
const privateVapidKey = 'VjzcL0KVNmwTLz669j4-12lFa-72rfNGHrdvFPnIxgc';

webpush.setVapidDetails('mailto:kimyongmin1@naver.com', publicVapidKey, privateVapidKey);

const { join } = require("path");

const app = express();
app.set('trust proxy', true);
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
// require('./modules/socketConfig')(app,logger);
require('./controller/authController')(app,logger, db);
require('./controller/commonController')(app,logger, db);
require('./controller/userController')(app,logger, db);
require('./controller/adminController')(app,logger, db);
require('./controller/loginController')(app,logger, db);
require('./controller/publicController')(app,logger, db);

var subs= {};
app.post('/api/subscribe', (req, res) => {
    const {subscription, msg} = req.body;
    res.status(201).json({});
    const payload = JSON.stringify(msg);
  
    console.log("===========subscription start============");
    console.log(subscription);
    if(subscription.keys){
        subs[subscription.keys.p256dh] = subscription
    }
    console.log(subs);
    console.log("===========subscription end  ============");
    Object.keys(subs).forEach(function(key){ 
        webpush.sendNotification(subs[key], payload).catch(error => {
          console.error(error.stack);
        });
    })
  });

// var options = {
// 	key: fs.readFileSync('../private.pem'),
//     cert: fs.readFileSync('../public.pem'),
// };
http.createServer(app).listen(process.env.HTTP_PORT);// Create an HTTP server.
// https.createServer(options, app).listen(process.env.HTTPS_PORT);// Create an HTTPS server.
// app.listen(process.env.SERVER_PORT,()=>{
//     logger.info(`server start! port:${process.env.SERVER_PORT}`)
// })
