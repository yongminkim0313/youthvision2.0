<template>
    <v-card elevation="0" class="mx-auto" >
        <v-card-actions>
            <v-btn @click="addBanner">추가</v-btn>
        </v-card-actions>
        <v-data-table fixed-header dense :headers="headers" :items="items" item-key="seq" :search="search" hide-default-footer
            :disable-items-per-page="true" :footer-props="{ 'items-per-page-options': [50, -1] }" :loading = "loading" loading-text="로딩중 기다려주세요~" disable-sort >
            <template v-slot:[`item.bannerContents`]="{ item }">
              <span v-html="item.bannerContents"></span>
            </template>
            <template v-slot:[`item.atchmnflId`]="{ item }">
              <v-img v-if="item.atchmnflId" :src="'/api/image/'+item.atchmnflId" max-width="10vw" max-height="10vh"> 
                <template v-slot:placeholder>
                    <v-row class="fill-height ma-0" align="center" justify="center" >
                      <v-progress-circular indeterminate color="grey lighten-5" ></v-progress-circular>
                    </v-row>
                  </template>
              </v-img>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
              <v-icon small class="mr-2" @click="editItem(item)">
                mdi-pencil
              </v-icon>
              <v-icon small class="mr-2" @click="deleteBanner(item)">
                mdi-delete
              </v-icon>
            </template>
          </v-data-table>
        <v-dialog v-model="bannerEditDialog" max-width="700" class="d-print-none">
            <v-card>
                <v-card-title>배너 등록 {{ mode }}</v-card-title>
                
                <v-card-text>
                    <v-row>
                        <v-text-field v-model="editBanner.bannerTitle" label="제목입력" clearable ></v-text-field>
                    </v-row>
                    <v-row>
                        <v-date-picker range v-model="dates"></v-date-picker>
                        <v-text-field v-model="dateRangeText" label="배너팝업기간" prepend-icon="mdi-calendar" readonly ></v-text-field>
                    </v-row>
                    <v-row>
                      <v-btn @click="htmlSourceMode = !htmlSourceMode">모드변경</v-btn>
                    </v-row>
                    <v-row>
                      <v-textarea v-show="htmlSourceMode" name="input-7-1" label="Default style" v-model="editBanner.bannerContents" hint="html소스" ></v-textarea>
                      <editor-tiptap-vue v-show="!htmlSourceMode" menubar @editorContent="setBannerContents" :description="newContents" ></editor-tiptap-vue>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                  <v-btn @click="saveBanner()">저장</v-btn>
                  <file-upload @setAtchmnflId-child="setAtchmnflId"></file-upload>
                </v-card-actions>
            </v-card>
        </v-dialog>
        </v-card>
    </template>
<script>

import FileUpload from '../components/Upload.vue'
import EditorTiptapVue from '../components/EditorTiptap.vue'
export default {
    components: {FileUpload, EditorTiptapVue },
  data () {
    return {
        htmlSourceMode:false,
        headers: [
          {text: '번호', value: 'bannerId', align: 'center',sortable: false },
          {text: '배너제목', value: 'bannerTitle'},
          {text: '배너내용', value: 'bannerContents'},
          {text: '배너시작일', value: 'bannerBeginDe'},
          {text: '배너종료일', value: 'bannerEndDe'},
          {text: '첨부파일', value: 'atchmnflId'},
          {text: '수정,삭제', value: 'actions', soçrtable: false },
        ],
        bannerEditDialog: false,
        items:[],
        model:1,
        mode:'',
        dates:[],
        editBanner:{
            bannerId:0,
            bannerTitle:'',
            bannerContents:'',
            bannerBeginDe:'',
            bannerEndDe:'',
            atchmnflId:0
        },
        newContents:'',
        loading:false,
        search:''
    }
  },
  created: function(){
    this.getBannerList();
  },
  computed: {
    dateRangeText () {
      return this.dates.join(' ~ ')
    },
  },
  watch:{
    dates (val) {
      if(val[0]){
        this.editBanner.bannerBeginDe = this.formatDate(val[0])
      }
      if(val[1]){
        this.editBanner.bannerEndDe = this.formatDate(val[1])
      }
      console.log(this.editBanner.bannerBeginDe,this.editBanner.bannerEndDe)
    },
  },
  methods:{
    formatDate (date) {
        if (!date) return null
        const [year, month, day] = date.split('-')
        return `${year}${month}${day}`
    },
    unFormatDate (date) {
        if (!date) return null
        const year = date.substring(0,4);
        const month = date.substring(4,6);
        const day = date.substring(6,8);
        return `${year}-${month}-${day}`
    },

    getBannerList: function(){
      this.$axios.get('/api/admin/banner')
      .then((result)=>{
        this.items = result.data; 
      })
    },
    setBannerContents: function(contents){
        this.editBanner.bannerContents = contents;
      },
    setAtchmnflId: function(data){
      this.editBanner.atchmnflId = data.atchmnflId;
    },
    saveBanner: function(){
        var _this = this;
        this.$axios.post('/api/admin/banner',_this.editBanner)
        .then((result)=>{
            _this.getBannerList();
            this.bannerEditDialog = false;
        })
    },
    addBanner: function(){
      this.bannerEditDialog = true;
      this.newContents = '';
      var today = this.$common.getDate();
      var nextDay = this.$common.getAddDate(1);
      this.dates = [today, nextDay];
      this.editBanner = Object.assign(this.editBanner, {bannerId:0, bannerTitle:'', bannerContents:'', bannerBeginDe:'', bannerEndDe:'', atchmnflId:0});
    },
    deleteBanner: function(data){
      var _this = this;
      this.$axios.delete('/api/admin/banner/'+data.bannerId)
      .then((data)=>{
        _this.getBannerList();
       })
    },
    editItem (item) {
      var _this = this;
      this.bannerEditDialog = true;
      this.newContents = item.bannerContents;
      this.dates = [_this.unFormatDate(item.bannerBeginDe), _this.unFormatDate(item.bannerEndDe)];
      this.editBanner = Object.assign({ }, item);
    },
  }
}
</script>