<template>
  <v-app>
    <v-card flat tile class="mx-auto overflow-hidden" width="100%">
      <v-app-bar fixed :color="scrollTop?'rgba(255,255,255,0.7)':'rgba(255,255,255,0.1)'" flat class="d-print-none">
      <v-toolbar-title class="d-inline-block text-overline" :class="scrollTop?'black--text':'white--text'" >
        <router-link to="/">
        <v-img alt="주꿈로고" class="d-inline-block" height="20px" width="20px" contain src="./assets/youthvision_logo.svg" transition="scale-transition"> </v-img>
      </router-link>
        YOUTHVISION
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- <template v-for="(menu, idx) in menuList">
        <v-menu open-on-hover offset-y auto tile >
          <template v-slot:activator="{ on, attrs }">
            <v-btn elevation="0" plain color="rgba(100,100,100,0)" dark v-bind="attrs" v-on="on" class="white--text text-h5 d-none d-md-flex d-lg-flex d-xl-flex">
              <span :class="scrollTop?'black--text':'white--text'">{{ menu.title }}</span>
            </v-btn>
          </template>
          <v-list expand>
            <v-spacer></v-spacer>
            <v-list-item link v-for="(sub,si) in menu.subMenu" :key="si" @click="goToPath(sub.menuPath);"> 
              <v-list-item-title>{{ sub.title }}</v-list-item-title> 
            </v-list-item>
            <v-spacer></v-spacer>
          </v-list>
        </v-menu>
        <v-spacer ></v-spacer>
      </template> -->
      <div style="position:relative; display:flex; flex:2 1 auto;" class="d-none d-md-flex d-lg-flex d-xl-flex span-hover">
        <template v-for="(menu, idx) in menuList">
          <span class="text-subtitle px-15 my-5" style="width:18vw;" :class="scrollTop?'black--text':'white--text'" >{{ menu.title }}</span>
        </template>
        <v-card id="dropdown-menu">
          <template v-for="(menu, idx) in menuList">
            <div class="px-15 my-2" style="width:18vw;">
              <div class="my-2 menu-item" v-for="(sub,si) in menu.subMenu" :key="sub.title" @click="goToPath(sub.menuPath);"> 
                <span>{{ sub.title }}</span> 
              </div>
            </div>
          </template>
        </v-card>
      </div>
      <v-spacer></v-spacer>
      <div class="area_util">
        <v-btn v-if="isAdmin" text color="rgba(255,255,255,0)" class="pa-0"><span @click="goToAdmin" class="d-inline-block text-caption" :class="scrollTop?'black--text':'white--text'">관리자</span></v-btn>
        <v-divider v-if="isAdmin" vertical inset class="mx-2" style="height:14px; border-color:rgba(150,150,150,0.5)"></v-divider>
        <v-btn v-if="!isLogin" text color="rgba(255,255,255,0)" class="pa-0"><span @click="kakaoLogin" class="d-inline-block text-caption" :class="scrollTop?'black--text':'white--text'">로그인</span></v-btn>
        <v-btn v-if="isLogin" text color="rgba(255,255,255,0)" class="pa-0"><span @click="kakaoLogout" class="d-inline-block text-caption" :class="scrollTop?'black--text':'white--text'">로그아웃</span></v-btn>
        <!-- <v-divider vertical inset class="mx-2" style="height:14px; border-color:rgba(150,150,150,0.5)"></v-divider> -->
        <!-- <v-btn text color="rgba(255,255,255,0)" class="pa-0"><span @click="quest" class="d-inline-block text-caption" :class="scrollTop?'black--text':'white--text'">문의하기</span></v-btn> -->
        <v-divider vertical inset class="mx-2" style="height:14px; border-color:rgba(150,150,150,0.5)"></v-divider>
        <v-btn text color="rgba(255,255,255,0)" class="pa-0"><span class="d-inline-block text-caption" :class="scrollTop?'black--text':'white--text'" @click="goToFAQ()">HISTORY</span></v-btn>
      </div>
      <!-- <v-spacer></v-spacer> -->
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="d-md-none d-lg-none d-xl-none" :color="scrollTop?'black':'white'" style="text-shadow: 2px 2px 2px gray;"></v-app-bar-nav-icon>
    </v-app-bar>
    
    <v-navigation-drawer v-model="drawer" fixed right temporary class="d-print-none">
      <v-img src="./assets/camps/menubar_img.jpeg" height="300px" dark ></v-img>
      <v-list nav dense >
        <v-list-item-group v-model="group" active-class="deep-purple--text text--accent-4" >
          <v-list-item link @click="goToPath('/');">
            <v-list-item-icon> <v-icon>mdi-home</v-icon> </v-list-item-icon>
            <v-list-item-title>홈</v-list-item-title>
          </v-list-item>
          <v-list-group v-for="(menu,i) in menuList" :key="i" no-action :prepend-icon="menu.menuIcon">
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>{{ menu.title }}</v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item link v-for="(sub, si) in menu.subMenu" :key="si" @click="goToPath(sub.menuPath);">
              <v-list-item-icon>
                <v-icon>{{ sub.menuIcon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ sub.title }}</v-list-item-title>
            </v-list-item>
          </v-list-group>
        </v-list-item-group>

      </v-list>
    </v-navigation-drawer>
    
    <v-card-text class="pa-0 d-flex flex-column justify-center">
      <TopMenuBack></TopMenuBack>
      <v-sheet class="d-flex d-md-none justify-left" v-if="!isHome">
        <v-btn-toggle mandatory v-model="selectedMenu.active" active-class="primary--text">
          <v-btn v-for="(item, i) in selectedMenu.subMenu" :key="i" @click="goToPath(item.menuPath);"> <v-icon v-text="item.menuIcon"></v-icon>{{ item.title }} </v-btn>
        </v-btn-toggle>
      </v-sheet>
      <div style="display: flex; justify-content: center;">
        <v-card width="200" flat class="d-none d-md-flex justify-center " v-if="!isHome">
          <v-list dense>
            <v-divider></v-divider>
            <v-subheader>
              <v-icon v-text="selectedMenu.menuIcon" class="mr-8"></v-icon>
              {{ selectedMenu.title }}
            </v-subheader>
            <v-divider></v-divider>
            <v-list-item-group color="primary" >
              <v-list-item v-for="(item, i) in selectedMenu.subMenu" :key="i" @click="goToPath(item.menuPath);">
                <v-list-item-icon>
                  <v-icon v-text="item.menuIcon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="item.title"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
        <router-view name="default" :userInfo="userInfo"> </router-view>
      </div>
      
    </v-card-text>
    
  </v-card>
  <v-btn class="d-print-none" @click="dialog=true">배너다시보기</v-btn>  
  <router-view name="footer"></router-view>
    
    <v-dialog v-model="dialog" max-width="600px">
      <v-card flat>
        <v-card-actions class="sticky">
          <v-btn color="success" @click="closeBanner(banner.bannerId)">하루동안 보지않기</v-btn>
          <v-spacer></v-spacer>
          <!-- <v-btn color="primary" @click="navi()">네비</v-btn> -->
          <v-btn color="primary" @click="closeBanner(0)">닫기</v-btn>
        </v-card-actions>
        <v-card-title class="text-body-1 text-md-h5">
          {{banner.bannerTitle}}
        </v-card-title>
        <v-card-text> 
          <v-img class="mx-auto" v-if="banner.atchmnflId" :src="'/api/common/image/'+banner.atchmnflId" contain max-height="50vh"> 
            <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center" >
                  <v-progress-circular indeterminate color="grey lighten-5" ></v-progress-circular>
                </v-row>
              </template>
          </v-img>
          <span v-html="banner.bannerContents"></span>
        </v-card-text>
      </v-card>
    </v-dialog>

  </v-app>
