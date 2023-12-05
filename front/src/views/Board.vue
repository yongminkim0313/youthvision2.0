<template>
  <v-card color="white" width="800">
    <v-card-text>
      <v-btn color="orange" elevation="5" @click="openNewBbs();" class="mb-5" v-if="isAdmin">관리자 작성</v-btn>
      <v-card elevation="16" class="mx-auto">
        <v-virtual-scroll :bench="benched" :items="bbs" height="60vh" item-height="64" >
          <template v-slot:default="{ item }">
            <v-scroll-y-transition>
              <v-list-item :key="item.idx" link @click="detailContents(item);">
                <v-list-item-avatar> - 공지 - </v-list-item-avatar>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
                <v-list-item-subtitle class="text-right"> {{ item.rgstDt | formatDate}} </v-list-item-subtitle>
                <v-list-item-action v-if="isAdmin">
                  <v-btn icon>
                    <v-icon color="grey lighten-1"  @click="setDeleteItem(item);">mdi-delete</v-icon>
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
                <v-btn v-if="isAdmin" icon @click="editBbs(showItem)"><v-icon color="grey lighten-1">mdi-note-edit</v-icon></v-btn>
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
                  <editor-tiptap-vue v-if="editMode" menubar @editorContent="setBbsContents" :description="newContents" ></editor-tiptap-vue>
                  <v-img v-if="showItem.atchmnflId" :src="'/api/common/image/'+showItem.atchmnflId" max-width="90vw" max-height="90vh" contain> 
                    <template v-slot:placeholder>
                        <v-row class="fill-height ma-0" align="center" justify="center" >
                          <v-progress-circular indeterminate color="grey lighten-5" ></v-progress-circular>
                        </v-row>
                      </template>
                  </v-img>
                </v-list-item-content>
              </v-list-item>
              
              <v-list-item v-if="!editMode">
                <v-list-item-action>
                  <v-btn v-if="showItem.atchmnflId" @click="downloadFile(showItem.atchmnflNm)">파일다운로드</v-btn>
                  <v-btn plain max-width="300" class="mr-auto" @click="openReply = !openReply"> <v-icon left dark>mdi-message</v-icon> 댓글쓰기 </v-btn>
                </v-list-item-action>
              </v-list-item>
              
              <v-list-item>
                <v-list-item-content>
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
                          <v-btn v-if="isAdmin" icon @click="editBbsReply(item)"><v-icon color="grey lighten-1">mdi-file-edit</v-icon></v-btn>
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
                  <file-upload @after-upload="setAtchmnflId"></file-upload>
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
  props:{userInfo:Object},
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
        editItem:{ title: '', contents: '', atchmnflId: 0, }
        ,showItem:{}
        ,deleteItem:{}
        ,replyItem:{uppIdx:0, contents:'', atchmnflId:0}
        ,openReply: false
        ,newContents:''
      }
  },
  computed: {
      isAdmin(){
        return this.userInfo.auth=='admin';
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
        this.editMode = false;
        this.dialog = true;
        this.$nextTick(() => {
          this.editItem = {idx: 0, title:'', contents:'', atchmnflId:0};
          this.showItem = {idx: 0, title:'', contents:'', atchmnflId:0};
          this.newContents = '';
          this.editMode = true;
        });
      },
      selectBbsReply: function(){
        var _this = this;
        this.$axios.get('/api/public/bbs/reply',{params:{idx:_this.showItem.idx}})
        .then((result)=>{
          _this.reply = result.data;
        });
      },
      selectBbs:function(){
        var _this = this;
        this.$axios.get('/api/public/bbs')
        .then((result)=>{
          _this.bbs = result.data;
        });
      },
      saveNewBbs: function(){
        var _this = this;
        this.$axios.post('/api/public/bbs',_this.editItem)
        .then((result)=>{
          console.log(result);
          _this.dialog = false;
          _this.editItem = {};
          _this.selectBbs();
        })
      },
      setAtchmnflId: function(data){
        this.editItem.atchmnflId = data.atchmnflId;
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
        this.$axios.put('/api/public/bbs/cnt',item);
      },
      deleteBbs: function(){
        var _this = this;
        this.$axios.delete('/api/public/bbs/'+_this.deleteItem.idx);
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
        this.$axios.post('/api/public/bbs/reply',this.replyItem)
        .then((result)=>{
          _this.openReply = false;
          _this.replyItem = {};
          _this.selectBbsReply();
        })
      },
      deleteBbsReply: function(item){
        var _this = this;
        this.$axios.delete('/api/public/bbs/'+item.idx);
        const idx = this.reply.findIndex(function(b) {return b.idx === item.idx;});
        if (idx > -1) this.reply.splice(idx, 1);
        _this.deleteItem={};
      },
      downloadFile: async function(fileNm){
        var atchmnflId = this.showItem['atchmnflId'];
        console.log(atchmnflId);
        //const response = await fetch('/api/download/'+atchmnflId);
        this.$axios({
            url: '/api/download/'+atchmnflId, // 파일 다운로드 요청 URL
            method: "GET", // 혹은 'POST'
            responseType: "blob", // 응답 데이터 타입 정의
        }).then((response) => {
          const disposition = response.headers["content-disposition"];
          //const fileName = decodeURI( disposition .match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/)[1] .replace(/['"]/g, "") );
          // 다운로드(서버에서 전달 받은 데이터) 받은 바이너리 데이터를 blob으로 변환합니다.
          const blob = new Blob([response.data]);
          // blob을 사용해 객체 URL을 생성합니다.
          const fileObjectUrl = window.URL.createObjectURL(blob);
          // blob 객체 URL을 설정할 링크를 만듭니다.
          const link = document.createElement("a");
          link.href = fileObjectUrl;
          link.style.display = "none";
          link.download = fileNm;
          // 링크를 body에 추가하고 강제로 click 이벤트를 발생시켜 파일 다운로드를 실행시킵니다.
          document.body.appendChild(link);
          link.click();
          link.remove();
          // 다운로드가 끝난 리소스(객체 URL)를 해제합니다.
          window.URL.revokeObjectURL(fileObjectUrl);
        });     
      },
      editBbs: function(showItem){
        this.editMode = true;
        this.editItem = showItem;
        this.newContents = showItem.contents;
      },
      editBbsReply: function(){

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