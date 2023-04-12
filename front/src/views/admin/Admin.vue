<template>
    <v-card :loading="loading">
        <v-card>
            <v-img src="../../assets/about_top_bg.png" height="64" cover class="d-print-none"></v-img>
            <v-card-title>관리자페이지 입니다.</v-card-title>
            <AplyList></AplyList>
        </v-card>
    </v-card>
</template>
<script>
import AplyList from '../../components/AplyList.vue';
export default {
    components:{AplyList},
    data: () => ({
        loading: false,
    })
}
</script>