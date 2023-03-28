<template>
    <v-card flat>
      <div v-if="currentFile">
          <v-progress-linear v-model="progress" color="light-blue" height="25" reactive >
            <strong>{{ progress }} %</strong>
          </v-progress-linear>
      </div>
  
      <v-card-actions>
          <v-file-input full-width show-size truncate-length="10" label="File input" @change="selectFile" v-model="fileInfos" ></v-file-input>
          <v-btn color="success" dark small @click="upload">
            업로드
            <v-icon right dark>mdi-cloud-upload</v-icon>
          </v-btn>
      </v-card-actions>
        {{ message }}
      <v-img :src="'/api/image/'+tempImgId" width="100px" cover>
        <template v-slot:placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center" >
            <v-progress-circular indeterminate color="grey lighten-5" ></v-progress-circular>
          </v-row>
        </template>
      </v-img>
    </v-card>
  </template>
  <script>
  
  
  
  export default {
    name: "file-upload",
    props: {atchmnflId: Number},
    data() {
      return {
        currentFile: null,
        progress: 0,
        message:'',
        fileInfos:[],
        tempImgId:0
      };
    },
    created() {
      
    },
    methods: {
      upload() {
        var _this = this;
        if (_this.currentFile) {
          _this.message = 'start upload!';
          var fileReader = new FileReader();
          fileReader.onload = function (event) {
            var data;
            if (!event) {
              data = fileReader.content;
            } else {
              data = event.target.result;
            }
            _this.$socket.emit("Upload", {
              Name: _this.currentFile.name,
              Data: data,
            });
          };
  
          this.$socket.on("MoreData", (data) => {
            console.log(data);
            this.progress = Math.round(data.Percent);
            var Place = data.Place * 524288;
            var NewFile = "";
            if (this.currentFile.webkitSlice){
              NewFile = this.currentFile.webkitSlice( Place, Place + Math.min(524288, this.currentFile.size - Place) );
            } else {
              NewFile = this.currentFile.slice( Place, Place + Math.min(524288, this.currentFile.size - Place) );
            }
            fileReader.readAsBinaryString(NewFile);
          });
  
          _this.$socket.emit("Start", {
            Name: _this.currentFile.name,
            Size: _this.currentFile.size,
          });
          
          _this.$socket.on("endData", (data) => {
            console.log(data);
            _this.progress = data.Percent;
            fileReader = null;
            fileReader = new FileReader();
            setTimeout(() => {
              _this.progress = 100; 
              _this.currentFile = null; 
              _this.fileInfos = [];
              _this.$emit('setAtchmnflId-child',data.atchmnflId);
              _this.tempImgId = data.atchmnflId
              _this.message = 'end upload!!'
            }, 500);
          });
        } else {
          alert("파일을 선택해주세요");
        }
      },
      selectFile(files) {
        if (files) {
          this.currentFile = files;
          console.log(this.currentFile.name);
        }else{
          this.currentFile = null;
        }
      },
    },
  };
  </script>
  <style>
  </style>
  
  
  
  