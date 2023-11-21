<template>
  <v-card color="white">
    
    <v-container max-width="800">
      <v-row class="ma-2">
        <v-col cols="12" md="6" sm="12" lg="4">
          <v-card class="mx-auto" max-width="360">
            <v-img src="../assets/camps/page1_1.png" height="200px" ></v-img>
            <v-card-title>2023여름유스비전캠프(since2006)<br/>
                "다음세대들이여 성령으로 비상하라" </v-card-title>
            <v-card-subtitle> 
                ※유스비전캠프는 노는 캠프가 아닙니다.
                살아계신 하나님을 만나는 캠프입니다. 
            </v-card-subtitle>
            <v-card-actions>
              <v-btn color="orange lighten-2" text> 더보기 </v-btn>
              <v-spacer></v-spacer>
              <v-btn icon @click="show01 = !show01">
                <v-icon>{{
                  show01 ? "mdi-chevron-up" : "mdi-chevron-down"
                }}</v-icon>
              </v-btn>
            </v-card-actions>
            <v-expand-transition>
              <div v-show="show01">
                <v-divider></v-divider>
                <v-card-text>
                    ●강사 : 장용성목사(유스비전대표) 이승제목사(가까운교회 담임, 다니엘기도회강사) 김성중교수(장로회신학대학교교수) 박광식선교사(박광식뮤직 인스티튜트대표, 다니엘기도회강사) 문지현선교사 류한상단장 멘토선교단 듀나미스워십 외<br/>
                    <br/>
                    ●날짜 : 8월 3일(목)~5일(토) 2박 3일<br/>
                    ●장소 : 한국침례신학대학교 (대전유성)<br/>
                    ●대상 : 초중고대청장년, 가족 및 교회 선착순500명 조기마감<br/>
                    ●회비 : 87,000원(5월까지 87,000원 6월까지 89,000원 7월부터 91,000원 당일등록 95,000원) | 1인 1만원 선입금시 정식등록  <br/>
                    ●등록 : youthvision.co.kr,  jesusdream.kr<br/>
                    ●문의 : 070-7796-1009, 카카오 오픈채팅방(유스비전캠프)<br/>
                    ●계좌 : 국민 172601-04-185856 (유스비전)<br/>
                    ●주최 : 유스비전미니스트리<br/>
                    ●숙소 : 기숙사 2인 1실 (개인침구 지참)<br/>
                    <br/>
                </v-card-text>
              </div>
            </v-expand-transition>
          </v-card>
        </v-col>
        <v-col cols="12" md="6" sm="12" lg="4">
          <v-card class="mx-auto" max-width="360">
            <v-img src="../assets/camps/card002.jpeg" height="200px" ></v-img>
            <v-card-title>2022겨울유스비전캠프<br/>
                "믿음의 역사를 일으키자!" </v-card-title>
            <v-card-subtitle> 
                ※유스비전캠프는 노는 캠프가 아닙니다.
                살아계신 하나님을 만나는 캠프입니다. 
            </v-card-subtitle>
            <v-card-actions>
              <v-btn color="orange lighten-2" text> 더보기 </v-btn>
              <v-spacer></v-spacer>
              <v-btn icon @click="show02 = !show02">
                <v-icon>{{
                  show02 ? "mdi-chevron-up" : "mdi-chevron-down"
                }}</v-icon>
              </v-btn>
            </v-card-actions>
            <v-expand-transition>
              <div v-show="show02">
                <v-divider></v-divider>
                <v-card-text>
                    ●강사: 장용성목사(유스비전대표) 이삭목사(모퉁이돌선교회 대표) 임우현목사(번개탄) 박윤호목사(강화하늘중앙교회) 손경민목사(은혜, 행복) 정신호목사(이커브미니스트리) 듀나미스워십 외<br/>
                    <br/>
                    ●날짜: 1월 26일(목)~28일(토)<br/>
                    ●장소: 고신대학교 대강당 (천안)<br/>
                    ●대상: 초중고대청장년 선착순500명 조기마감<br/>
                    ●회비: 89,000원(1월부터 93,000원 당일등록 95,000원)<br/>
                    ●신청은 신청게시판을 이용해 주세요.<br/>
                    ●등록: 1인 1만원 선입금시 정식등록  070-7796-1009 youthvision.co.kr <br/>
                    ●계좌 : 국민 172601-04-185856 (유스비전)<br/>
                    ●주최: 유스비전미니스트리<br/>

                    ●2023 필리핀선교캠프(클락, 마닐라)<br/>
                    일정: 2월13(월)~18(토) <br/>
                    강사: 장용성목사 김성환목사<br/>
                    대상: 초4 이상 선착순 25명<br/>
                    참가비: 50만원(항공권별도)<br/>
                    주최: 교회교육선교회 <br/>
                    주관:  유스비전미니스트리<br/>
                    신청:  070-7796-1009<br/>
                </v-card-text>
                
              </div>
            </v-expand-transition>
          </v-card>
        </v-col>
        <v-col cols="12" md="6" sm="12" lg="4">
          <v-card class="mx-auto" max-width="360">
            <v-img src="../assets/camps/joinus.png" height="200px" ></v-img>
            <v-card-title>2023겨울유스비전캠프(since 2006)<br/>
                "길과 진리와 생명되신 예수가 답이다!" </v-card-title>
            <v-card-subtitle> 
                ※유스비전캠프는 노는 캠프가 아닙니다.
                살아계신 하나님을 만나는 캠프입니다. 
            </v-card-subtitle>
            <v-card-actions>
              <v-btn color="orange lighten-2" text> 더보기 </v-btn>
              <v-spacer></v-spacer>
              <v-btn icon @click="show03 = !show03">
                <v-icon>{{
                  show03 ? "mdi-chevron-up" : "mdi-chevron-down"
                }}</v-icon>
              </v-btn>
            </v-card-actions>
            <v-expand-transition>
              <div v-show="show03">
                <v-divider></v-divider>
                <v-card-text>
                    -주제: "믿음의 역사를 일으키자!" <br/>
                    -일시: 1월 21일(금)부터 22일(토) 오전10시~오후8시까지<br/>
                    <br/>
                    -강사: 장용성선교사 (유스비전대표),김영실목사(탈북여성1호목사),추교성목사(우리누리청소년회 강사), 송솔나무(영재플루티스트) 듀나미스워십(양기준 이정미 이소라 정효원)<br/>
                    -장소: 주님이꿈꾸신교회 (경기도 군포시)<br/>
                    -대상: 어린이 청소년 청년 장년 선착순 50명<br/>
                    -참가비: 현장참여 2만원 (점심식사비 제공), 온라인 무료(유튜브, 줌)<br/>
                    -신청: 070-7796-1009<br/>

                    * 유스비전 미니스트리는 예배를 멈추지 않습니다. <br/>
                    * 방역지침을 준수하며 캠프를 진행합니다.<br/>
                </v-card-text>
              </div>
            </v-expand-transition>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
<script>
export default {
  name: 'FAQ',
  data() {
    return {
        show01: true,
        show02: true,
        show03: true,
    };
  },
  computed: {},
  created: function () {this.isMobile();},
  methods: {
    // Mobile 인지 확인
    isMobile: function() {
      const info = navigator.userAgent;
      console.log(info);
      var flag = false;
      if( info.indexOf("iPhone") > -1 || info.indexOf("Android") > -1 || info.indexOf("iPad") > -1 || info.indexOf("iPod") > -1 ) {
        flag = true;
      }
      this.show01=!flag;
        this.show02=!flag;
        this.show03=!flag;
    }
  },
};
</script>
<style scoped>
@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 00% 50%;
  }
}
</style>