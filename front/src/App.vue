<template>
  <v-app>
    <v-card class="mx-auto overflow-hidden" width="100%">
    <v-app-bar fixed :color="scrollTop?'':'rgba(255,255,255,0)'" flat>
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
            <v-list-item link v-for="(sub,si) in menu.subMenu" :key="si" @click="goToPath(sub.path);"> 
              <v-list-item-title>{{ sub.subTitle }}</v-list-item-title> 
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
            <div class="list px-15 my-2" style="width:18vw;">
              <div class="list-item my-2" link v-for="(sub,si) in menu.subMenu" :key="sub.subTitle" @click="goToPath(sub.path);"> 
                <span>{{ sub.subTitle }}</span> 
              </div>
            </div>
          </template>
        </v-card>
      </div>
      <v-spacer></v-spacer>
      <div class="area_util">
        <v-btn v-if="!isLogin" text color="rgba(255,255,255,0)" class="pa-0"><span @click="kakaoLogin" class="d-inline-block text-caption" :class="scrollTop?'black--text':'white--text'">로그인</span></v-btn>
        <v-btn v-if="isLogin" text color="rgba(255,255,255,0)" class="pa-0"><span @click="kakaoLogout" class="d-inline-block text-caption" :class="scrollTop?'black--text':'white--text'">로그아웃</span></v-btn>
        <v-divider vertical inset class="mx-2" style="height:14px; border-color:rgba(150,150,150,0.5)"></v-divider>
        <v-btn text color="rgba(255,255,255,0)" class="pa-0"><span class="d-inline-block text-caption" :class="scrollTop?'black--text':'white--text'">문의하기</span></v-btn>
        <v-divider vertical inset class="mx-2" style="height:14px; border-color:rgba(150,150,150,0.5)"></v-divider>
        <v-btn text color="rgba(255,255,255,0)" class="pa-0"><span class="d-inline-block text-caption" :class="scrollTop?'black--text':'white--text'" @click="goToFAQ()">FAQ</span></v-btn>
      </div>
      <!-- <v-spacer></v-spacer> -->
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="d-md-none d-lg-none d-xl-none" :color="scrollTop?'black':'white'"></v-app-bar-nav-icon>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" fixed right temporary >
      <v-img src="./assets/camps/menubar_img.jpeg" height="300px" dark ></v-img>
      <v-list nav dense >
        <v-list-item-group v-model="group" active-class="deep-purple--text text--accent-4" >
          <v-list-item link @click="goToPath('/');">
            <v-list-item-icon> <v-icon>mdi-home</v-icon> </v-list-item-icon>
            <v-list-item-title>홈</v-list-item-title>
          </v-list-item>
          <v-list-group v-for="(menu,i) in menuList" :key="i" no-action :prepend-icon="menu.icon">
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>{{ menu.title }}</v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item link v-for="(sub, si) in menu.subMenu" :key="si" @click="goToPath(sub.path);">
              <v-list-item-icon>
                  <v-icon>{{ sub.icon }}</v-icon>
              </v-list-item-icon>
                  <v-list-item-title>{{ sub.subTitle }}</v-list-item-title>
            </v-list-item>
          </v-list-group>

        </v-list-item-group>

      </v-list>
    </v-navigation-drawer>

    <v-card-text class="pa-0">
      <router-view name="default"></router-view>
    </v-card-text>
  </v-card>
    <v-main>
    </v-main>
    <router-view name="footer"></router-view>
  </v-app>
</template>
<script>
  export default {
    name:'App',
    data(){ return { 
        drawer: false,
        group: null,
        scrollTop: false,
        menuList:[
          {
            title:'소개'
            ,subMenu:[
              {subTitle:'초대의글', path:'/about',icon:'mdi-bottle-tonic-plus'},
              {subTitle:'유스비전소개', path:'/youthvision',icon:'mdi-information-slab-circle'},
            ]
            ,icon:'mdi-account-circle'
          },
          {
            title:'소식'
            ,subMenu:[
              {subTitle:'CAMP LIVE', path:'/campLive',icon:'mdi-youtube'},
              {subTitle:'NEWS CAST', path:'/newsCast',icon:'mdi-newspaper'}
            ]
            ,icon:'mdi-bullhorn'
          },
          {
            title:'신청'
            ,subMenu:[
              {subTitle:'캠프신청', path:'/board',icon:'mdi-human-capacity-increase'},
              {subTitle:'브로셔신청', path:'/board',icon:'mdi-cart-variant'},
            ]
            ,icon:'mdi-send'
          },
          {
            title:'커뮤니티'
            ,subMenu:[
              {subTitle:'Q&A', path:'/board',icon:'mdi-chat-question'},
              {subTitle:'공지사항', path:'/board',icon:'mdi-clipboard-text-outline'},
            ]
            ,icon:'mdi-form-select'
          },
        ],
    }; },
    created() {
        window.addEventListener("scroll", this.isTop);
        console.log(this.isLogin);
    },
    computed:{
        isLogin(){
            if(this.$cookies.get('isLogin')==="001"){ return true; }
            else{ return false; }
        },
        isAdmin(){
            if(this.$cookies.get('auth')==="admin"){ return true; }
            else{ return false; }
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
      kakaoLogin: function() {
        location.href = 'https://kauth.kakao.com/oauth/authorize?'
            +'client_id=be0d818c768f8e2198c97470fc7577c5&'
            +'redirect_uri='+this.APP_URL+'/auth/kakao/callback&'
            +'response_type=code&'
            +'scope=profile_nickname, profile_image, account_email, gender, friends';
      },
      kakaoLogout: function (){
        localStorage.clear();
        console.log(localStorage.tl)
        location.href=this.APP_URL+"/api/auth/logout";
      },
      goToPath: function(path){
        this.$router.push(path).catch(()=>{})
      },
      goToFAQ: function(){
        this.$router.push('/FAQ').catch(()=>{})
      }
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
  background: linear-gradient(to right, #8ed973 0%, #8c62fc 45%,  #8ed973 100%);
  background-size: 400% 400%; 
  animation: gradient 7s ease forwards infinite!important; 
}
#dropdown-menu{
  display:none;
  width:100%; 
}
@keyframes gradient {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 00% 50%; }
}
</style>
