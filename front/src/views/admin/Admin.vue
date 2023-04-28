<template>
    <v-card :loading="loading">
        <v-card>
            <v-img src="../../assets/about_top_bg.png" height="64" cover class="d-print-none"></v-img>
            <v-card-title>관리자페이지 입니다</v-card-title>
            <v-expansion-panels accordion v-model="panel" multiple>

                <v-expansion-panel>
                    <v-expansion-panel-header>
                        <v-card-title> <v-icon large color="green darken-2" > mdi-list-box </v-icon> 캠프신청 정보</v-card-title>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <AplyList></AplyList>
                    </v-expansion-panel-content>
                </v-expansion-panel>
                
                <v-expansion-panel>
                    <v-expansion-panel-header>
                        <v-card-title> <v-icon large color="green darken-2" > mdi-human </v-icon> 사용자 정보</v-card-title>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <UserList></UserList>
                    </v-expansion-panel-content>
                </v-expansion-panel>

                <v-expansion-panel>
                    <v-expansion-panel-header>
                        <v-card-title> <v-icon large color="green darken-2" > mdi-note-multiple </v-icon> 포스터신청 정보</v-card-title>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                    </v-expansion-panel-content>
                </v-expansion-panel>
                
                <v-expansion-panel>
                    <v-expansion-panel-header>
                        <v-card-title> <v-icon large color="green darken-2" > mdi-arrange-send-backward </v-icon> 배너 관리</v-card-title>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <BannerList></BannerList>
                    </v-expansion-panel-content>
                </v-expansion-panel>

            </v-expansion-panels>
        </v-card>
    </v-card>
</template>
<script>
import AplyList from '../../components/AplyList.vue';
import UserList from '../../components/UserList.vue';
import BannerList from '../../components/BannerList.vue';
export default {
    components:{AplyList,UserList,BannerList},
    data: () => ({
        panel: [],
        loading: false,
    })
}
</script>