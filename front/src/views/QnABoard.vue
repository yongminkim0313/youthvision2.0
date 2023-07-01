<template>
    <v-card color="white">
      <v-img src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" height="64" cover ></v-img>
      <v-container fluid>
        <v-row>
          <v-col cols="12" sm="6" md="4" lg="3" v-for="(item, index) in qnaList" :key="index">
            <v-card>
              <v-card-title>{{ item.title }}</v-card-title>
              <v-card-text>{{ item.contents }}</v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <v-container>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field v-model="title" label="제목"></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-textarea label="내용" no-resize rows="3" v-model="contents" ></v-textarea>
          </v-col>
          <v-col cols="12" md="4">
            <v-btn @click="insertQnA();">글작성</v-btn>
            <v-btn @click="webPush();">webPush</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
</template>

<script>
export default {
  components: {},
  name:'QnABoard',
  props:{userInfo:Object},
  data(){
    return {
      qnaList:{},
      title:'',
      contents:''
    };
  },
  computed: {},
  created: function(){
    var _this = this;
    this.$fireDB.onValue('/qna/',function(snapshot){
        const data = snapshot.val();
        _this.qnaList = data;
      });
  },
  methods:{
    nextSeq: async function(){
      var seqQnA = await this.$fireDB.get('/seq/qna');
      this.$fireDB.set('/seq/qna',seqQnA+1);
      return seqQnA;
    },
    insertQnA: async function(){
      var seq = await this.nextSeq();
      this.$fireDB.set('/qna/' + seq ,{title: this.title, contents: this.contents});
      this.webPush(this.title, this.contents);
    },
    selectQnA: async function(){

    },
    updateQnA: async function(){

    },
    deleteQnA: async function(){

    },
    webPush: function(title, contents){
      this.$webPush.send({title:title,message:contents});
    }
  }
}
</script>