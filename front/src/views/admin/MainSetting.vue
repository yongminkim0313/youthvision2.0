<template>
            <!-- <v-card-title></v-card-title> -->
    <v-expansion-panels accordion v-model="panel" multiple>

        <v-expansion-panel>
            <v-expansion-panel-header>
                <v-card-title> <v-icon large color="green darken-2" > mdi-list-box </v-icon> 메뉴 관리</v-card-title>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
                <MenuList></MenuList>
            </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
            <v-expansion-panel-header>
                <v-card-title> <v-icon large color="green darken-2" > mdi-list-box </v-icon> 배너 관리</v-card-title>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
                <BannerList></BannerList>
            </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
            <v-expansion-panel-header>
                <v-card-title> <v-icon large color="green darken-2" > mdi-list-box </v-icon> Slide 관리</v-card-title>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
                <CarouselList></CarouselList>
            </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
            <v-expansion-panel-header>
                <v-card-title> <v-icon large color="green darken-2" > mdi-list-box </v-icon> 유튜브 관리</v-card-title>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
                <YoutubeList></YoutubeList>
            </v-expansion-panel-content>
        </v-expansion-panel>

    </v-expansion-panels>
</template>
<script>
import MenuList from './manageComponents/MenuList.vue';
import BannerList from './manageComponents/BannerList.vue';
import CarouselList from './manageComponents/CarouselList.vue';
import YoutubeList from './manageComponents/YoutubeList.vue';
export default {
    components:{MenuList,BannerList, CarouselList, YoutubeList},
    data: () => ({
        panel: [],
    })
}
</script>