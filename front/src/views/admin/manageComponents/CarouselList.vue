<template>
    <v-card flat>

      <!-- <v-card-title class="indigo white--text text-h5"> 홈 </v-card-title> -->
      <v-file-input ref="file" full-width show-size truncate-length="100" label="파일 추가" @change="upload" :key="fileKey"></v-file-input>
      <v-row class="" justify="space-between" >
        <v-col cols="5">
          <v-treeview :active.sync="active" :items="items" item-key="carouselId" item-text="atachflId"
          :open.sync="open" activatable color="warning" open-on-click transition >
            <template v-slot:prepend="{ item }">
              <div>
                {{ item.carouselOrder }}
                <v-img :src="'/api/common/image/'+item.atchmnflId" height="30" contain> </v-img>
              </div>
            </template>
            
          </v-treeview>
        </v-col>
          <v-divider vertical></v-divider>
        <v-col cols="7" class="d-flex text-center" >
          <v-scroll-y-transition mode="out-in">
            <div v-if="!selected" class="text-h6 grey--text text--lighten-1 font-weight-light" style="align-self: center;" > Slide를 선택하세요 </div>
            <v-card v-else :key="selected.carouselId" class="mx-auto" flat width="100%">
              <v-card-text>
                <v-img :src="'/api/common/image/'+selected.atchmnflId" height="300" contain>
                    <template v-slot:placeholder>
                    <v-row class="fill-height ma-0" align="center" justify="center" >
                        <v-progress-circular indeterminate color="grey lighten-5" ></v-progress-circular>
                    </v-row>
                    </template>
                </v-img>
              </v-card-text>
              <v-card-actions>
                <div class="mx-auto">
                  <v-btn class="px-2" text icon color="lighten-2" @click="save(-1,selected)">
                    <v-icon>mdi-chevron-up</v-icon>
                  </v-btn>
                  <v-btn class="px-2" text icon color="lighten-2" @click="save(1,selected)">
                    <v-icon>mdi-chevron-down</v-icon>
                  </v-btn>
                  <v-btn @click="del(selected);">삭제</v-btn>
                </div>
              </v-card-actions>
            </v-card>
          </v-scroll-y-transition>
        </v-col>
      </v-row>
    </v-card>
  </template>
  <script>

  export default {
    data: () => ({
      active: [],
      avatar: null,
      open: [],
      items: [],
      fileKey:0
    }),
    computed: {
      selected () {
        if (!this.active.length) return undefined
        const id = this.active[0]
        var tmp = this.items.find(item=>item.carouselId === id);
        return tmp;
      },
    },
    created(){
      this.get();
    },
    methods: {
      get: function(){
        var _this = this;
        this.$axios.get('api/common/carousel',{})
        .then((res)=>{
          _this.items = res.data;
        })
      },
      save: function(state, selected){
        var a = selected.carouselOrder;
        var b = selected.carouselOrder + state;

        if(b == 0 || b == this.items.length+1) return;
        
        var c = this.items.findIndex(item=> item.carouselOrder === b);
        
        selected.carouselOrder = b;
        this.items[c].carouselOrder = a;
        this.items.sort(this.sortAlphaNum);
        this.$axios.put('api/common/carousel',this.items)
        .then((data)=>{
          console.log(data);
        })
      },
      del: function(item){
        var _this = this;
        this.$axios.delete('/api/common/carousel/'+item.carouselId)
        .then((res)=>{
            console.log(res);
            _this.get();
        })
      },  
      upload: async function(file) {
        var _this = this;
        const formData = new FormData();
        formData.append("file", file);
        var {data} = await this.$axios({
          headers: { "Content-Type": "multipart/form-data", },
          url: "api/common/carousel", // 파일 업로드 요청 URL
          method: "POST",
          data: formData,
        })
        this.fileKey++;
        _this.get();
        console.log(data);
      },
      sort: function () {
          this.items.sort(this.sortAlphaNum);
          // this.items.reverse();
      },
      sortAlphaNum: function (a,b) {
        var reN = /[^0-9]/g;
        var aN = parseInt(a.carouselOrder);
        var bN = parseInt(b.carouselOrder);
        return aN === bN ? 0 : aN > bN ? 1 : -1;
      },
    },
  }
</script>