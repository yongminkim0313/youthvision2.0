<template>
    <v-card color="white">
        <v-img src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" height="20vh" cover ></v-img>
        <v-card-title>테스트 게시판</v-card-title>
        <v-card-text>
  <div>
    <v-card-actions max-width="90vw" class="mx-auto mb-2 d-flex " >
      <v-btn color="blue" elevation="5" @click="openNewBbs();" class="ml-auto" width="10vw" v-if="!bbsDiv && isAdmin">신규작성</v-btn>
      <v-card v-if="bbsDiv">
        <v-card-title>
          <v-text-field label="제목" hide-details="auto" v-model="title"></v-text-field>
        </v-card-title>
        <v-card-text>
          <v-text-field label="내용" hide-details="auto" v-model="contents"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn color="blue" elevation="5" @click="submitNewBbs()">작성완료</v-btn>
          <v-btn color="red" elevation="5" @click="bbsDiv = false;">작성취소</v-btn>
        </v-card-actions>
      </v-card>
    </v-card-actions>

    <v-card elevation="16" max-width="95vw" class="mx-auto" v-show="!bbsDiv">
      <v-virtual-scroll :bench="benched" :items="bbs" height="60vh" item-height="64" >
        <template v-slot:default="{ item }">
          <v-list-item :key="item.idx">
            <v-list-item-action>
              <v-btn fab small depressed color="primary" >
                {{ item.idx }}
              </v-btn>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>
                <strong>{{ item.title }}</strong>
              </v-list-item-title>
                {{ item.contents }}
              </v-list-item-content>
              
              <v-list-item-action>
                <v-rating background-color="purple lighten-3" color="purple" small ></v-rating>
              </v-list-item-action>
          </v-list-item>

          <v-divider></v-divider>
        </template>
      </v-virtual-scroll>
    </v-card>
  </div>
        </v-card-text>
    </v-card>
</template>
<script>
export default {
  components: { },
  data(){
      return {
        bbs:[ ],
        benched: 10,
        bbsDiv: false,
        title: '',
        contents: ''
      }
  },
  computed: {
      isAdmin(){
        if(localStorage.getItem('auth')==="admin"){ return true; }
        else{ return false; }
      }
    },
    created: function(){
      this.selectBbs();
    },
    methods:{
      openNewBbs: function(){
        this.bbsDiv = true;
      },
      selectBbs:function(){
        var _this = this;
        this.$axios.get('/api/bbs')
        .then((result)=>{
          _this.bbs = result.data;
        });
      },
      submitNewBbs: function(){
        var _this = this;
        this.$axios.post('/api/bbs',{title:_this.title, contents:_this.contents})
        .then((result)=>{
          console.log(result);
          _this.bbsDiv = false;
        })
      }
    }
  }
</script>