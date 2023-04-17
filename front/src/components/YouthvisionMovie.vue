<template>
    <v-card>
        <v-card-title>2023 겨울 유스비전 하이라이트
            <v-btn v-if="isAdmin" icon><v-icon @click="videoEditDialog=true;">mdi-image-multiple</v-icon></v-btn>
        </v-card-title>
        <video autoplay loop controls width="100%" class="justify-center" >
            <source src="../assets/camps/youthvision.mp4" type="video/mp4">
            Download the
            <a href="../assets/camps/youthvision.mp4">MP4</a>
            video.
        </video>
    </v-card>
</template>
<script>
import FileUpload from '../components/Upload.vue'
export default {
  components: {FileUpload },
    data () {
    return {
        videoEditDialog: false,
    }
  },
    computed:{
      isAdmin(){
          if(this.$cookies.get('auth')==="admin"){ return true; }
          else{ return false; }
      },
  },
}
</script>