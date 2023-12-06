<template>
    <v-card>
        <v-card-title>공지사항</v-card-title>
        <v-container>
            <v-row>
                <div v-for="board in boardList" class="pa-2" style="width:25%; height:220px; white-space: nowrap; overflow:hidden; ">
                    <v-card max-height="200px" style="overflow: hidden;;">
                        <v-card-subtitle style="display:inline"> {{ board.title }} </v-card-subtitle>
                        <v-card-actions><v-btn @click="goBbs()">더보기</v-btn></v-card-actions>
                        <v-card-text v-html="board.contents" style="text-overflow: ellipsis;  direction: ltr;"> </v-card-text>
                    </v-card>
                </div>
                
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
        goBbs: function(){
            this.$router.push('/board');
        }
    }
}
</script>