<!-- https://www.bootdey.com/snippets/view/chat-app#css -->
<template>
    <div class="container">
<div class="row clearfix">
    <div class="col-lg-12">
        <div class="card chat-app">
            <div id="plist" class="people-list">
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text"><i class="fa fa-search"></i></span>
                    </div>
                    <input type="text" class="form-control" placeholder="Search...">
                </div>
                <ul class="list-unstyled chat-list mt-2 mb-0">
                    <li class="clearfix" :class="{'is-active': selectedRoom == 'youthvision01' }" @click="changeRoom('youthvision01')">
                        <img src="../assets/jesusdream.png" alt="avatar">
                        <div class="about">
                            <div class="name">youthvision</div>
                            <div class="status"> <i class="fa fa-circle offline"></i> online since Oct 28 </div>
                        </div>
                    </li>
                    <li class="clearfix" :class="{'is-active': selectedRoom == 'youthvision02' }" @click="changeRoom('youthvision02')">
                        <img src="../assets/jd4.jpeg" alt="avatar">
                        <div class="about">
                            <div class="name">staff</div>
                            <div class="status"> <i class="fa fa-circle offline"></i> online since Oct 28 </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="chat">
                <div class="chat-header clearfix">
                    <div class="row">
                        <div class="col-lg-6">
                            <a href="javascript:void(0);" data-toggle="modal" data-target="#view_info">
                                <img :src="headerImg" alt="avatar">
                            </a>
                            <div class="chat-about">
                                <h6 class="m-b-0">{{ chatTitle }}</h6>
                                <small></small>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="chat-history" ref="msgList">
                    <ul class="m-b-0">
                        <li class="clearfix" v-for="(item, index) in msgList" :key="index">
                            <div v-if="item.type=='join'">
                                <v-chip>{{ item.text }}</v-chip>
                            </div>
                            <div v-if="item.type=='text'" class="message-data" :class="{'text-right' : item.me}">
                                <v-avatar size="36px" >
                                    <v-img src="https://bootdey.com/img/Content/avatar/avatar7.png"> </v-img> 
                                </v-avatar>
                                {{ item.nickname }}
                            </div>
                            <div v-if="item.type=='text'" class="message" :class="{'float-right' : item.me, 'my-message' : item.me, 'other-message': !item.me}">
                                <span class="message-data-time">{{ item.dt | formatDate }}</span>
                                {{ item.text }}
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="chat-message clearfix">
                    {{ status }}
                    <div class="input-group mb-0">
                        <v-text-field outlined label="Enter text here..." append-icon="mdi-send" v-model="message.text" @keypress.enter="sendText();"></v-text-field>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
</template>
<script>
export default {
    components: { },
    name:'Messenger',
    props:{ },
    data: ()=>{
        return{
            message: {text:''},
            status: '',
            rooms: {
                'youthvision01':{msgList: [],img:require('../assets/jesusdream.png'), title:'YOUTHVISION'},
                'youthvision02':{msgList: [],img:require('../assets/jd4.jpeg'), title:'STAFF'}
            },
            selectedRoom: '',
            headerImg: '',
            msgList: [],
            chatTitle: ''
        }
    },
    watch: { 
        msgList: function(){
            // 화면에 추가된 후 동작하도록
            this.$nextTick(() => {
                let msgList = this.$refs.msgList;
                msgList.scrollTo({ top: msgList.scrollHeight, behavior: 'smooth' });
            });
        }
    },
    created: function(){ 
        // this.joinRoom('youthvision01');
        // this.joinRoom('youthvision02');
        // this.changeRoom('youthvision01');
        // this.setNickName();
        // this.$socket.onAny((event, ...args) => {
        //     console.log(`got ${event} ${args}`);
        //     this.status = event
        // });
        // this.$socket.on('server to client', (data)=>{
        //     console.log(data);
        //     this.pushMsgList(data);
        // })
    },
    mounted: function(){ },
    methods:{ 
        pushMsgList: function(data){
            this.rooms[data.roomId].msgList.push(data);
        },
        sendText: function(){
            var {text} = this.message;
            this.$socket.emit("sendText",{text:text, roomId: this.selectedRoom, type: 'text'}, (data)=>{
                console.log(data);
                this.pushMsgList(data);
                this.clearText();
            });
        },
        clearText: function(){
            this.message = {text:''}
        },
        changeRoom:function(roomId){
            this.selectedRoom = roomId;
            this.msgList = this.rooms[this.selectedRoom].msgList;
            this.headerImg = this.rooms[this.selectedRoom].img;
            this.chatTitle = this.rooms[this.selectedRoom].title;
        },
        joinRoom: function(roomId){
            this.$socket.emit("joinRoom", roomId);
        },
        leaveRoom: function(roomId){
            this.$socket.emit("leaveRoom", roomId);
        },
        clearRoom: function(){
            this.msgList = [];
        },
        setNickName: function(){
            this.$socket.emit('nickname','김용민');
        }
    }
}
</script>
<style scoped>
body{
    background-color: #f4f7f6;
    margin-top:20px;
}
.card {
    background: #fff;
    transition: .5s;
    border: 0;
    margin-bottom: 30px;
    border-radius: .55rem;
    position: relative;
    width: 100%;
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 10%);
}
.chat-app .people-list {
    width: 280px;
    position: absolute;
    left: 0;
    top: 0;
    padding: 20px;
    z-index: 7
}