</template>
<script>
import TopMenuBack from '@/components/TopMenuBack.vue';
  export default {
    name:'App',
    components: {TopMenuBack},
    data(){ return { 
        dialog: false,
        banner:{},
        drawer: false,
        group: null,
        scrollTop: false,
        userInfo: {},
        selectedMenu:{},
        isHome: true,
        menuList:[],
        isLogin: false,
        isAdmin: false,
        register:{},
        subscription:{},
    }; 
  },
    created() {
        var _this = this;
        this.$eventBus.$on('userInfo',function(sess){
          _this.userInfo = sess;
          _this.isLogin = sess.isLogin;
          _this.isAdmin = sess.auth == 'admin'
        });
        this.selectBanner();
        this.selectMenu();
    },
    watch:{
      $route: function(to, from){
        var _this = this;
        var tmp = null;
        _this.selectedMenu = null;
        _this.isHome = true;
        _this.menuList.forEach(function(val){
          var {subMenu} = val;
          if((tmp = subMenu.findIndex(function(val){return val.menuPath == to.menuPath})) > -1){
             _this.selectedMenu = val;
            _this.selectedMenu['active'] = tmp;
            _this.isHome = false;
          }
        })
      }
    },
    methods:{
      isTop:function(){
        if(window.pageYOffset < 50){
          this.scrollTop=false;
        }else{
          this.scrollTop=true;
        }
      },
      selectBanner: function(){
        this.$axios.get('api/public/banner')
        .then((result)=>{
          if(result.data){
            this.banner = result.data;
            const cookieBannerId = this.$cookies.get("banner");
            if(cookieBannerId !=this.banner.bannerId){
              this.dialog = true;
            }
          }
        })
      },
      selectMenu: function(){
        var _this = this;
        this.$axios.get('api/common/menu')
        .then((result)=>{
          _this.menuList =result.data
        })
      },
      kakaoLogin: function() {
        location.href = 'https://kauth.kakao.com/oauth/authorize?'
            +'client_id=be0d818c768f8e2198c97470fc7577c5&'
            +'redirect_uri='+this.APP_URL+'/auth/kakao/callback&'
            +'response_type=code&'
            +'scope=profile_nickname, profile_image, account_email, gender, friends&'
            +'state='+this.$route.path
      },
      kakaoLogout: function (){
        localStorage.clear();
        console.log(localStorage.tl)
        location.href=this.APP_URL+"/api/auth/logout";
      },
      goToPath: function(menuPath){
        this.$router.push(menuPath).catch(()=>{})
      },
      goToFAQ: function(){
        this.$router.push('/FAQ').catch(()=>{})
      },
      goToAdmin: function(){
        this.$router.push('/admin').catch(()=>{})
      },
      closeBanner: function(bannerId){
        this.$cookies.set("banner", bannerId, 60*60*24*1);
        this.dialog = false;
      },
      clearBannerCookie: function(){
        this.$cookies.remove("banner");
      },
      myKakaoMsgAgree(){
        var _this = this;
        this.axios.post('/auth/myKakaoMsgAgree')
        .then(function(result){
          _this.msgAgree = result.data;
        })
      },
    }
  }
