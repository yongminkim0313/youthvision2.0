const temp = "./temp/";
const uploadFile = "./uploadFile/";
const fs = require('fs');
const { v4 } = require('uuid');
const common = require('../services/commonService');
const basicRoomId = "youthvision";

module.exports = (server, app) => {
    var returnValue = [];
    const options = { 
        maxHttpBufferSize: 1e8, 
        cors: { origin: '*', }, 
        cookie: true,
        path:'/my-ws', 
        cleanupEmptyChildNamespaces: true,
    }; //1e6: 1MB
    const io = require('socket.io')(server, options);
    io.on('connection', socket => {
        console.log('@ connection');
        // io.sockets.adapter.rooms Map 자료형
        console.log('===========================')
        socket.join(basicRoomId); // 기본 room 입장;
        console.log('===========================')
        
        app.get('/api/public/socket', (req, res) => {
            try{
                console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
                var rooms = io.sockets.adapter.rooms; // Map
                var arrUserIds = Array.from(rooms.get(basicRoomId)) //set
                console.log(arrUserIds);
                socket.to(basicRoomId).emit('welcome', {
                    "text": "입장",
                    info: arrUserIds
                });
                console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
                res.status(200).json(arrUserIds)
            }catch(err){
                console.error(err);
                res.status(200).json(err);
            }
        });


            socket.on("joinRoom",(roomId)=>{
                try{
                    socket.join(roomId);
                    console.log("입장하셨습니다. --> ",roomId);
                    socket.to(roomId).emit('server to client', {
                        "text": "입장",
                        "roomId": roomId,
                        "dt": common.getDateTime(),
                        "type": 'join' 
                    });
                }catch(err){
                    console.error(err);
                    socket.to(roomId).emit('send', {err: err});
                }
            })
            
        // socket.on('disconnecting', () => {
        //     socket.rooms.forEach((room) =>
        //     socket.to(room).emit('bye', socket.nickname)
        //     );
        // });
        app.post('/api/public/socket', (req, res) => {
            console.log('@ 입장', socket.rooms, req.body, req.session)
            var {text} = req.body;
            socket.broadcast.emit("broadcast", text);
            res.status(200).end();
        });
        socket.on("sendText",(data, fn)=>{
            data.nickname = socket.nickname;
            console.log('전송메세지: ',data);
            data['dt'] = common.getDateTime(); //전송시간
            socket.to(data.roomId).emit('server to client',data);
            var myData = data;
            myData.me = true;
            fn(myData);
        });

        socket.on('disconnect'      , () => { 
            console.log("@ socket disconnect"); 
        });
        socket.on('reconnecting'    , () => { console.log("@ socket reconnecting"); });
        socket.on('reconnection'    , () => { console.log("@ socket reconnection"); });
        console.log(`@ socket connected`);
    });
    return io;
}