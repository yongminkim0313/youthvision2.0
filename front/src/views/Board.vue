<template>
  <v-card color="white">
    <v-img src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" height="64" cover ></v-img>
    <v-card-title></v-card-title>
    <v-card-text>
      <v-btn color="orange" elevation="5" @click="openNewBbs();" class="mb-5" v-if="isAdmin">관리자 작성</v-btn>
      <v-card elevation="16" max-width="100vw" class="mx-auto">
        <v-virtual-scroll :bench="benched" :items="bbs" height="60vh" item-height="64" >
          <template v-slot:default="{ item }">
            <v-scroll-y-transition>
              <v-list-item :key="item.idx" link>
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
                  <v-card-text v-if="!editMode" v-html="showItem.contents">  </v-card-text>
                  <editor-tiptap-vue v-if="editMode" menubar @editorContent="setBbsContents"></editor-tiptap-vue>
                  <v-img v-if="showItem.atchmnflId && !editMode" :src="'/api/image/'+showItem.atchmnflId" max-width="90vw" max-height="90vh">
                    <template v-slot:placeholder>
                      <v-row class="fill-height ma-0" align="center" justify="center" >
                        <v-progress-circular indeterminate color="grey lighten-5" ></v-progress-circular>
                      </v-row>
                    </template>
                  </v-img>
                </v-list-item-content>
              </v-list-item>
              <v-list-item v-if="!editMode">
                <v-list-item-content>
                  <div>
                    <v-btn plain max-width="300" class="mr-auto" @click="openReply = !openReply"> <v-icon left dark>mdi-message</v-icon> 댓글쓰기 </v-btn>
                  </div>
                  <v-card v-if="openReply" flat class="d-flex">
                    <v-avatar class="ma-2"> <v-img :src="thumbnailImageUrl" /> </v-avatar> 
                    <v-textarea autofocus solo id="textarea" name="input-7-4" :label="replyLabel" :disabled="!availableReply" v-model="replyItem.contents"></v-textarea>
                  </v-card>
                  <v-btn outlined v-if="availableReply" @click="saveReply"> 등록</v-btn>
                </v-list-item-content>
              </v-list-item>
              <v-list-item v-if="!editMode">
                <v-list-item-content>
                  <v-timeline dense align-top v-for="item in reply" :key="item.idx"> 
                    <v-timeline-item large >
                      <template v-slot:icon>
                        <v-avatar> <v-img :src="item.thumbnailImageUrl"/> </v-avatar>
                      </template>
                      <v-card class="elevation-2 align-end">
                        <v-card-subtitle class="pa-1"> {{ item.rgstDt | formatDate}} </v-card-subtitle>
                        <v-card-text class="pb-0">{{ item.contents }}</v-card-text>
                        <v-card-actions class="pa-0">
                          <v-spacer></v-spacer>
                          <v-btn v-if="isAdmin" icon @click="deleteBbsReply(item)"><v-icon color="grey lighten-1">mdi-delete</v-icon></v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-timeline-item>
                  </v-timeline>
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
import EditorTiptapVue from '../components/EditorTiptap.vue'
import FileUpload from '../components/Upload.vue'
export default {
  components: {FileUpload,EditorTiptapVue },
  data(){
      return {
        bbs:[ ],
        reply:[],
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
        ,replyItem:{uppIdx:0, contents:'', atchmnflId:0}
        ,openReply: false
        ,newContents:''
      }
  },
  computed: {
      isAdmin(){
        if(localStorage.getItem('auth')==="admin"){ return true; }
        else{ return false; }
      },
      availableReply(){
        if(localStorage.getItem('kakaoId')!='null' && this.openReply){
          return true;
        }else{
          return false;
        }
      },
      replyLabel(){
        if(localStorage.getItem('kakaoId')=='null'){
          return '댓글을 작성하려면 로그인 해주세요';
        }else{
          return '';
        }
      },
      thumbnailImageUrl(){
        return localStorage.getItem('thumbnailImageUrl');
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
      selectBbsReply: function(){
        var _this = this;
        this.$axios.get('/api/bbs/reply',{params:{idx:_this.showItem.idx}})
        .then((result)=>{
          _this.reply = result.data;
        });
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
      setBbsContents: function(contents){
        this.editItem.contents = contents;
      },
      detailContents: function(item){
        this.editMode = false;
        this.dialog = true;
        this.showItem = Object.assign({},item);
        this.contentsCntUp(item);
        this.selectBbsReply();
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
      },
      saveReply: function(){
        var _this = this;
        console.log(this.replyItem);
        if(this.replyItem['contents'].length < 10){
          alert('10자 이상 작성바랍니다.');
          return;
        }
        this.replyItem['title'] = '댓글';
        this.replyItem['uppIdx'] = _this.showItem.idx;
        this.replyItem['atchmnflId'] = 0;
        this.$axios.post('/api/bbs/reply',this.replyItem)
        .then((result)=>{
          _this.openReply = false;
          _this.replyItem = {};
          _this.selectBbsReply();
        })
      },
      deleteBbsReply: function(item){
        var _this = this;
        this.$axios.delete('/api/bbs/'+item.idx);
        const idx = this.reply.findIndex(function(b) {return b.idx === item.idx;});
        if (idx > -1) this.reply.splice(idx, 1);
        _this.deleteItem={};
      },
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