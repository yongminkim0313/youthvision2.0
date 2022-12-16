<template>
    <v-footer padless dark>
        <v-card-text class="d-flex justify-center">
          <v-btn class="mx-4 white--text" icon @click="facebook()">
            <v-icon size="24px"> mdi-facebook </v-icon>
          </v-btn>

          <v-btn class="mx-4 white--text" icon @click="youtube()">
            <v-icon size="24px"> mdi-youtube </v-icon>
          </v-btn>
          
          <v-btn class="mx-4 white--text" icon @click="instagram()">
            <v-icon size="24px"> mdi-instagram </v-icon>
          </v-btn>
        </v-card-text>

        <v-card-text class="white--text text-center px-auto">
          장용성 선교사/목사  경기도 군포시 산본천로 211번길 13, 3층  <br />
            전화번호 : 070-7796-1009  <br />
            이메일 : youthvision1009@naver.com
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="white--text text-center">
          <strong>유스비전 미니스트리 YOUTHVISION MINISTRY</strong>
        </v-card-text>
        
          <v-tooltip left>
            <template v-slot:activator="{ on, attrs }">
              <v-expand-transition>
                <v-btn fab left class="v-btn--kakaochanel kakaoLogin" @click="kakaoChanel()" v-bind="attrs" v-on="on" v-show="btn">
                <v-img width="56px" height="56px" contain :src="require('../assets/kakao_chanel.png')"></v-img>
              </v-btn>
              </v-expand-transition>
            </template>
            <span>유스비전카카오채널</span>
          </v-tooltip>
          <v-tooltip left>
            <template v-slot:activator="{ on, attrs }">
              <v-expand-transition>
                <v-btn fab left class="v-btn--kakaomessage kakaoLogin" @click="kakaoChanelChat()" v-bind="attrs" v-on="on" v-show="btn">
                  <v-icon class="kakaoText--text">mdi-message-outline</v-icon>
                </v-btn>
              </v-expand-transition>
            </template>
            <span>유스비전카카오채널챗</span>
          </v-tooltip>
          <v-tooltip left>
            <template v-slot:activator="{ on, attrs }">
              <v-expand-transition>
                <v-btn fab left class="v-btn--kakaoshare kakaoLogin" @click="kakaoshare()" v-bind="attrs" v-on="on" v-show="btn">
                  <v-icon class="kakaoText--text">mdi-share-variant</v-icon>
                </v-btn>
              </v-expand-transition>
            </template>
            <span>유스비전카카오공유</span>
          </v-tooltip>
    
  </v-footer>
</template>
<script>
  export default {
    data: () => ({
      btn:false,
    }),
    created(){
      if(this.$route.name=='Main') this.btn=true;
      else this.btn=false;
    },
    watch:{
      $route(r){
        if(r.name == 'Main'){
          this.btn=true;
        }else{
          this.btn=false;
        }
      }
    },
    methods: {
      facebook: function(){
        location.href = 'https://www.facebook.com/groups/419662904835077/media/';
      },
      youtube: function(){
        location.href = 'https://www.youtube.com/channel/UCKpUmAMNQxzzqcTdpJHHMgA'
      },
      instagram: function(){
        location.href = 'https://www.instagram.com/youthvision_ministry/';
      },
      kakaoshare: function(){
        Kakao.Link.sendScrap({
          requestUrl: 'http://jesusdream.kr',
          templateId: 77557
        });
      },
      kakaoChanel: function(){
        Kakao.Channel.addChannel({
          channelPublicId: '_xclMYb'
        });
      },
      kakaoChanelChat: function(){
        Kakao.Channel.chat({
          channelPublicId: '_xclMYb' // 카카오톡 채널 홈 URL에 명시된 id로 설정합니다.
        });
      }

    }

  }
</script>
<style>
  /* This is for documentation purposes and will not be needed in your application */
  .v-btn--kakaoshare {
    bottom: 50px;
    position: fixed !important;
    margin: 0 0 16px 16px;
    right: 16px
  }
  .v-btn--kakaochanel {
    bottom: 115px;
    position: fixed !important;
    margin: 0 0 16px 16px;
    right: 16px
  }
  .v-btn--kakaomessage {
    bottom: 180px;
    position: fixed !important;
    margin: 0 0 16px 16px;
    right: 16px
  }
</style>
