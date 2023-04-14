const temp = "./temp/";
const uploadFile = "./uploadFile/";
const fs = require('fs');
const { v4 } = require('uuid')

module.exports = (app, winston) => {
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
        console.log(socket.handshake.query);
        const kakaoId = socket.handshake.query['kakaoId'];
        const isLogin = socket.handshake.query['isLogin'];
        socket.on('fileDel', () => {
            socket.broadcast.emit('fileCommend', { fileCommend: 'refresh' });
            socket.emit('fileCommend', { fileCommend: 'refresh' });
        });
        var Files = Object();
        socket.on('Start', (data) => {
            console.log('socket start!!');
            if(!isLogin){
                console.log('isLogin', isLogin);
                return;
            }
            var Name = data.Name;
            Files[Name] = {
                FileSize: data.Size,
                Data: "",
                Downloaded: 0
            };
            var Place = 0;
            fs.appendFileSync(temp + Name, "");
            var Stat = fs.statSync(temp + Name);
            if (Stat.isFile()) {
                Files[Name].Downloaded = Stat.size;
            }
            fs.open(temp + Name, "a+", function(err, fd) {
                if (err) console.log(err);
                else {
                    Files[Name].Handler = fd;
                    socket.emit('MoreData', { 'Place': Place, Percent: 0 });
                }
            });
        });
    
        socket.on('Upload', (data) => {
            var l = socket.handshake.query['isLogin'];
            console.log('Upload start!!', l)
            if(l != 'true'){
                console.log('로그인이 필요합니다.')
                socket.emit('error', { 'msg': '로그인이 필요합니다.' });
                return;
            }
            var Name = data.Name;
            Files[Name].Downloaded += data.Data.length;
            Files[Name].Data += data.Data;
            if (Files[Name].Downloaded == Files[Name].FileSize) {
                var atchmnflNm = Name;
                fs.write(Files[Name].Handler, Files[Name].Data, null, 'Binary', function(err, written) {
                    try{
                        var uuid = v4();
                        if (err) console.log(err);
                        var readable = fs.createReadStream(temp + Name);
                        var writable = fs.createWriteStream(uploadFile + uuid);
                        readable.pipe(writable);
                        writable.on('finish', function(err) {
                            if (err) console.log(err);
                            console.log(atchmnflNm + " : writing is completed.");
                            fs.close(Files[Name].Handler, function(err) {
                                if (err) console.log(err, Files);
                                fs.unlink(temp + Name, function(err) {
                                    if (err) console.log(err);
                                    const db = require('../modules/dbConnect');
                                    db.getData('bbs','selectNextAtchmnflSeq', {})
                                    .then(function(result){
                                        var atchmnflId = Number(result.seq);
                                        socket.emit('endData', { 'atchmnflId':atchmnflId });
                                        winston.info('AtchmnflSeq:'+atchmnflId);
                                        var seq = result.seq;
                                        var saveFileData = {
                                            atchmnflId : atchmnflId, 
                                            atchmnflSn : 1, 
                                            atchmnflNm : atchmnflNm, 
                                            atchmnflSize : Files[Name].FileSize, 
                                            atchmnflPath : '/uploadFile/' + uuid, 
                                            rgstDt:'', 
                                            kakaoId:kakaoId
                                        };
                                        console.log(saveFileData);
                                        db.setData('bbs','insertAtchmnfl', saveFileData);
                                    });
                                    console.log(Name + " is deleted.");
                                });
                            });
                        });
                    }catch(e){
                        console.log(e);
                        logger.error(e);
                    }
                });
            } else if (Files[Name].Data.length > 10485760) {
                fs.write(Files[Name].Handler, Files[Name].Data, null, 'Binary', function(err, written) {
                    Files[Name].Data = ""; //Reset The Buffer
                    var Place = Files[Name].Downloaded / 524288;
                    var Percent = (Files[Name].Downloaded / Files[Name].FileSize) * 100;
                    socket.emit('MoreData', { 'Place': Place, 'Percent': Percent });
                });
            } else {
                var Place = Files[Name].Downloaded / 524288;
                var Percent = (Files[Name].Downloaded / Files[Name].FileSize) * 100;
                socket.emit('MoreData', { 'Place': Place, 'Percent': Percent });
            }
        });

        socket.on('connect users',(args,callback)=>{
            console.log('connect users');
        });
        
        socket.on('disconnect', () => { 
            winston.info("@ socket disconnect @@@@"); 
        });
        socket.on('reconnecting', () => { winston.info("@ socket reconnecting @@@@"); });
        socket.on('reconnection', () => { winston.info("@ socket reconnection @@@@"); });
        winston.info(`socket.io connected`);
    });
    winston.info('socket start')
    return io;
}