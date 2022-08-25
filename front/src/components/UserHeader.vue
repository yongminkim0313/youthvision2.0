<template>
    <v-app-bar
      style="background:linear-gradient(0deg, rgba(255,255,255,0.72) 0%, rgb(255, 255, 255,0.1) 50%, rgba(255,255,255,0.8) 100%)"
      dark
      fixed
    >
      <div class="d-flex align-center">
        <router-link to="/" class="mr-auto">
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

      <v-btn href="#" text >
        <span 
        class="mr-2 amber--text text--darken-3 font-weight-bold d-none d-sm-flex"
        style="text-shadow: 5px 5px 5px rgba(133,100,155,0.8);"
        >카카오로그인
        </span>
        <v-icon
        class="mr-2 amber--text text--darken-3 font-weight-bold"
        >mdi-account-supervisor</v-icon>
      </v-btn>
    </v-app-bar>
</template>
<script>
export default {
    name:'UserHeader',
    data(){
        return {
            loading: false
            ,userInfo:{auth:'user',name:''}
            ,isLogin: false
            ,drawer: null
            ,items: [
                        { text: '캠프소개', disabled: false, to: 'about', },
                        { text: '캠프등록', disabled: false, to: 'user', },
                        { text: '홈', disabled: false, to: '/', },
                        { text: '캠프실황', disabled: false, to: 'campLive', },
                        { text: '언론보도', disabled: false, to: 'newscast', },
                    ],
        };
    },
    created() {
    },
    methods: {
        kakaoLogin: function() {
            location.href = 'https://kauth.kakao.com/oauth/authorize?'
                +'client_id=be0d818c768f8e2198c97470fc7577c5&'
                +'redirect_uri='+this.APP_URL+'/auth/kakao/callback&'
                +'response_type=code&'
                +'scope=profile_nickname, profile_image, account_email, gender, friends';
            this.loading = !this.loading;
            setTimeout(() => (this.loading = false), 3000);
        },
        logout: function (){
            location.href=this.APP_URL+"/auth/logout";
        },
        goAdminPage: function(){
            this.$router.push('/admin').catch(()=>{})
        },
        goAplyPage: function(){
            this.$router.push('/user').catch(()=>{})
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