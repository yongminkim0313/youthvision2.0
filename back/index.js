require("dotenv").config();
var path = require('path');
const express = require('express')
const cors = require('cors')
const logger = require('./modules/winstonConfig');
const db = require('./modules/dbConnect');

const { initializeApp } = require('firebase/app');
const { getDatabase, ref, onChildAdded, set, get } = require('firebase/database');
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
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

const options = {
    maxHttpBufferSize: 1e8,
    cors: {
        origin: '*',
    },
    cookie: true
}; //1e6: 1MB
const server = require('http').createServer(app);
const io = require('socket.io')(server, options);
server.listen(4000);
io.on('connection', socket => {
    logger.info(`socket.io connected`);
    socket.on('disconnect', () => { 
        logger.info("@ socket disconnect @@@@"); 
    });
    socket.on('reconnecting', () => { logger.info("@ socket reconnecting @@@@"); });
    socket.on('reconnection', () => { logger.info("@ socket reconnection @@@@"); });
    
    function substrBack(str){
        return str.substring(str.length-2, str.length)
    }
    var today = new Date();
    var todayFm = today.getFullYear() +'-'
        + substrBack('0'+(today.getMonth()+1)) + '-' 
        + substrBack('0'+today.getDate());

    // get(ref(fireDB,'posts/common/connectLog/'+todayFm))
    // .then((snapshot)=>{
    //     if (snapshot.exists()) {
    //         socket.emit('getConnectLog',snapshot.val());
    //         console.log('onValue::',snapshot.val());
    //     } else {
    //         console.log("No data available");
    //     }
    // });
    onChildAdded(ref(fireDB,'posts/common/connectLog/'+todayFm)
    ,(snapshot)=>{
        var data = snapshot.val();
          //console.log('onChildAdded::',data);
          socket.emit('addConnectLog',data);
     });
    
});

app.post('/api/conectLog', (req, res) =>{
    db.setData('conectLog', 'insertConectLog', req.body)
    .then(function(row) {
        //console.log(row);
        res.status(200).json('success');
    })
    .catch(err=>{
        res.status(400).json(Error(err))
    });

    function substrBack(str){
        return str.substring(str.length-2, str.length)
    }

    var today = new Date();
    var todayFm = today.getFullYear() +'-'
        + substrBack('0'+(today.getMonth()+1)) + '-' 
        + substrBack('0'+today.getDate());
    set(ref(fireDB,'posts/common/connectLog/'+todayFm+'/'+req.body.conectDt),req.body);
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

app.listen(process.env.SERVER_PORT,()=>{
    console.log(`server start! port:${process.env.SERVER_PORT}`)
})
