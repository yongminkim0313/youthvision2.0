<template>
    <v-card :loading="loading">
        <Messenger></Messenger>
        <v-card>
            
            <v-card-title>관리자페이지 입니다</v-card-title>
            <v-expansion-panels accordion v-model="panel" multiple>
                
                <v-expansion-panel>
                    <v-expansion-panel-header>
                        <v-card-title> <v-icon large color="green darken-2" > mdi-arrange-send-backward </v-icon> 설정</v-card-title>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <MainSetting></MainSetting>
                    </v-expansion-panel-content>
                </v-expansion-panel>

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
                        <AplyPosterList></AplyPosterList>
                    </v-expansion-panel-content>
                </v-expansion-panel>

                <v-expansion-panel>
                    <v-expansion-panel-header>
                        <v-card-title> <v-icon large color="green darken-2" > mdi-format-list-bulleted </v-icon> 접속로그 </v-card-title>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <ConnectLog></ConnectLog>
                    </v-expansion-panel-content>
                </v-expansion-panel>


            </v-expansion-panels>
        </v-card>
    </v-card>
</template>
<script>
import Messenger from '../../components/Messenger.vue';
import AplyList from '../../components/AplyList.vue';
import AplyPosterList from '../../components/AplyPosterList.vue';
import UserList from '../../components/UserList.vue';
import ConnectLog from '@/components/ConnectLog.vue';
import MainSetting from './MainSetting.vue';
export default {
    components:{AplyList,AplyPosterList,UserList,ConnectLog, MainSetting, Messenger},
    data: () => ({
        panel: [],
        loading: false,
    })
}
</script>