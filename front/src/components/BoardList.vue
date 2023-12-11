<template>
    <v-card>
        <v-container>
            <v-row>
                <v-card-title class="py-1">
                    <v-icon class="mr-2">mdi-clipboard-text-outline</v-icon> 공지사항
                </v-card-title>
            </v-row>
            <v-row>
                <v-col cols="12" lg="3" md="6" sm="12" v-for="board in boardList" :key="board.idx">
                    <v-card class="pa-2 my-2" style="height:220px; white-space: nowrap; overflow:hidden;" elevation="10">
                        <div class="px-2 " style="display: inline-block; width:100%;"> 
                            <h3 style="text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">{{ board.title }}</h3> 
                        </div>
                        <v-divider></v-divider>
                            <v-card-text class="board-contents" v-html="board.contents"> </v-card-text>
                            <v-img v-if="board.atchmnflId" :src="'/api/common/image/'+board.atchmnflId" height="50%" contain></v-img>
                        <v-card-actions style="position:absolute; top:180px; right:0px;">
                            <v-icon @click="goBbs(board)" >mdi-open-in-new</v-icon>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>
<script>
export default {
    data () {
        return {
            boardList:[]
        }
    },
    created: function(){
        var _this = this;
        this.$axios.get('/api/public/board')
        .then((result)=>{
            console.log(result.data);
            _this.boardList = result.data;
        });
    },
    methods:{
        goBbs: function(item){
            this.$axios.put('/api/public/bbs/cnt',item);
            this.$router.push({
                name: "게시판상세",
                query: { idx:item.idx },
            });
        }
    }
}
</script>
<style>
.board-contents > * {
    text-overflow: ellipsis; 
    white-space: nowrap; 
    overflow: hidden;
}
</style>