.chat-app .chat {
    margin-left: 280px;
    border-left: 1px solid #eaeaea
}

.people-list {
    -moz-transition: .5s;
    -o-transition: .5s;
    -webkit-transition: .5s;
    transition: .5s
}

.people-list .chat-list li {
    padding: 10px 15px;
    list-style: none;
    border-radius: 3px
}

.people-list .chat-list li:hover {
    background: #efefef;
    cursor: pointer
}

.people-list .chat-list li.is-active {
    background: #efefef
}

.people-list .chat-list li .name {
    font-size: 15px
}

.people-list .chat-list img {
    width: 45px;
    border-radius: 50%
}

.people-list img {
    float: left;
    border-radius: 50%
}

.people-list .about {
    float: left;
    padding-left: 8px
}

.people-list .status {
    color: #999;
    font-size: 13px
}

.chat .chat-header {
    padding: 15px 20px;
    border-bottom: 2px solid #f4f7f6
}

.chat .chat-header img {
    float: left;
    border-radius: 40px;
    width: 40px
}

.chat .chat-header .chat-about {
    float: left;
    padding-left: 10px
}

.chat .chat-history {
    padding: 20px;
    height: 600px;
    overflow-y: scroll;
    border-bottom: 2px solid #fff
}

.chat .chat-history ul {
    padding: 0
}

.chat .chat-history ul li {
    list-style: none;
    margin-bottom: 30px
}

.chat .chat-history ul li:last-child {
    margin-bottom: 0px
}

.chat .chat-history .message-data {
    margin-bottom: 15px
}

.chat .chat-history .message-data img {
    border-radius: 40px;
    width: 40px
}

.chat .chat-history .message-data-time {
    color: #434651;
    padding-left: 6px;
    font-size: 6px;
}

.chat .chat-history .message {
    color: #444;
    padding: 8px 10px;
    line-height: 26px;
    font-size: 16px;
    border-radius: 7px;
    /* display: inline-block; */
    display: inline-grid;
    position: relative
}

.chat .chat-history .message:after {
    bottom: 100%;
    left: 7%;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-bottom-color: #fff;
    border-width: 10px;
    margin-left: -10px
}

.chat .chat-history .other-message {
    background: #efefef
}

.chat .chat-history .other-message:after {
    bottom: 100%;
    left: 30px;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-bottom-color: #efefef;
    border-width: 10px;
    margin-left: -10px
}

.chat .chat-history .my-message {
    background: #e8f1f3;
    text-align: right
}

.chat .chat-history .my-message:after {
    border-bottom-color: #e8f1f3;
    left: 91%
}

.chat .chat-message {
    padding: 20px
}

.online,
.offline,
.me {
    margin-right: 2px;
    font-size: 8px;
    vertical-align: middle
}

.online {
    color: #86c541
}

.offline {
    color: #e47297
}

.me {
    color: #1d8ecd
}

.float-right {
    float: right
}

.clearfix:after {
    visibility: hidden;
    display: block;
    font-size: 0;
    content: " ";
    clear: both;
    height: 0
}

@media only screen and (max-width: 767px) {
    .chat-app .people-list {
        height: 465px;
        width: 100%;
        overflow-x: auto;
        background: #fff;
        left: -400px;
        display: none
    }
    .chat-app .people-list.open {
        left: 0
    }
    .chat-app .chat {
        margin: 0
    }
    .chat-app .chat .chat-header {
        border-radius: 0.55rem 0.55rem 0 0
    }
    .chat-app .chat-history {
        height: 300px;
        overflow-x: auto
    }
}

@media only screen and (min-width: 768px) and (max-width: 992px) {
    .chat-app .chat-list {
        height: 650px;
        overflow-x: auto
    }
    .chat-app .chat-history {
        height: 600px;
        overflow-x: auto
    }
}

@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape) and (-webkit-min-device-pixel-ratio: 1) {
    .chat-app .chat-list {
        height: 480px;
        overflow-x: auto
    }
    .chat-app .chat-history {
        height: calc(100vh - 350px);
        overflow-x: auto
    }
}

</style>