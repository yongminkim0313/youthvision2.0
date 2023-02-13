<template>
  <v-app>
    <v-card class="mx-auto overflow-hidden" width="100%">
    <v-app-bar fixed :color="scrollTop?'':'rgba(255,255,255,0)'" flat>
      <v-toolbar-title class="d-inline-block text-overline" :class="scrollTop?'black--text':'white--text'" >
        <v-img alt="주꿈로고" class="d-inline-block" height="20px" width="20px" contain src="./assets/youthvision_logo.svg" transition="scale-transition"> </v-img>
        YOUTHVISION
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <template v-for="(menu, i) in menuList">
        <v-menu open-on-hover offset-y auto tile :key="i">
          <template v-slot:activator="{ on, attrs }">
            <v-btn elevation="0" plain color="rgba(100,100,100,0)" dark v-bind="attrs" v-on="on" class="white--text text-h5 d-none d-md-flex d-lg-flex d-xl-flex">
              <span :class="scrollTop?'black--text':'white--text'">{{ menu.title }}</span>
            </v-btn>
          </template>
          <v-sheet class="" width="100vw" height="200px">
            <v-list expand>
              <v-list-item link v-for="(sub,si) in menu.subMenu" :key="si"> 
                <v-list-item-title>{{ sub.subTitle }}</v-list-item-title> 
              </v-list-item>
            </v-list>
          </v-sheet>
        </v-menu>
        <v-spacer :key="i"></v-spacer>
      </template>
      <div class="area_util">
        <span @click="kakaoLogin" class="d-inline-block text-caption" :class="scrollTop?'black--text':'white--text'">로그인</span>
        <v-divider vertical inset class="mx-2" style="height:14px; border-color:rgba(150,150,150,0.5)"></v-divider>
        <span class="d-inline-block text-caption" :class="scrollTop?'black--text':'white--text'">문의하기</span>
        <v-divider vertical inset class="mx-2" style="height:14px; border-color:rgba(150,150,150,0.5)"></v-divider>
        <span class="d-inline-block text-caption" :class="scrollTop?'black--text':'white--text'">FAQ</span>
        
      </div>
      <v-spacer></v-spacer>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="d-md-none d-lg-none d-xl-none" color="white"></v-app-bar-nav-icon>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" fixed right temporary >
      <v-img
        src="https://cdn.vuetifyjs.com/images/lists/ali.png"
        height="300px"
        dark
      ></v-img>
      <v-list nav dense >
        <v-list-item-group v-model="group" active-class="deep-purple--text text--accent-4" >

          <v-list-group v-for="(menu,i) in menuList" :key="i" no-action prepend-icon="mdi-account-circle">
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>{{ menu.title }}</v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item link v-for="(sub, si) in menu.subMenu" :key="si">
              <v-list-item-title>{{ sub.subTitle }}</v-list-item-title>
              <v-list-item-icon>
                <v-icon>{{ sub.icon }}</v-icon>
              </v-list-item-icon>
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
          {title:'소개'
            ,subMenu:[
              {subTitle:'준비중입니다.1', path:'/',icon:'mdi-bottle-tonic-plus'},
              {subTitle:'준비중입니다.2', path:'/',icon:'mdi-bottle-tonic-plus'}
            ]
          },
          {title:'소식'
            ,subMenu:[
              {subTitle:'준비중입니다.3', path:'/',icon:'mdi-bottle-tonic-plus'},
              {subTitle:'준비중입니다.4', path:'/',icon:'mdi-bottle-tonic-plus'}
            ]
          },
        ],
    }; },
    created() {
        window.addEventListener("scroll", this.isTop);
    },
    methods:{
      isTop:function(){
        if(window.pageYOffset==0){
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
    }
  }
</script>
<style>
@import url('../src/assets/kakao.css');
.v-menu__content {
  max-width:100% !important;
}

</style>
