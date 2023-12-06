<template>
    <v-card>
        <v-card-title>공지사항</v-card-title>
        <v-container>
            <v-row>
                <v-col cols="12" lg="3" md="6" sm="12" v-for="board in boardList">
                    <v-card  class="pa-2" style="height:220px; white-space: nowrap; overflow:hidden; ">
                        <div style="overflow: hidden; display: inline-block; ">
                            <div style="display: inline-block;"> <p style="text-overflow: ellipsis; white-space: nowrap;">{{ board.title }}</p> </div>
                            <v-card-actions><v-btn @click="goBbs(board.idx)">더보기</v-btn></v-card-actions>
                            <v-card-text v-html="board.contents" style="text-overflow: ellipsis;  direction: ltr;"> </v-card-text>
                        </div>
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
        goBbs: function(idx){
            this.$router.push({
                name: "게시판상세",
                query: { idx:idx },
            });
        }
    }
}
</script>