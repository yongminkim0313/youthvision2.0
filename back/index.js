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
var MySQLStore = require("express-mysql-session")(session);
var options = {
    host: process.env.HOST,
    port: process.env.PORT,
    user: process.env.DATABASE_USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
}
var sessionStore = new MySQLStore(options);

const publicVapidKey = 'BKr0X9xxLDeBlo9K-XVBj9RvR5NtO-0scX8J6uq5sNZEIWGIAgwsAOASnN7lIDOj33Ah3vr_PDYGvbhYaxgu8Hg';
const privateVapidKey = 'VjzcL0KVNmwTLz669j4-12lFa-72rfNGHrdvFPnIxgc';

webpush.setVapidDetails('mailto:kimyongmin1@naver.com', publicVapidKey, privateVapidKey);

const { join } = require("path");

const app = express();
app.set('trust proxy', true);
app.use(cors({origin:'*'}));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: true }));
app.use('/uploadFile',express.static(path.join(__dirname, '/uploadFile')));
app.use(session({
    secret: 'youthvision-kr',
    resave: false,
    saveUninitialized: false, 
    cookie: { secure: false, maxAge : 1000* 60 * 60 },
    store: sessionStore,
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
app.get('/', function(req,res,next){
    console.log('req.url=============',req.url)
    res.sendFile(path.join(__dirname, "./public/index.html"));
})
db.test();
require('./controller/authController')(app,logger, db);
require('./controller/commonController')(app,logger, db);
require('./controller/userController')(app,logger, db);
require('./controller/adminController')(app,logger, db);
require('./controller/loginController')(app,logger, db, webpush);
require('./controller/publicController')(app,logger, db);

app.use(require('connect-history-api-fallback')());
app.use(express.static(path.join(__dirname, '/public')));

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

var options = {
    key: fs.readFileSync('./SSL/www_jesusdream.kr.key'),
    cert: fs.readFileSync('./SSL/www_jesusdream.kr_cert.crt'),
};
http.createServer(app).listen(process.env.HTTP_PORT, () =>{
    logger.info(`server start! port:${process.env.HTTP_PORT}`)
});
var server = https.createServer(options, app)
        
require('./modules/socketConfig')(server, app, db);

server.listen(process.env.HTTPS_PORT, ()=>{
    logger.info(`server start! port:${process.env.HTTPS_PORT}`)
});// Create an HTTPS server.