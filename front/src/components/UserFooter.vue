<template>
    <v-footer padless dark class="d-print-none">
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
          이메일 : youthvision1009@naver.com <br />
          네이버 : <a href="https://youthvision.modoo.at">https://youthvision.modoo.at</a><br />
        </v-card-text>
        
        <v-divider></v-divider>
        
        <v-card-text class="white--text text-center">
          <strong>유스비전 미니스트리 YOUTHVISION MINISTRY</strong>

          <div class="mx-2" v-for="member in joinMember">
            <v-avatar color="primary" size="56" >
              <v-img width="30" :src="member.thumbnailImageUrl"></v-img>
            </v-avatar>
          </div>
        </v-card-text>
        
        <!-- <div class="v-btn--kakaomessage">
          <span class="blue--text text-subtitle">카카오내비</span>
          <v-avatar  @click="navi" size="57px">
            <v-img src="https://developers.kakao.com/assets/img/about/buttons/navi/kakaonavi_btn_medium.png" alt="길 안내하기 버튼" >
            </v-img>
          </v-avatar >
        </div> -->
          <v-tooltip left>
            <template v-slot:activator="{ on, attrs }">
              <v-expand-transition>
                <v-btn fab left class="v-btn--kakaochanel" color="red lighten-2" @click="myAplyList" v-bind="attrs" v-on="on" v-show="btn">
                신청내역
                </v-btn>
              </v-expand-transition>
            </template>
            <span>유스비전캠프 신청내역 화면이동</span>
          </v-tooltip>
          <v-dialog v-model="dialog" width="500" >
      <!-- <template v-slot:activator="{ on, attrs }">
        <v-btn fab left class="v-btn--kakaomessage" color="red lighten-2" dark v-bind="attrs" v-on="on">
          GPT
        </v-btn>
      </template> -->

      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          <v-alert outlined color="purple" v-for="(v,i) in gptList" :key="v.id">
            <div class="text-h6"> {{v.request}} </div>
            <v-progress-circular indeterminate color="primary" v-show="v.progress" ></v-progress-circular>
            <div>{{ v.response }}</div>
          </v-alert>
        </v-card-title>

        <v-card-text>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-text-field v-model="message" counter="25" @keypress.enter="KoGPT" ref="message"></v-text-field>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false" >
            닫기
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-footer>
</template>
<script>
  export default {
    data: () => ({
      btn:false,
      myAply:false,
      dialog: false,
      gptList:[],
      message:'',
      joinMember: []
    }),
    created(){
      var _this = this;

      this.$eventBus.$on('joinMember', function(data){
        _this.joinMember = data;
      })


      this.$axios.get('/api/public/myAply')
        .then((result)=>{
          var {data:{acnt,pcnt}} = result;
          //console.log(acnt,pcnt);
          if(acnt+pcnt > 0){
            _this.myAply = true;
          }
          if(this.$route.name == '홈' && this.myAply){
            this.btn=true;
          }else{
            this.btn=false;
          }
        });
    },
    watch:{
      $route(r){
        if(r.name == '홈' && this.myAply){
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
          requestUrl: 'https://jesusdream.kr',
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
      },
      myAplyList: function(){
        this.$router.push('/myAplyList')
      },
      KoGPT: function(){
        var _this = this;
        _this.gptList.push({progress: true, request: _this.message, response: ''});
        this.$axios.post('/api/user/KoGPT',{prompt:_this.message})
        .then(({data})=>{
          var {generations} = data;
          var {text} = generations[0];
          _this.gptList[_this.gptList.length-1].progress = false;
          _this.gptList[_this.gptList.length-1].response = text;
          _this.scrollToElement();
        })
        .catch(err=>{
          console.log(err);
        })
      },
      scrollToElement() {
        const el = this.$refs.message;
        el.focus();
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
    right: 16px;
  }
</style>
