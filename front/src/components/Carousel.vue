<template>
    <v-card flat tile class="mx-auto" >
      <v-btn v-if="isAdmin" style="position:absolute; z-index:999;" class="mt-10 ml-5" icon><v-icon @click="carouselEditDialog=true;">mdi-image-multiple</v-icon></v-btn>
      <v-carousel continuous cycle show-arrows hide-delimiter-background reverse-transition="fade-transition" transition="fade-transition" height="90vh">
        <v-carousel-item eager v-for="item in items" :key="item.imageSn">
          <v-row class="fill-height ma-0 crousel-back" align="center" justify="center" :style="{'--bg':'url('+url+'/api/image/'+item.atchmnflId+')'}">
            <v-img eager :src="url+'/api/image/'+item.atchmnflId">
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center" >
                  <v-progress-circular indeterminate color="grey lighten-5" ></v-progress-circular>
                </v-row>
              </template>
            </v-img>
          </v-row>
          </v-carousel-item>
      </v-carousel>
      <v-dialog v-model="carouselEditDialog" max-width="700" class="d-print-none">
        <v-card>
          <v-card-title>CAROUSEL 등록 {{ mode }}</v-card-title>
          <v-card-actions>
            <v-btn @click="addCarousel">추가</v-btn>
            <file-upload @after-upload="setAtchmnflId" :imageSn="imageSn" v-if="imageSn"></file-upload>
          </v-card-actions>
          <v-card-text>
            <v-list>
              <v-list-item-group v-model="model">
                <v-list-item v-for="(item, i) in items" :key="i" @click="imageSn = i+1">
                  <v-list-item-icon>
                    {{ item.imageSn }}
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-img :src="'/api/image/'+item.atchmnflId" max-width="30vw" max-height="20vh">
                      <template v-slot:placeholder>
                        <v-row class="fill-height ma-0" align="center" justify="center" >
                          <v-progress-circular indeterminate color="grey lighten-5" ></v-progress-circular>
                        </v-row>
                      </template>
                    </v-img>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-btn @click="deleteCarousel(item)">삭제</v-btn>
                  </v-list-item-action>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-card>
  </template>
<script>

import FileUpload from '../components/Upload.vue'
export default {
  components: {FileUpload },
  props: { isAdmin: Boolean },
  data () {
    return {
      carouselEditDialog: false,
      items:[],
      imageSn:0,
      model:1,
      mode:'',
      url:'',
    }
  },
  created: function(){
    this.getImageList();
    if(location.href.indexOf('localhost') > -1){
      this.url = 'https://jesusdream.kr';
    }
  },
  watch:{
    imageSn: function(is){
      var g = this.items.findIndex(function(x){return x.imageSn==is});
      this.mode = g > -1 ? '이미지 수정':'이미지 추가';
    }
  },
  methods:{
    getImageList: function(){
      this.$axios.get('/api/carousel')
      .then((result)=>{
        this.items = result.data; 
      })
    },
    setAtchmnflId: function(data){
      var _this = this;
      this.$axios.post('/api/admin/carousel',data)
      .then((result)=>{
        _this.getImageList();
      })
    },
    addCarousel: function(){
      this.imageSn = this.items.length+1;
    },
    deleteCarousel: function(data){
      var _this = this;
      _this.imageSn = 0;
      console.log(data);
      this.$axios.delete('/api/admin/carousel/'+data.imageSn)
      .then((data)=>{
        console.log(data);
        _this.getImageList();
       })
    }
  }
}
</script>
<style>
.crousel-back{
  /* background: linear-gradient(to right, #ff83b38d 0%, #8b62fc74 45%,  #ff9ed26d 100%); */
  /* background-size: 500%;  */
  background-size: cover;
  animation: crousel-back 20s ease forwards infinite!important; 
}
.crousel-back::before{
        content: "";
        background: var(--bg);
        background-size: cover;
        opacity: 0.5;
        position: absolute;
        top: 0px;
        left: 0px;
        right: 0px;
        bottom: 0px;
        animation: crousel-back 20s ease forwards infinite!important; 
    }
@keyframes crousel-back {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}
</style>