<template>
    <v-card flat tile class="mx-auto" >
      <v-carousel continuous cycle show-arrows hide-delimiter-background reverse-transition="fade-transition" transition="fade-transition" height="90vh">
        <v-carousel-item eager v-for="item in items" :key="item.imageSn">
          <v-row class="fill-height ma-0 crousel-back" align="center" justify="center" :style="{'--bg':'url(/api/common/carousel/'+item.carouselId+')'}">
            <v-img eager :src="'/api/common/carousel/'+item.carouselId">
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center" >
                  <v-progress-circular indeterminate color="grey lighten-5" ></v-progress-circular>
                </v-row>
              </template>
            </v-img>
          </v-row>
          </v-carousel-item>
      </v-carousel>
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
  },
  watch:{
    imageSn: function(is){
      var g = this.items.findIndex(function(x){return x.imageSn==is});
      this.mode = g > -1 ? '이미지 수정':'이미지 추가';
    }
  },
  methods:{
    getImageList: function(){
      this.$axios.get('/api/common/carousel')
      .then((result)=>{
        this.items = result.data; 
      })
    },
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