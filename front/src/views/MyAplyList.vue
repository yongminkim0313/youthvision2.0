<template>
    <v-card width="800" flat>
      <v-container>
        <v-row>
          <v-col cols="12" md="6" sm="12" v-for="item in myAplyList" :key="item.seq">
            <v-card :loading="campLoading" class="mx-auto" max-width="374">
              <template slot="progress">
                <v-progress-linear color="deep-purple" height="10" indeterminate ></v-progress-linear>
              </template>
                <v-img height="200" src="../assets/camps/main/2023_winter_001.jpeg" >
                <v-card-title class="white--text mt-8">
                  <v-avatar size="56">
                    <img alt="프로필이미지" :src="userInfo.thumbnailImageUrl" >
                  </v-avatar>
                  <p class="ml-3"> {{userInfo.nickname}} </p>
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
                참여인원
              </v-card-title>
              <v-card-text>
                {{ item.campCnt }}
              </v-card-text>
              <v-divider class="mx-4"></v-divider>
              <v-card-actions>
                <div class="text-subtitle-1">접수상태에서 수정이 가능합니다.</div>
                <v-btn color="blue" elevation="5" @click="clickList(item);" class="mx-auto" outlined>수정</v-btn>
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
  props:{userInfo:Object},
  data(){return {
    campLoading: false,
    posterLoading: false,
    myAplyList: [],
    myPosterList: [],
  }},
  created() {
    this.getUserAply();
    // this.getPosterAply();
  },
  methods : {
    getUserAply(){
      this.campLoading = true;
      this.$axios.get('/api/user/aply/camp/one')
      .then((result)=>{
        this.myAplyList = result.data;
        this.campLoading = false;
      })
    },
    getPosterAply(){
      this.$axios.get('/api/user/poster')
      .then((result)=>{
        this.myPosterList = result.data;
        this.posterLoading = false;
      })
    },
    clickList(item) {
      if(!item.phone || !item.seq) return;
      this.$router.push({
        name: "캠프신청",
        query: { mode:'edit' },
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