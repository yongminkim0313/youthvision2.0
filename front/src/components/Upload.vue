<template>
    <v-card flat>
      <div v-if="currentFile">
          <v-progress-linear v-model="progress" color="light-blue" height="25" reactive >
            <strong>{{ progress }} %</strong>
          </v-progress-linear>
      </div>
  
      <v-card-actions>
          <v-file-input show-size label="File input" @change="selectFile" v-model="fileInfos" ></v-file-input>
          <v-btn color="success" dark small @click="upload">
            업로드
            <v-icon right dark>mdi-cloud-upload</v-icon>
          </v-btn>
      </v-card-actions>
      <v-alert v-if="message" border="left" color="blue-grey" dark>
        {{ message }}
      </v-alert>
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
        fileInfos:[]

      };
    },
    created() {
      
    },
    methods: {
      upload() {
        var _this = this;
        if (_this.currentFile) {
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
              this.progress = 100; 
              _this.currentFile = null; 
              this.fileInfos = [];
              this.$emit('setAtchmnflId-child',data.atchmnflId);
            }, 2000);
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
  
  
  
  