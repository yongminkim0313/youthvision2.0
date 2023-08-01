<template>
    <v-card flat width="800">
        <v-card-actions>
            <v-row justify="center">
                <v-dialog v-model="dialog" persistent max-width="290" >
                <template v-slot:activator="{ on, attrs }">
                    <v-btn color="primary" dark v-bind="attrs" v-on="on" >
                    메뉴추가
                    </v-btn>
                </template>
                <v-card>
                    <v-card-title class="text-h5">
                    추가할 메뉴는?
                    </v-card-title>
                    <v-card-text>맛있는 메뉴로 부탁드립니다.</v-card-text>
                    <v-card-actions>
                        <v-text-field v-model="menuName" label="메뉴명" required autofocus></v-text-field>
                        <v-divider></v-divider>
                    <v-btn color="green darken-1" text @click="cancleMenu();" >
                        취소
                    </v-btn>
                    <v-btn color="green darken-1" text @click="insertMenu();" >
                        추가
                    </v-btn>
                    </v-card-actions>
                </v-card>
                </v-dialog>
            </v-row>
        </v-card-actions>
        <v-card-text>
            <v-chip v-for="(item, index) in menuList" :key="index" class="ma-2" close :color="colorList[index]" text-color="white" @click:close="deleteMenu(item.key);" > {{ item.menu }}</v-chip>
        </v-card-text>
        <v-card-text>
            <div class="rouletter">
                <div class="rouletter-bg">
                    <div class="rouletter-wacu" :class="start?'on':''" :style="{ 'transform' : 'rotate(-'+ deg[selectMenu] +'deg)'}">
                        <v-card-text v-for="(item, index) in menuList" :key="index" class="text-center rouletter-text" :style="{ 'transform' : 'rotate('+ deg[index] +'deg)'}">{{ item.menu }}</v-card-text>
                    </div>
                </div>
                <div class="rouletter-arrow"></div>
                <button class="rouletter-btn" @click="starAndStop();">{{!start?'start':'end'}}</button>
            </div>
            <div>
                <v-list nav dense >
                    <v-list-group v-for="(item,index) in historyList" :key="index" no-action>
                        <template v-slot:activator>
                            <v-list-item-content>
                                <v-list-item-title>{{ item.date }}</v-list-item-title> 
                                <v-list-item-title>{{ lastSelMenu(item.date).menuNm }}</v-list-item-title> 
                            </v-list-item-content>
                            <v-list-item-action>{{ item.rgdtDt }}</v-list-item-action> 
                        </template>
                        <v-list-item link v-for="(sItem, sIndex) in item.subList" :key="sIndex">
                            <v-list-item-icon>
                                {{ sIndex+1 }}
                            </v-list-item-icon>
                            <v-list-item-title>{{ sItem.menuNm }}</v-list-item-title>
                            <v-list-item-title>{{ sItem.rgdtDt }}</v-list-item-title>
                        </v-list-item>
                    </v-list-group>
                </v-list>
            </div>



        </v-card-text>
    </v-card>
</template>
<script>
export default {
  components: {},
  name:'RandomLunch',
  props:{userInfo:Object},
  data(){
    return {
        dialog: false,
        menuList:[],
        historyList:[],
        hisList:[],
        menuName: '',
        contents:'',
        colorList: [],
        selectMenu: -1,
        // deg:[0, 300,240,180,120,60],
        deg:[0, 60,120,180,240,300],
        start:false,
        group: null,
    };
  },
  computed: {
    
  },
  created: function(){
    var _this = this;
    for(var i = 0 ; i < 20 ; i++){
        var c = _this.randomColor();
        this.colorList.push(c);
    }
    console.log(this.colorList);
    this.$fireDB.onValue('/lunch/menu',function(snapshot){
        const data = snapshot.val();
        _this.menuList = [];
        if(!data) return;
        Object.keys(data).forEach(function(v){
            _this.menuList.push({menu:data[v],key:v});
        });
    });
    this.$fireDB.onValue('/lunch/history',function(snapshot){
        const data = snapshot.val();
        _this.historyList = [];
        if(!data) return;
        Object.keys(data).forEach(function(key){
            var subL = [];
            Object.keys(data[key]).forEach(function(subKey){
                subL.push(data[key][subKey])
            });
            _this.historyList.push({date: key, subList : subL});
        });
    });
    this.$fireDB.onValue('/lunch/start',function(snapshot){
        const data = snapshot.val();
        console.log(data);
        _this.start = data.start;
        _this.selectMenu = data.selectMenu;
    });
  },
  methods:{
    lastSelMenu: function(paramDate){
        for(var i = 0 ; i < this.historyList.length; i++){
            if(this.historyList[i].date == paramDate){
                var subList = this.historyList[i].subList;
                return subList[subList.length-1];
            }
        }
    },
    cancleMenu: function(){
        this.menuName = '';
        this.dialog = false;
    },
    insertMenu: async function(){
        var _this = this;
        this.$fireDB.push('/lunch/menu',_this.menuName);
        this.menuName = '';
    },
    randomSelect: function(){
        var c = Math.floor(Math.random()*this.menuList.length);
        console.log(c);
        this.selectMenu = c;
        return c;
    },
    updateQnA: async function(){

    },
    deleteMenu: function(seq){
        this.$fireDB.set('/lunch/menu/' + seq ,null);
    },
    randomColor: function (){
        var rc = "#";
        for(var i=0;i<6;i++){
            rc += Math.floor(Math.random()*16).toString(16);
        }
        return rc;
    },
    starAndStop: function(){
        this.start = !this.start;
        var sel = null;
        if(!this.start) {
            sel = this.randomSelect();
            this.choiseLunch(sel);
        }
        this.$fireDB.set('/lunch/start',{start: this.start, selectMenu: sel});
    },
    choiseLunch(sel){
        var today = this.$common.getDate();
        var time = this.$common.getDateTime();
        var menuNm = this.menuList[sel].menu
        var obj = {'rgdtDt': time, 'menuNm': menuNm};
        this.$fireDB.push('/lunch/history/'+today,obj);
    }
  }
}
</script>
<style scoped>
.rouletter{
	position: relative;
    width:100%;
    height:100%;
    min-height:400px;
}
.rouletter-bg{
	position: absolute;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
    width:350px;
    height:350px;
    border-radius:350px;
	overflow:hidden;
}
.rouletter-wacu{
    width:100%;height:100%;
	background: url('../assets/rouletter.png') no-repeat;
    background-size:100%;
    transform-origin: center;
}
.rouletter-text{
    width:100%;height:100%;
    background-size:100%;
    transform-origin: center;
    position:absolute;
    font-size: 1.7em;
}
.rouletter-arrow{
	position: absolute;
    top:0;
    left:50%;
    transform:translateX(-50%);
    width:1px;
    height:1px;
    border-right:10px solid transparent;
    border-left:10px solid transparent;
    border-top:40px solid red;
    border-bottom:0px solid transparent;
}
.rouletter-btn{
	position: absolute;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
    width:80px;
    height:80px;
    border-radius:80px;
    background:#fff;
    border-image: linear-gradient(to right, #fbfcb9be, #ffcdf3aa, #65d3ffaa);
    border: 2px solid;
}

.on{
    animation-name: ani;
    animation-duration: 0.1s;
    animation-fill-mode: forwards;  
    animation-iteration-count: infinite;
}

@keyframes ani{
    0% { 
        transform: rotate(0deg); 
    	transition-timing-function: ease-out;
    }
    100%{ 
        transform: rotate(360deg); 
    }
}
</style>