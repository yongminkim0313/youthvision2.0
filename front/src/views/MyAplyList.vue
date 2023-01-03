<template>
    <v-card max-width="920" class="mx-auto my-5 pa-5">
      
      <v-divider class="pa-2"></v-divider>
      <v-container>
        <v-row>
          <v-col cols="12" md="6" sm="12" v-for="item in myAplyList" :key="item.seq">
            <v-card :loading="campLoading" class="mx-auto" max-width="374">
              <template slot="progress">
                <v-progress-linear color="deep-purple" height="10" indeterminate ></v-progress-linear>
              </template>
                <v-img height="200" src="../assets/jd3.jpeg" >
                <v-card-title class="white--text mt-8">
                  <v-avatar size="56">
                    <img
                      alt="프로필이미지"
                      :src="USERINFO.profileImage"
                    >
                  </v-avatar>
                  <p class="ml-3">
                    {{USERINFO.name}}
                  </p>
                </v-card-title>
                </v-img>
              <v-card-title>캠프등록 신청내역 ({{item.aplyPrgrs}})</v-card-title>
              <v-card-subtitle>
                <v-icon small color="green darken-2" >
                  mdi-church
                </v-icon>
                {{item.church}}
              </v-card-subtitle>
              <v-card-text>
                <div class="text-overline mb-4">
                  신청일: {{item.aplyDt}} 신청자명: {{item.aplyName}} 
                </div>
                <div class="my-4 text-subtitle-1">{{item.churchAdtr}}</div>
              </v-card-text>
              <v-divider class="mx-4"></v-divider>
              <v-card-title>
                <v-icon large color="green darken-2" > mdi-counter </v-icon>
                {{item.schdlSe}} 참여인원
              </v-card-title>
              <v-card-text>
                <v-chip-group active-class="deep-purple accent-4 white--text" column >
                  <v-chip small v-if="item.campCnt.chodeung">
                      {{ '초등:'+item.campCnt.chodeung}}
                  </v-chip>
                  <v-chip small v-if="item.campCnt.cheongsonyeon">
                      {{ '청소년:'+item.campCnt.cheongsonyeon}}
                  </v-chip>
                  <v-chip small v-if="item.campCnt.cheongnyeon">
                      {{ '청년:'+item.campCnt.cheongnyeon}}
                  </v-chip>
                  <v-chip small v-if="item.campCnt.jangnyeon">
                      {{ '장년:'+item.campCnt.jangnyeon}}
                  </v-chip>
                  <v-chip small v-if="item.campCnt.sayeogja">
                      {{ '사역자:'+item.campCnt.sayeogja}}
                  </v-chip>
                </v-chip-group>
              </v-card-text>
              <v-divider class="mx-4"></v-divider>
              <v-card-actions>
                <div class="text-subtitle-1">접수상태에서 수정이 가능합니다.</div>
                <v-btn color="blue" elevation="5" @click="clickList(item);" class="mx-auto" outlined>수정</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col cols="12" md="6" sm="12" v-for="item in myPosterList" :key="item.seq">
            <v-card :loading="posterLoading" class="mx-auto" max-width="374">
              <v-img contain src="../assets/jd3.jpeg" class="white--text align-end" max-height="249px">
                <v-card-title class="text-no-wrap secondary">브로셔 수량:{{item.brochureCnt}}개</v-card-title>
              </v-img>
              <v-divider class="pa-2"></v-divider>
              <v-img contain src="../assets/jd3.jpeg" class="white--text align-end" max-height="249px">
                <v-card-title class="text-no-wrap secondary">포스터 수량:{{item.posterCnt}}개</v-card-title>
              </v-img>
              <v-card-text>
                접수상태: {{item.aplyPrgrs}} 우편물주소:{{item.addr}} {{item.dtlAddr}}
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="6" sm="12" v-if="myPosterList.length == 0">
            <v-card :loading="posterLoading" class="mx-auto" max-width="374">
              <v-img contain src="../assets/camps/2023_winter/brocher1.jpeg" class="white--text align-end" max-height="252px"></v-img>
              <v-img contain src="../assets/camps/2023_winter/brocher2.jpeg" class="white--text align-end" max-height="252px">
                <v-card-title class="text-no-wrap secondary">브로셔</v-card-title>
              </v-img>
              <v-divider class="pa-2"></v-divider>
              <v-img contain src="../assets/camps/2023_winter/poster1.jpeg" class="white--text align-end" max-height="504px">
                <v-card-title class="text-no-wrap secondary">포스터</v-card-title>
              </v-img>
              <v-card-actions>
                <v-btn color="blue" elevation="5" @click="aplyPoster();" class="mx-auto" outlined>포스터 신청하러가기</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    
</template>

<script>

export default {
  name: 'MyAplyList',
  components: { },
  data(){return {
    campLoading: true,
    posterLoading: true,
    myAplyList: [],
    myPosterList: [],
  }},
  created() {
    // this.getUserAply();
    // this.getPosterAply();
  },
  methods : {
    getUserAply(){
      this.axios.get('/user/aply')
      .then((result)=>{
        this.myAplyList = result.data;
        this.campLoading = false;
      })
    },
    getPosterAply(){
      this.axios.get('/user/poster')
      .then((result)=>{
        this.myPosterList = result.data;
        this.posterLoading = false;
      })
    },
    clickList(item) {
      if(!item.phone || !item.seq) return;
      this.$router.push({
        name: "MyAply",
        query: { phone: item.phone, seq: item.seq },
      });
    },
    clickReg(){
      this.$router.push({
        name: "User",
        query: {},
      })
    },
    clickAbout(){
      this.$router.push({
        name: "About",
        query: {},
      }); 
    },
    aplyPoster(){
        this.$router.push({
          name: "About",
          query: {tab:'poster'}
        })
    }
  }

}
</script>