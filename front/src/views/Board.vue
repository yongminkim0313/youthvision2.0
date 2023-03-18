<template>
  <v-card color="white">
    <v-img src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" height="10vh" cover ></v-img>
    <v-card-title>테스트 게시판</v-card-title>
    <v-card-text>
      <v-btn color="orange" elevation="5" @click="openNewBbs();" class="ml-10 mb-5" v-if="isAdmin">관리자 작성</v-btn>
      <v-card elevation="16" max-width="85vw" class="mx-auto">
        <v-virtual-scroll :bench="benched" :items="bbs" height="60vh" item-height="64" >
          <template v-slot:default="{ item }">
            <v-scroll-y-transition>
              <v-list-item :key="item.idx">
                <v-list-item-avatar @click="detailContents(item);">
                  <v-icon class="grey lighten-1" dark > mdi-message </v-icon>
                </v-list-item-avatar>
                <v-list-item-content @click="detailContents(item);">
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn icon>
                    <v-icon color="grey lighten-1" v-if="isAdmin" @click="setDeleteItem(item);">mdi-delete</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-scroll-y-transition>
              <!-- <div>
                <details>
                  <summary>{{ item.title }}</summary>
                  <div>{{ item.contents }}</div>
                  <a :href="'/api/download/'+item.atchmnflId" v-if="item.atchmnflId">첨부파일다운로드</a>
                </details>
              </div> -->
          </template>
        </v-virtual-scroll>
        <div class="deleteDialog text-center" v-if="deleteItem.idx">
          <v-sheet class="px-7 pt-7 pb-4 mx-auto text-center d-inline-block" color="blue-grey darken-3" dark >
            <div class="grey--text text--lighten-1 text-body-2 mb-4">
              [{{deleteItem.title}}]삭제하시겠습니까?
            </div>
            <v-btn class="ma-1" color="grey" plain @click="deleteItem = {};"> 취소 </v-btn>
            <v-btn class="ma-1" color="error" plain @click="deleteBbs" > 삭제 </v-btn>
          </v-sheet>
        </div>
        <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition" >
          <v-card>
            <v-toolbar dark color="primary" >
              <v-btn icon dark @click="dialog = false" >
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <v-toolbar-title v-text="editMode?'관리자글작성':showItem.title"></v-toolbar-title>
              <v-spacer></v-spacer>
              <v-toolbar-items>
                <v-btn dark text @click="saveNewBbs();" v-if="editMode"> 저장 </v-btn>
              </v-toolbar-items>
            </v-toolbar>
            <v-list three-line subheader >
              <!-- <v-subheader>게시글</v-subheader> -->
              <v-list-item>
                <v-list-item-content>
                  <v-text-field v-if="editMode" label="제목" hide-details="auto" v-model="editItem.title"></v-text-field>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-subtitle v-if="!editMode">{{ showItem.contents }}</v-list-item-subtitle>
                  <v-text-field v-if="editMode" label="내용" hide-details="auto" v-model="editItem.contents"></v-text-field>
                  <v-img v-if="showItem.atchmnflId && !editMode" :src="'/api/image/'+showItem.atchmnflId" max-width="80vw"/>
                </v-list-item-content>
              </v-list-item>
              <v-list-item v-if="editMode">
                <v-list-item-content>
                  <v-list-item-title>파일추가</v-list-item-title>
                  <v-list-item-subtitle>파일을 첨부합니다. --파일첨부 후에 꼭 저장버튼 눌러주세요!--</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <file-upload @setAtchmnflId-child="setAtchmnflId"></file-upload>
                </v-list-item-action>
              </v-list-item>
            </v-list>
            <v-divider></v-divider>
            <v-list three-line subheader v-if="editMode">
              <v-subheader>옵션</v-subheader>
              <v-list-item>
                <v-list-item-action>
                  <v-checkbox v-model="notifications"></v-checkbox>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>상단표시</v-list-item-title>
                  <v-list-item-subtitle>게시판 상단에 노출됩니다.</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-action>
                  <v-checkbox v-model="sound"></v-checkbox>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>중요 메세지</v-list-item-title>
                  <v-list-item-subtitle>중요 메시지 "!" 가 표시됩니다.</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-action>
                  <v-checkbox v-model="widgets"></v-checkbox>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>답글기능</v-list-item-title>
                  <v-list-item-subtitle>답글을 표시합니다.</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </v-dialog>
      </v-card>
    </v-card-text>
  </v-card>
</template>
<script>
import FileUpload from '../components/Upload.vue'
export default {
  components: {FileUpload },
  data(){
      return {
        bbs:[ ],
        benched: 10,
        dialog: false,
        notifications: false,
        sound: false,
        widgets: false,
        editMode:false,
        editItem:{
          title: '',
          contents: '',
          atchmnflId: 0,
        }
        ,showItem:{}
        ,deleteItem:{}
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
        this.editMode = true;
        this.dialog = true;
      },
      selectBbs:function(){
        var _this = this;
        this.$axios.get('/api/bbs')
        .then((result)=>{
          _this.bbs = result.data;
        });
      },
      saveNewBbs: function(){
        var _this = this;
        this.$axios.post('/api/bbs',_this.editItem)
        .then((result)=>{
          console.log(result);
          _this.dialog = false;
          _this.editItem = {};
          _this.selectBbs();
        })
      },
      setAtchmnflId: function(id){
        this.editItem.atchmnflId = id;
      },
      detailContents: function(item){
        this.editMode = false;
        this.dialog = true;
        this.showItem = Object.assign({},item);
        this.contentsCntUp(item);
      },
      contentsCntUp: function(item){
        this.$axios.put('/api/bbs/cnt',item);
      },
      deleteBbs: function(){
        var _this = this;
        this.$axios.delete('/api/bbs/'+_this.deleteItem.idx);
        const idx = this.bbs.findIndex(function(b) {return b.idx === _this.deleteItem.idx;});
        if (idx > -1) this.bbs.splice(idx, 1);
        _this.deleteItem={};
      },
      setDeleteItem: function(item){
        this.deleteItem = item;
      }
    }
  }
</script>
<style scoped>
.deleteDialog{
  position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>