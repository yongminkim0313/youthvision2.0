<template>
    <v-card color="white" flat>
        <v-img src="../assets/about_top_bg.png" height="64" cover ></v-img>
        <v-container fluid>
            <v-row>
                <v-col cols="12" sm="12" md="6" lg="6">
                    <v-card>
                        <v-card-title><h2 class="mx-auto my-10">다음세대 부흥을 일으키는</h2></v-card-title>
                        <v-img src="../assets/camps/2023_summer/2023_summer_intro.png" contain></v-img>
                    </v-card>
                </v-col>
                <v-col cols="12" sm="12" md="6" lg="6">
                    <v-card>
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
                            <h4 class="mx-auto">Rev.Pastor.Missionary Jang Yong Sung</h4>
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