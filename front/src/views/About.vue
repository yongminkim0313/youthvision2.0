<template>
    <v-card color="white" flat width="800">
        <v-container class="pa-0">
            <v-row>
                <v-col cols="12" sm="12" md="12" lg="12">
                    <v-card>
                        <v-parallax src="../assets/camps/menubar_img.jpeg" height="700">
                            <div style="position:absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);">
                                <v-card-title><h3 class="mx-auto">다음세대 부흥을 일으키는</h3></v-card-title>
                                <div class="transition-swing  text-body-2 mx-auto mb-5" style="max-height: 115px; max-width: 400px; overflow-y: hidden;" >
                                    하나님이 나사렛 예수에게 성령과 능력을 기름 붓듯 하셨으매 그가 두루 다니시며 선한 일을 행하시고 
                                    마귀에게 눌린 모든 사람을 고치셨으니 이는 하나님이 함께 하셨음이라 <br />
                                    -사도행전 10:38-
                                </div>
                                <div class="transition-swing  text-caption mx-auto" style="max-height: 520px; max-width: 500px; overflow-y: hidden; font-size: 0.81rem !important;">
                                    지난 2월 켄터키주 애즈베리대학에서 일어난 부흥을 보며 많은 교회가 다시 부흥을 꿈꾸기 시작했습니다.<br />
                                    그러나 부흥은 꿈으로만 되는 것이 아닙니다.<br />
                                    부흥은 오직 성령님이 일으키십니다.<br />
                                    <br />
                                    인본주의를 버리고 성령의 능력을 사모할 때 성령님이 일하십니다.<br />
                                    유스비전선교회는 지난 18년 동안 노는 캠프가 아닌 오직 말씀, 찬양, 기도가 있는 예배캠프를 진행했습니다.<br />
                                    <br />
                                    다음세대와 한국교회를 사랑하신다면 노는 캠프가 아닌 예배캠프, 성령이 역사하는 캠프로 보내십시오.<br />
                                    믿음의 본질로 돌아갈 때, 치유와 회복과 부흥이 일어납니다.<br />
                                    변질된 복음이 아닌, 어제나 오늘이나 영원토록 동일하신 예수 그리스도의 복음, 예수가 답입니다!<br />
                                    성령의 능력으로 다시 비상할 수 있습니다.<br />
                                    <br />
                                    성령과 함께 비상할 수 있습니다.<br />
                                    주님 오실 길을 예비할 다음 세대들이여, <br />
                                    강력한 성령의 기름 부으심이 있는 2023여름 유스비전캠프로 초대합니다.<br />
                                    <v-img src="../assets/camps/sign-youthvision.png" contain width="300px" class="ml-auto"></v-img>
                                </div>
                            </div>
                        </v-parallax>
                    </v-card>
                </v-col>
                <v-col cols="12" sm="12" md="6" lg="6">
                    <v-card height="902">
                        <v-carousel continuous cycle show-arrows hide-delimiter-background reverse-transition="fade-transition"
                            transition="fade-transition" style="width:100%;" height="902" >
                            <v-carousel-item eager>
                                <v-img eager style="height:100%" src="../assets/camps/card001.jpeg"> </v-img>
                            </v-carousel-item>
                            <v-carousel-item eager>
                                <v-img eager style="height:100%" src="../assets/camps/card002.jpeg"> </v-img>
                            </v-carousel-item>
                            <v-carousel-item eager>
                                <v-img eager style="height:100%" src="../assets/camps/card003.jpeg"> </v-img>
                            </v-carousel-item>
                        </v-carousel>
                    </v-card>
                </v-col>
                <v-col cols="12" sm="12" md="6" lg="6">
                    <v-card height="902">
                        <v-card-title>
                            <h3 class="mx-auto my-10 gray--text">YOUTHVISION MINISTRY</h3>
                        </v-card-title>
                        <v-card-subtitle>
                            <h4 class="ml-3 gray--text">"다음세대들이여, 사명으로 다시 일어나라!"</h4>
                        </v-card-subtitle>
                        <v-list>
                            <v-list-item-group v-model="model">
                                <v-list-item v-for="(item, i) in items" :key="i">
                                    <v-list-item-icon class="ma-1">
                                        <v-icon> mdi-cross </v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-content  class="pa-2">
                                        {{ item.title }}
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list-item-group>
                        </v-list>
                    </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <v-card>
                        <v-card-title>
                            <h3 class="mx-auto">장용성 선교사/목사</h3>
                        </v-card-title>
                        <v-card-title>
                            <h5 class="mx-auto">Rev.Pastor.Missionary Jang Yong Sung</h5>
                        </v-card-title>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
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
        ],
        model:1,
    }},
    created() { 
    },
    methods : { 
    }
  }
  </script>
<style>
</style>