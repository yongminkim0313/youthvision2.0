<template>
    
    <v-card>
    <v-app-bar style="background:rgba(100,100,100,0.1)" fixed elevation="0">
        
        <router-link to="/" class="mr-auto">
                <v-img alt="주꿈로고" class="d-inline-block" height="2rem" width="2rem" contain src="../assets/youthvision_logo.svg" transition="scale-transition"> </v-img>
                <span class="d-inline-block white--text text-h5">YOUTHVISION</span>
        </router-link>
        <v-spacer></v-spacer>
        <span @click="goAdminPage" v-if="isAdmin" class="amber--text text--darken-3 font-weight-bold d-sm-flex mr-2" >관리자페이지 </span>
        <span @click="goAplyPoster" class="amber--text text--darken-3 font-weight-bold d-sm-flex mr-2" >포스터신청 </span>
        <span @click="goCampLivePage" class="amber--text text--darken-3 font-weight-bold d-sm-flex mr-2" >CAMPLIVE </span>
        <span @click="kakaoLogin" v-if="!cookie" class="amber--text text--darken-3 font-weight-bold d-sm-flex" >카카오로그인 </span>
        <span @click="kakaoLogout" v-if="cookie" class="amber--text text--darken-3 font-weight-bold d-none d-sm-flex" >로그아웃 </span>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      absolute
      bottom
      temporary
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item>
            <v-list-item-title>Foo</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Bar</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Fizz</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Buzz</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
</v-card>
</template>
<script>
export default {
    name:'UserHeader',
    data(){ return { 
        drawer: false,
        group: null,
    }; },
    created() {
        window.addEventListener("resize", this.handleResize);
    },
    destroyed() {
        window.removeEventListener("resize", this.handleResize);
    },
    computed:{
        cookie(){
            if(this.$cookies.get('isLogin')==="001"){ return true; }
            else{ return false; }
        },
        isAdmin(){
            if(this.$cookies.get('auth')==="admin"){ return true; }
            else{ return false; }
        }
    },
    methods: {
        handleResize() {
            this.clientHeight = window.innerHeight;
            console.log("clientHeight:::", this.clientHeight);
        },
        handleScroll: function (event) {
            console.log(window.scrollY);
        },
        kakaoLogin: function() {
            location.href = 'https://kauth.kakao.com/oauth/authorize?'
                +'client_id=be0d818c768f8e2198c97470fc7577c5&'
                +'redirect_uri='+this.APP_URL+'/auth/kakao/callback&'
                +'response_type=code&'
                +'scope=profile_nickname, profile_image, account_email, gender, friends';
        },
        kakaoLogout: function (){
            location.href=this.APP_URL+"/api/auth/logout";
        },
        goAdminPage: function(){
            this.$router.push('/admin').catch(()=>{})
        },
        goAplyPage: function(){
            this.$router.push('/user').catch(()=>{})
        },
        goCampLivePage: function(){
            this.$router.push('/campLive').catch(()=>{})
        },
        goAdminPage: function(){
            this.$router.push('/aplyList').catch(()=>{})
        },
        goAplyPoster: function(){
            this.$router.push('/aplyPoster').catch(()=>{})
        },
        loginGuest: function(){
            this.axios.post('/login/guest')
            .then(()=>{

            })
        },
        goMyAplyList: function(){
            this.$router.push('/myAplyList').catch(()=>{})
        },

    },

}
</script>