</script>
<style>
@import url('../src/assets/kakao.css');
.v-menu__content {
  max-width:100% !important;
}
.v-btn:not(.v-btn--round).v-size--default{
  min-width: 10px !important;
}
body {padding:0;margin:0;box-sizing:border-box; font: 17px "NotoSans", sans-serif !important; color:#575757;}
.span-hover:hover #dropdown-menu{
  position:absolute;
  display:inline-flex;
  color: white;
  top: 64px;
  background: linear-gradient(to right, #8ed9738d 0%, #8b62fc74 45%,  #8ed9736d 100%);
  background-size: 400% 400%; 
  animation: gradient 7s ease forwards infinite!important; 
}
#dropdown-menu{
  display:none;
  width:100%; 
}
.menu-item{
  cursor: pointer;
}
@keyframes gradient {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 00% 50%; }
}
em{
  font-style: italic !important;
}
.content {
    overflow-wrap: break-word;
    word-wrap: break-word;
    word-break: break-word;
}
blockquote {
    margin: 0;
}

blockquote p {
    padding: 8px;
    background: #eee;
    border-radius: 5px;
}

blockquote p::before {
    content: '\201C';
}

blockquote p::after {
    content: '\201D';
}
.menubar .button {
    font-weight: bold;
    display: inline-flex;
    background: transparent;
    border: 0;
    color: black;
    padding: 0.2rem 0.5rem;
    margin-right: 0.2rem;
    border-radius: 3px;
    cursor: pointer;
}
.menubar .button:hover {
    background-color: rgba(black, 0.05);
    color: red;
}
.menubar .button .v-icon:hover {
    background-color: rgba(black, 0.05);
    color: red;
}
.menubar .is-active {
    background-color: rgba(black, 0.1);
}
.ProseMirror {
    border: dashed;
}
.text-caption{
  text-shadow: 2px 2px 2px gray;
}
.sticky {
        position: -webkit-sticky; /* 사파리 브라우저 지원 */
        position: sticky;
        top: 0px;
        background: white;
        z-index:999;
    }
</style>
