<template>
  <div style="width:100%;">
    <v-file-input full-width show-size truncate-length="100" label="파일 추가" @change="upload" ></v-file-input>
    <!-- <v-btn color="success" dark small @click="upload">
      업로드
      <v-icon right dark>mdi-cloud-upload</v-icon>
    </v-btn> -->
    <!-- <v-img :src="'/api/image/'+tempImgId" width="100px" cover>
      <template v-slot:placeholder>
        <v-row class="fill-height ma-0" align="center" justify="center" >
          <v-progress-circular indeterminate color="grey lighten-5" ></v-progress-circular>
        </v-row>
      </template>
    </v-img> -->
  </div>
</template>
<script>
  
  
  
  export default {
    name: "file-upload",
    props: {atchmnflId: Number, imageSn: Number},
    data() {
      return {
      };
    },
    created() {
      
    },
    methods: {
      upload: async function(file) {
        const formData = new FormData();
        formData.append("file", file);
        var {data} = await this.$axios({
          headers: { "Content-Type": "multipart/form-data", },
          url: "/api/user/upload", // 파일 업로드 요청 URL
          method: "POST",
          data: formData,
        })
        console.log(data);
        this.$emit('after-upload',data);
      },
    },
  };
  </script>
  <style>
  </style>
  
  
  
  