<template>
    <v-card color="white">
        <v-img src="../assets/about_top_bg.png" height="64" cover ></v-img>
        <v-card-title class="d-none d-sm-flex "><h2 class="mx-auto my-10">다음세대 부흥을 일으키는</h2></v-card-title>
        <v-card-title class="d-sm-none d-flex">다음세대 부흥을 일으키는</v-card-title>
        <v-card class="d-flex flex-wrap" flat>
            <v-img class="d-none d-sm-block" src="../assets/about_bg_001.png" width="50vw" height="100vh" cover></v-img>
            <v-card flat width="50vw">
                <v-card-text class="d-none d-sm-block"> 
                    <h3>YOUTHVISION MINISTRY</h3>
                    <h4 class="mb-3">"다음세대들이여, 사명으로 다시 일어나라!"</h4>
                    <v-divider class="mb-3"></v-divider>
                    <h5 class="mb-3">
                        <strong>유스비전 미니스트리(대표 장용성선교사)</strong>는 다음세대 회복과 부흥을 위하여 시작된 선교단체입니다. <br> 
                        2006년 2월 첫 유스비전캠프를 개최하여 현재까지 국내와 해외에서 <strong>선교캠프</strong>가 진행되고 있으며,
                        작은교회와 미자립(개척)교회를 섬기며 민족과 열방에 <strong>그리스도</strong>의 교회를 세우는 사역을 섬기고 있습니다.<br>
                        본 선교회는 오직 말씀과 기도만이 영혼을 구원할 수 있다는 진리를 붙들고, 말씀사역, 찬양사역, 예배사역, 선교사역을 감당하고 있으며,
                        유스비전선교캠프에 참여한 많은 교회(개인)들의 변화를 보고 있습니다. <br>
                        언론대중매체에서도 유스비전사역을 집중하고 있고, 이미 기독교TV방송에 많이 소개 되었습니다. <br>
                        유스비전 미니스트리는 다음세대 지도자를 통해서 한국교회를 깨우고, 열방에 주님의 교회를 세우는 것이 최종 목적입니다. <br>
                        하나님을 예배하지 못하는 곳에서 신령과 진정으로 하나님을 예배하게 하는 것이 본 선교회의 존재가치입니다. <br>
                        예배가 필요한 곳이면 어디든지 달려갑니다. <br>
                    </h5>
                    <v-card-subtitle class="mx-5">유스비전 미니스트리 대표 장용성목사/선교사</v-card-subtitle>
                    <v-card flat>
                        <v-timeline dense>
                            <v-timeline-item small v-for="item in items" :key="item.idx" v-show="item.show">{{ item.title }}</v-timeline-item>
                        </v-timeline>
                    </v-card>
                </v-card-text>
            </v-card>
            <v-card flat class="d-sm-none d-flex">
                <v-card-text class="pa-0 "> 
                    <v-img class="pa-5" src="../assets/about_bg_001.png" cover>
                        <h3 class="mt-5 gray--text">YOUTHVISION MINISTRY</h3>
                        <h4 class="mb-3 gray--text">"다음세대들이여, 사명으로 다시 일어나라!"</h4>
                        <v-divider class="mb-3 white--text"></v-divider>
                        <h5 class="mb-3 gray--text">
                            <strong>유스비전 미니스트리(대표 장용성선교사)</strong>는 다음세대 회복과 부흥을 위하여 시작된 선교단체입니다. <br> 
                            2006년 2월 첫 유스비전캠프를 개최하여 현재까지 국내와 해외에서 <strong>선교캠프</strong>가 진행되고 있으며,
                            작은교회와 미자립(개척)교회를 섬기며 민족과 열방에 <strong>그리스도</strong>의 교회를 세우는 사역을 섬기고 있습니다.<br>
                            본 선교회는 오직 말씀과 기도만이 영혼을 구원할 수 있다는 진리를 붙들고, 말씀사역, 찬양사역, 예배사역, 선교사역을 감당하고 있으며,
                            유스비전선교캠프에 참여한 많은 교회(개인)들의 변화를 보고 있습니다. <br>
                            언론대중매체에서도 유스비전사역을 집중하고 있고, 이미 기독교TV방송에 많이 소개 되었습니다. <br>
                            유스비전 미니스트리는 다음세대 지도자를 통해서 한국교회를 깨우고, 열방에 주님의 교회를 세우는 것이 최종 목적입니다. <br>
                            하나님을 예배하지 못하는 곳에서 신령과 진정으로 하나님을 예배하게 하는 것이 본 선교회의 존재가치입니다. <br>
                            예배가 필요한 곳이면 어디든지 달려갑니다. <br>
                        </h5>
                        <v-card-subtitle class="mx-auto white--text">유스비전 미니스트리 대표 장용성목사/선교사</v-card-subtitle>
                    </v-img>
                    <v-timeline dense>
                        <v-timeline-item color="black"  small v-for="item in items" :key="item.idx" v-show="item.show">{{ item.title }}</v-timeline-item>
                    </v-timeline>
                </v-card-text>
            </v-card>
        </v-card>
         



  
<!--                  

대표소개
장용성 선교사/목사
Rev.Pastor.Missionary Jang Yong Sung -->

    </v-card>  
  </template>
  <script>

  export default {
    name: 'About',
    components: { },
    computed: { },
    data(){return { 
        items:[
            {idx:1, title:"-대전침례신학대학교 신학대학원 M.Div 졸",show:false},
            {idx:2, title:"-주님이꿈꾸신교회 담임",show:false},
            {idx:3, title:"-(대안학교)크리스찬 리더사관학교 교장",show:false},
            {idx:4, title:"+다음세대집회 전문강사",show:false},
            {idx:5, title:"+유럽연합 청소년캠프 강사",show:false},
            {idx:6, title:"+호주멜번 교회연합집회 강사",show:false},
            {idx:7, title:"+이스라엘선교캠프 및 성지순례 강사",show:false},
            {idx:8, title:"+CGNTV '이홍렬의 톡쏘는 남자들' 출연",show:false},
            {idx:9, title:"+CBS 새롭게 하소서 출연",show:false},
            {idx:10, title:"+CBS 미션2013 주여나를보내소서 출연",show:false},
            {idx:11, title:"+GoodTV 방송 멘토특강 출연",show:false},
            {idx:12, title:"+기독교TV방송 다수 출연 및 소개",show:false},
            {idx:13, title:"+해외 목회자성장대회 강사(필리핀,일본 등)",show:false},
            {idx:14, title:"+목회자자녀 영성캠프 강사",show:false},
            {idx:15, title:"+[저서] 사명자여 일어나라(2016)",show:false}
        ]

    }},
    created() { 
        var _this = this;
        this.$eventBus.$on('scrollValue', function(p){
            console.log('about',p);
            _this.scrollCross(p);
        })
    },
    methods : { 
        scrollCross:function(p){
            var _this = this;
            if(p > 0.01){
                for(var i = 0 ; i < this.items.length; i++){
                    (function(x){
                        setTimeout(() => _this.items[x].show = true, 500*x);
                    })(i);
                }
            }
        },
    }
  }
  </script>
<style>
</style>