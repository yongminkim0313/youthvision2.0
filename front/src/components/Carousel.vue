<template>
    <v-card elevation="0" class="mx-auto" >
      <v-btn v-if="isAdmin" style="position:absolute; z-index:999;" class="mt-10 ml-5" icon><v-icon @click="carouselEditDialog=true;">mdi-image-multiple</v-icon></v-btn>
      <v-carousel :continuous="true" :cycle="true" :show-arrows="true" hide-delimiter-background reverse-transition="fade-transition"
        transition="fade-transition" style="width:100%;" height="90vh" >
        <v-carousel-item v-for="item in items" :key="item.imageSn">
            <v-img style="height:100%" :src="'/api/image/'+item.atchmnflId"></v-img>
        </v-carousel-item>
      </v-carousel>
      <v-dialog v-model="carouselEditDialog" max-width="700" class="d-print-none">
        <v-card>
          <v-card-title>CAROUSEL 등록</v-card-title>
          <v-card-actions>
            <v-btn @click="addCarousel">추가</v-btn>
          </v-card-actions>
          <v-card-text>
            <v-list>
              <v-list-item-group v-model="model">
                <v-list-item v-for="(item, i) in items" :key="i" >
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
                    <file-upload @setAtchmnflId-child="setAtchmnflId" :imageSn="item.imageSn"></file-upload>
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
  data () {
    return {
      carouselEditDialog: false,
      items:[],
      model:1
    }
  },
  created: function(){
    this.getImageList();
  },
  computed:{
      isLogin(){
          if(this.$cookies.get('isLogin')==="001"){ return true; }
          else{ return false; }
      },
      isAdmin(){
          if(this.$cookies.get('auth')==="admin"){ return true; }
          else{ return false; }
      }
  },
  methods:{
    getImageList: function(){
      this.$axios.get('/api/admin/carousel')
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
      this.items.push(
        { imageSn: null, atchmnflId: null}
      )
    }
  }
}
</script>