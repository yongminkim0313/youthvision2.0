<template>
    <v-app-bar app dense style="height:7rem; background:linear-gradient(0deg, rgba(255,255,255,0.5) 0%, rgb(255, 255, 255,0.1) 50%, rgba(255,255,255,0.72) 100%)" fixed >
        <router-link to="/" class="mr-auto"> 
            <v-img alt="주꿈로고" class="mr-2 youthvisionlogo" contain src="../assets/youthvision_logo.svg" transition="scale-transition"/> </router-link>
        <v-spacer></v-spacer>
        <span @click="goAdminPage" v-if="isAdmin" class="amber--text text--darken-3 font-weight-bold d-sm-flex mr-2" style="font-size:2rem;" >관리자페이지 </span>
        <span @click="goCampLivePage" class="amber--text text--darken-3 font-weight-bold d-sm-flex mr-2" style="font-size:2rem;" >CAMPLIVE </span>
        <span @click="kakaoLogin" v-if="!cookie" class="amber--text text--darken-3 font-weight-bold d-sm-flex" style="font-size:2rem;" >카카오로그인 </span>
        <span @click="kakaoLogout" v-if="cookie" class="amber--text text--darken-3 font-weight-bold d-none d-sm-flex" style="font-size:2rem;" >로그아웃 </span>
    </v-app-bar>
</template>
<script>
export default {
    name:'UserHeader',
    data(){ return { }; },
    created() { },
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
        kakaoLogin: function() {
            location.href = 'https://kauth.kakao.com/oauth/authorize?'
                +'client_id=be0d818c768f8e2198c97470fc7577c5&'
                +'redirect_uri='+this.APP_URL+'/auth/kakao/callback&'
                +'response_type=code&'
                +'scope=profile_nickname, profile_image, account_email, gender, friends';
        },
        kakaoLogout: function (){
            location.href=this.APP_URL+"/auth/logout";
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
<style>
 .youthvisionlogo{
    width: 7rem;
 }
</style>