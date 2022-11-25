<template>
    <v-app-bar
      style="background:linear-gradient(0deg, rgba(255,255,255,0.72) 0%, rgb(255, 255, 255,0.1) 50%, rgba(255,255,255,0.8) 100%)"
      dark
      fixed
    >
      <div class="d-flex align-center">
        <router-link to="/connectLog" class="mr-auto">
            <v-img
            alt="주꿈로고"
            class="shrink mr-2"
            contain
            src="../assets/jesusdream.png"
            transition="scale-transition"
            width="40"
            />
        </router-link>

      </div>

      <v-spacer></v-spacer>

      <v-btn text @click="goCampLivePage">
        <span 
        class="mr-2 amber--text text--darken-3 font-weight-bold d-none d-sm-flex"
        style="text-shadow: 5px 5px 5px rgba(133,100,155,0.8);"
        >campLive
        </span>
      </v-btn>

      <v-btn text v-if="!cookie" @click="kakaoLogin">
        <span 
        class="mr-2 amber--text text--darken-3 font-weight-bold d-none d-sm-flex"
        style="text-shadow: 5px 5px 5px rgba(133,100,155,0.8);"
        >카카오로그인
        </span>
        <v-icon
        class="mr-2 amber--text text--darken-3 font-weight-bold"
        >mdi-account-supervisor</v-icon>
      </v-btn>
      <v-btn text v-if="cookie" @click="kakaoLogout">
        <span 
        class="mr-2 amber--text text--darken-3 font-weight-bold d-none d-sm-flex"
        style="text-shadow: 5px 5px 5px rgba(133,100,155,0.8);"
        >로그아웃
        </span>
        <v-icon
        class="mr-2 amber--text text--darken-3 font-weight-bold"
        >mdi-account-supervisor</v-icon>
      </v-btn>
      <!-- <router-link to="/user" class="mr-auto">
            user
      </router-link> -->
    </v-app-bar>
</template>
<script>
export default {
    name:'UserHeader',
    data(){
        return {
        };
    },
    created() {
    },
    computed:{
        cookie(){
            if(this.$cookies.get('isLogin')==="001"){
                return true;
            }else{
                return false;
            }
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