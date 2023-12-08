const temp = "./temp/";
const uploadFile = "./uploadFile/";
const fs = require('fs');
const { v4 } = require('uuid');
const common = require('../services/commonService');
const basicRoomId = "youthvision";

module.exports = (server, app, db) => {
    var returnValue = [];
    const options = { 
        maxHttpBufferSize: 1e8, 
        cors: { origin: '*', }, 
        cookie: true,
        path:'/my-ws', 
        cleanupEmptyChildNamespaces: true,
    }; //1e6: 1MB
    const io = require('socket.io')(server, options);
    io.on('connection', async (socket) => {
        console.log('@ connection');
        // io.sockets.adapter.rooms Map 자료형
        console.log('===========================')
        socket.join(basicRoomId); // 기본 room 입장;
        console.log('===========================')
        
        await app.get('/api/public/socket', async (req, res) => {
            try{
                var map = socket.adapter.sids;
                var vSocketId = map.keys().next().value;
                console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
                //console.log(req.session);
                req.session.socketId = vSocketId;
                var rooms = io.sockets.adapter.rooms; // Map
                var arrUserIds = Array.from(rooms.get(basicRoomId)) //set
                var pSocket = {
                    socketId: vSocketId, 
                    nickname: req.session.nickname, 
                    thumbnailImageUrl: req.session.thumbnailImageUrl , 
                };
                var result = await db.getData('common','selectSocketSession',pSocket);
                console.log('@ selectSocketSession', result, pSocket);
                if(result.cnt < 1){
                    console.log('@ insertSocketSessions', pSocket);
                    await db.setData('common','insertSocketSessions',pSocket);
                }
                
                var socketIds = arrUserIds.join(',');
                console.log('@ arrUserIds',socketIds);
                var activeSocket = await db.getList('common','selectActiveSocket',{socketIds: socketIds})
                console.log('@ selectActiveSocket', activeSocket);
                console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
                socket.to(basicRoomId).emit('welcome', activeSocket);
                res.status(200).json(activeSocket)
            }catch(err){
                console.error(err);
                res.status(200).json(err);
            }
        });
        
        socket.on('disconnecting', () => {
            socket.rooms.forEach((room) =>
            socket.to(room).emit('bye', socket.nickname)
            );
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
            try{
                console.log("@ socket disconnect");
                var rooms = io.sockets.adapter.rooms; // Map
                var arrUserIds = [];
                if(rooms.size > 0) arrUserIds = Array.from(rooms.get(basicRoomId)) //set
                socket.to(basicRoomId).emit('welcome', arrUserIds); 
            }catch(err){
                console.error(err);
            }
        });
        socket.on('reconnecting'    , () => { console.log("@ socket reconnecting"); });
        socket.on('reconnection'    , () => { console.log("@ socket reconnection"); });
        console.log(`@ socket connected`);
    });
    return io;
}