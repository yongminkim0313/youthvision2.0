<template>
    <v-card>
        <v-container>
            <v-row>
                <div v-for="board in boardList" class="pa-2" style="width:25%; height:220px; white-space: nowrap; overflow:hidden; ">
                    <v-card max-height="200px" style="overflow: hidden;;">
                        <v-card-title> {{ board.title }} </v-card-title>
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
}
</script>