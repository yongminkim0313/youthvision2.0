<template>
  <v-app>
    <v-card class="mx-auto overflow-hidden" width="100%">
    <v-app-bar fixed :color="scrollTop?'':'rgba(255,255,255,0)'" flat>
      <v-toolbar-title class="d-inline-block text-overline" :class="scrollTop?'black--text':'white--text'" >
        <v-img alt="주꿈로고" class="d-inline-block" height="20px" width="20px" contain src="./assets/youthvision_logo.svg" transition="scale-transition"> </v-img>
        YOUTHVISION
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu open-on-hover offset-y auto tile >
        <template v-slot:activator="{ on, attrs }">
          <v-btn elevation="0" plain color="rgba(100,100,100,0)" dark v-bind="attrs" v-on="on" class="white--text text-h5 d-none d-md-flex d-lg-flex d-xl-flex">
            <span :class="scrollTop?'black--text':'white--text'">소개</span>
          </v-btn>
        </template>
        <v-sheet class="" width="100vw" height="200px">
          <v-list expand>
            <v-list-item link> <v-list-item-title>준비중입니다.</v-list-item-title> </v-list-item>
          </v-list>
        </v-sheet>
      </v-menu>
      <v-spacer></v-spacer>
      <v-menu open-on-hover offset-y auto tile open-delay="20">
        <template v-slot:activator="{ on, attrs }">
          <v-btn elevation="0" plain color="rgba(100,100,100,0)" dark v-bind="attrs" v-on="on" class="white--text text-h5 d-none d-md-flex d-lg-flex d-xl-flex">
            <span :class="scrollTop?'black--text':'white--text'">소식</span>
          </v-btn>
        </template>
        <v-sheet class="" width="100vw" height="200px">
          <v-list expand>
            <v-list-item link> <v-list-item-title>준비중입니다.</v-list-item-title> </v-list-item>
          </v-list>
        </v-sheet>
      </v-menu>
        <v-spacer></v-spacer>
        <div class="area_util">
          <span @click="kakaoLogin" class="d-inline-block text-caption" :class="scrollTop?'black--text':'white--text'">로그인</span>
          <v-divider vertical inset class="mx-2" style="height:14px; border-color:rgba(150,150,150,0.5)"></v-divider>
          <span class="d-inline-block text-caption" :class="scrollTop?'black--text':'white--text'">문의하기</span>
          <v-divider vertical inset class="mx-2" style="height:14px; border-color:rgba(150,150,150,0.5)"></v-divider>
          <span class="d-inline-block text-caption" :class="scrollTop?'black--text':'white--text'">FAQ</span>
          
        </div>
        <v-spacer></v-spacer>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="d-md-none d-lg-none d-xl-none"></v-app-bar-nav-icon>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" fixed right temporary >
      <v-img
        src="https://cdn.vuetifyjs.com/images/lists/ali.png"
        height="300px"
        dark
      ></v-img>
      <v-list nav dense >
        <v-list-item-group v-model="group" active-class="deep-purple--text text--accent-4" >

          <v-list-group no-action prepend-icon="mdi-account-circle" >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>소개</v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item link >
              <v-list-item-title> 준비중입니다.</v-list-item-title>
              <v-list-item-icon>
                <v-icon>mdi-bottle-tonic-plus</v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list-group>
          <v-list-group no-action prepend-icon="mdi-account-circle" >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>소식</v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item link >
              <v-list-item-title> 준비중입니다.</v-list-item-title>
              <v-list-item-icon>
                <v-icon>mdi-tag</v-icon>
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
